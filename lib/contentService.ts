import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
  type DocumentData,
} from "firebase/firestore";
import {
  DEFAULT_ABOUT,
  DEFAULT_CERTIFICATIONS,
  DEFAULT_TECH_STACK,
  normalizeTechCategory,
  type AboutContent,
  type CertificationItem,
  type TechStackItem,
} from "./defaultContent";

const CONTENT_COLLECTION = "siteContent";
const SEED_DOC = "seed";
const ABOUT_DOC = "about";

type SortableItem = { id?: string; sortOrder?: number };

type ListConfig<T extends SortableItem> = {
  collectionName: string;
  seedKey: string;
  defaults: T[];
  key: (item: T) => string;
  map: (id: string, data: DocumentData) => T;
  /** Returns the fields to rewrite when a stored document uses an outdated shape. */
  migrate?: (data: DocumentData) => DocumentData | null;
};

function withoutId<T extends SortableItem>(item: Partial<T>): Partial<T> {
  const copy = { ...item };
  delete copy.id;
  return copy;
}

function sortByOrder<T extends SortableItem>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER)
  );
}

async function isSeeded(seedKey: string): Promise<boolean> {
  const snap = await getDoc(doc(db, CONTENT_COLLECTION, SEED_DOC));
  return Boolean(snap.data()?.[seedKey]);
}

async function readList<T extends SortableItem>(config: ListConfig<T>): Promise<T[]> {
  const snap = await getDocs(collection(db, config.collectionName));
  return sortByOrder(snap.docs.map((d) => config.map(d.id, d.data())));
}

async function migrateStoredDocs<T extends SortableItem>(config: ListConfig<T>): Promise<void> {
  if (!config.migrate) return;
  const snap = await getDocs(collection(db, config.collectionName));
  const batch = writeBatch(db);
  let changed = 0;
  snap.docs.forEach((d) => {
    const patch = config.migrate?.(d.data());
    if (!patch) return;
    batch.update(d.ref, { ...patch, updatedAt: serverTimestamp() });
    changed++;
  });
  if (changed > 0) await batch.commit();
}

/**
 * Public read. Until the dashboard has copied the built-in data into Firestore,
 * visitors keep seeing the built-in data so nothing disappears.
 */
async function getPublicList<T extends SortableItem>(config: ListConfig<T>): Promise<T[]> {
  if (!(await isSeeded(config.seedKey))) return config.defaults;
  return readList(config);
}

/**
 * Built-in items that ended up stored more than once (e.g. two seeding runs racing
 * each other) are collapsed back to a single copy.
 */
async function removeDuplicateDefaults<T extends SortableItem>(
  config: ListConfig<T>,
  items: T[]
): Promise<T[]> {
  const defaultKeys = new Set(config.defaults.map(config.key));
  const seen = new Set<string>();
  const duplicates: T[] = [];
  const kept = [...items]
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || (a.id ?? "").localeCompare(b.id ?? ""))
    .filter((item) => {
      const key = config.key(item);
      if (!defaultKeys.has(key)) return true;
      if (seen.has(key)) {
        duplicates.push(item);
        return false;
      }
      seen.add(key);
      return true;
    });

  if (duplicates.length === 0) return items;

  const batch = writeBatch(db);
  duplicates.forEach((item) => item.id && batch.delete(doc(db, config.collectionName, item.id)));
  await batch.commit();
  return sortByOrder(kept);
}

