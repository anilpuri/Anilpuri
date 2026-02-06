// import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

import { globals } from "./globals";
import { collections } from "./collections";
import { Users } from "./collections/Users";
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: collections,
  globals: globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    // vercelBlobStorage({
    //   enabled: true, // Optional, defaults to true
    //   // Specify which collections should use Vercel Blob
    //   collections: {
    //     media: true,
    //   },
    //   // Token provided by Vercel once Blob storage is added to your Vercel project
    //   token: process.env.BLOB_READ_WRITE_TOKEN,
    //   clientUploads: true,
    // }),
    uploadthingStorage({
      collections: {
        media: true, // The slug of your media collection
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read', // Files will be publicly accessible via URL
      },
    }),
  ],
  
});
