import dotenv from "dotenv";
import path from "path";
import type { InitOptions } from "payload/config";
import payload, { Payload } from "payload";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}
export async function getPayloadClient({ initOptions }: Args) {
  // Verify PAYLOAD_SECRET for sign-in
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing");
  }
  // Return cached.client if we have an existing client
  if (cached.client) {
    return cached.client;
  }
  // Otherwise, use cached.promise to generate a client
  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
    try {
      cached.client = await cached.promise;
    } catch (e: unknown) {
      cached.promise = null;
      throw e;
    }

    return cached.client;
  }
}
