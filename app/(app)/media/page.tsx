import { SectionHeader } from "@/app/components/ui";
import MediaClient from "./MediaClient";

export default function MediaPage() {
  return (
    <div>
      <SectionHeader
        num="MB"
        title="Media Bank"
        description="Your footage and images in one place. Tag clips, link them to scripts, and pull them into posts."
      />
      <MediaClient />
    </div>
  );
}
