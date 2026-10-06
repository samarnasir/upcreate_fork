import { SectionHeader } from "@/app/components/ui";
import PipelineBoard from "./PipelineBoard";

export default function PipelinePage() {
  return (
    <div>
      <SectionHeader
        num="P"
        title="Pipeline"
        description="Every video from idea to posted. Drag cards between stages as work moves along."
      />
      <PipelineBoard />
    </div>
  );
}
