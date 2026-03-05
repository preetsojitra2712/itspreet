import { redirect } from "next/navigation";

import { links } from "@/content/preet";

export default function ResumePage() {
  redirect(links.resumePath);
}
