import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";
 
export const env = createEnv({
  server: {
    CMS_SEED_ADMIN_EMAIL: z.email(),
    CMS_SEED_ADMIN_PASSWORD: z.string().min(1),
  },
  client: {
    //
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    CMS_SEED_ADMIN_EMAIL: process.env.CMS_SEED_ADMIN_EMAIL,
    CMS_SEED_ADMIN_PASSWORD: process.env.CMS_SEED_ADMIN_PASSWORD,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});