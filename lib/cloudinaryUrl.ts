export const CLOUDINARY_CLOUD_NAME = "dcg7mvcnb";

/**
 * Extracts the public_id from a delivery URL such as
 * https://res.cloudinary.com/<cloud>/image/upload/v1712345678/porto/abc.png -> "porto/abc".
 * Returns null for anything that is not an untransformed upload in our cloud.
 */
export function getCloudinaryPublicId(url: string, cloudName = CLOUDINARY_CLOUD_NAME): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.hostname !== "res.cloudinary.com") return null;

  const prefix = `/${cloudName}/image/upload/`;
  if (!parsed.pathname.startsWith(prefix)) return null;

  const rest = decodeURIComponent(parsed.pathname.slice(prefix.length)).replace(/^v\d+\//, "");
  if (!rest || rest.includes(",")) return null;

  return rest.replace(/\.[a-z0-9]+$/i, "");
}

export function isCloudinaryUpload(url: string): boolean {
  return getCloudinaryPublicId(url) !== null;
}