/** Admin read. Copies the built-in data into Firestore once, then returns the stored list. */
async function loadAdminList<T extends SortableItem>(config: ListConfig<T>): Promise<T[]> {
  if (!(await isSeeded(config.seedKey))) {
    const existing = await getDocs(collection(db, config.collectionName));
    const batch = writeBatch(db);
    if (existing.empty) {
      config.defaults.forEach((item, index) => {
        batch.set(doc(db, config.collectionName, `default-${index + 1}`), {
          ...withoutId(item),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      });
    }
    batch.set(doc(db, CONTENT_COLLECTION, SEED_DOC), { [config.seedKey]: true }, { merge: true });
    await batch.commit();
  }
  await migrateStoredDocs(config);
  return removeDuplicateDefaults(config, await readList(config));
}

const inFlightAdminLoads = new Map<string, Promise<unknown>>();

function getAdminList<T extends SortableItem>(config: ListConfig<T>): Promise<T[]> {
  const pending = inFlightAdminLoads.get(config.collectionName) as Promise<T[]> | undefined;
  if (pending) return pending;
  const request = loadAdminList(config).finally(() => inFlightAdminLoads.delete(config.collectionName));
  inFlightAdminLoads.set(config.collectionName, request);
  return request;
}

async function createItem<T extends SortableItem>(collectionName: string, item: Omit<T, "id">) {
  const existing = await getDocs(collection(db, collectionName));
  const maxOrder = existing.docs.reduce((max, d) => {
    const value = d.data().sortOrder;
    return typeof value === "number" ? Math.max(max, value) : max;
  }, 0);
  const ref = await addDoc(collection(db, collectionName), {
    ...item,
    sortOrder: maxOrder + 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

async function updateItem<T extends SortableItem>(collectionName: string, id: string, item: Partial<T>) {
  await updateDoc(doc(db, collectionName, id), { ...withoutId(item), updatedAt: serverTimestamp() });
}

async function updateOrder(collectionName: string, items: SortableItem[]) {
  const batch = writeBatch(db);
  items.forEach((item, index) => {
    if (!item.id) return;
    batch.update(doc(db, collectionName, item.id), { sortOrder: index + 1 });
  });
  await batch.commit();
}

const techStackConfig: ListConfig<TechStackItem> = {
  collectionName: "techStack",
  seedKey: "techStack",
  defaults: DEFAULT_TECH_STACK,
  key: (item) => `${item.name}|${item.img}`,
  map: (id, data) => ({
    id,
    name: data.name || "",
    img: data.img || "",
    category: normalizeTechCategory(data.category || "", data.name || ""),
    sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : undefined,
  }),
  migrate: (data) => {
    const category = normalizeTechCategory(data.category || "", data.name || "");
    return category === data.category ? null : { category };
  },
};

const certificationsConfig: ListConfig<CertificationItem> = {
  collectionName: "certifications",
  seedKey: "certifications",
  defaults: DEFAULT_CERTIFICATIONS,
  key: (item) => `${item.title}|${item.logo}`,
  map: (id, data) => ({
    id,
    title: data.title || "",
    issuer: data.issuer || "",
    date: data.date || "",
    logo: data.logo || "",
    sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : undefined,
  }),
};

export const getTechStack = () => getPublicList(techStackConfig);
export const getAdminTechStack = () => getAdminList(techStackConfig);
export const createTechStackItem = (item: Omit<TechStackItem, "id">) =>
  createItem<TechStackItem>(techStackConfig.collectionName, item);
export const updateTechStackItem = (id: string, item: Partial<TechStackItem>) =>
  updateItem<TechStackItem>(techStackConfig.collectionName, id, item);
export const deleteTechStackItem = (id: string) => deleteDoc(doc(db, techStackConfig.collectionName, id));
export const updateTechStackOrder = (items: TechStackItem[]) =>
  updateOrder(techStackConfig.collectionName, items);

export const getCertifications = () => getPublicList(certificationsConfig);
export const getAdminCertifications = () => getAdminList(certificationsConfig);
export const createCertification = (item: Omit<CertificationItem, "id">) =>
  createItem<CertificationItem>(certificationsConfig.collectionName, item);
export const updateCertification = (id: string, item: Partial<CertificationItem>) =>
  updateItem<CertificationItem>(certificationsConfig.collectionName, id, item);
export const deleteCertification = (id: string) => deleteDoc(doc(db, certificationsConfig.collectionName, id));
export const updateCertificationsOrder = (items: CertificationItem[]) =>
  updateOrder(certificationsConfig.collectionName, items);

export async function getAboutContent(): Promise<AboutContent> {
  const snap = await getDoc(doc(db, CONTENT_COLLECTION, ABOUT_DOC));
  const data = snap.data();
  return { photo: data?.photo || DEFAULT_ABOUT.photo };
}

export async function updateAboutContent(content: AboutContent): Promise<void> {
  await setDoc(
    doc(db, CONTENT_COLLECTION, ABOUT_DOC),
    { ...content, updatedAt: serverTimestamp() },
    { merge: true }
  );
}
