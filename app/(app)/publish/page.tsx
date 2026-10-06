import { SectionHeader } from "@/app/components/ui";
import PublishClient from "./PublishClient";

export default function PublishPage() {
  return (
    <div>
      <SectionHeader
        num="PB"
        title="Publish"
        description="Schedule finished videos and post them straight to your connected accounts. Results sync back into Analytics."
      />
      <PublishClient />
    </div>
  );
}
