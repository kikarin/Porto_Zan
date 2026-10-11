import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { isCloudinaryUpload } from "./cloudinaryUrl";

function collectStrings(value: unknown, into: Set<string>) {
  if (typeof value === "string") into.add(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, into));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => collectStrings(v, into));
}

/** Every string stored in the content collections, so shared images are never deleted. */
async function getReferencedUrls(): Promise<Set<string>> {
  const urls = new Set<string>();
  const collections = ["projects", "projectDetails", "techStack", "certifications"];
  const [aboutSnap, ...snaps] = await Promise.all([
    getDoc(doc(db, "siteContent", "about")),
    ...collections.map((name) => getDocs(collection(db, name))),
  ]);
  collectStrings(aboutSnap.data(), urls);
  snaps.forEach((snap) => snap.docs.forEach((d) => collectStrings(d.data(), urls)));
  return urls;
}

/**
 * Deletes Cloudinary uploads that were in `before` but not in `after` and are no longer
 * referenced anywhere. Call after the new state has been saved. Never throws.
 */
export async function deleteUnusedUploads(before: string[], after: string[]): Promise<number> {
  try {
    const kept = new Set(after);
    const removed = Array.from(new Set(before.filter((url) => !kept.has(url) && isCloudinaryUpload(url))));
    if (removed.length === 0) return 0;

    const referenced = await getReferencedUrls();
    const orphaned = removed.filter((url) => !referenced.has(url));
    if (orphaned.length === 0) return 0;

    await auth.authStateReady();
    const idToken = await auth.currentUser?.getIdToken();
    if (!idToken) return 0;

    const res = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
      body: JSON.stringify({ urls: orphaned }),
    });
    if (!res.ok) {
      console.warn("Cloudinary cleanup skipped:", await res.text());
      return 0;
    }
    const { results } = (await res.json()) as { results: { result: string }[] };
    return results.filter((r) => r.result === "ok").length;
  } catch (error) {
    console.warn("Cloudinary cleanup failed:", error);
    return 0;
  }
}
