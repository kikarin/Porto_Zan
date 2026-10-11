import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { firebaseConfig } from "@/lib/firebaseConfig";
import { getCloudinaryPublicId } from "@/lib/cloudinaryUrl";

const MAX_URLS = 50;

async function isSignedInUser(idToken: string): Promise<boolean> {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );
  if (!res.ok) return false;
  const data = await res.json();
  return Array.isArray(data.users) && data.users.length > 0;
}

async function destroy(publicId: string, cloudName: string, apiKey: string, apiSecret: string) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = createHash("sha1")
    .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const body = new URLSearchParams({ public_id: publicId, timestamp, api_key: apiKey, signature });
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: "POST",
    body,
  });
  const data = await res.json().catch(() => ({}));
  return { publicId, result: (data.result as string) ?? data.error?.message ?? `HTTP ${res.status}` };
}

export async function POST(req: Request) {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dcg7mvcnb";
  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET belum diset." },
      { status: 501 }
    );
  }

  const idToken = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!idToken || !(await isSignedInUser(idToken))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { urls } = (await req.json().catch(() => ({}))) as { urls?: unknown };
  if (!Array.isArray(urls)) {
    return NextResponse.json({ error: "Body harus berisi { urls: string[] }" }, { status: 400 });
  }

  const publicIds = Array.from(
    new Set(
      urls
        .slice(0, MAX_URLS)
        .map((url) => (typeof url === "string" ? getCloudinaryPublicId(url, cloudName) : null))
        .filter((id): id is string => Boolean(id))
    )
  );

  const results = await Promise.all(publicIds.map((id) => destroy(id, cloudName, apiKey, apiSecret)));
  return NextResponse.json({ results });
}
