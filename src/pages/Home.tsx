import { useState } from "react";
import { Link as LinkIcon, Image } from "lucide-react";
import { Button, FileUpload, Input, Tabs } from "@/components";

export default function Home() {
  const [linkInput, setLinkInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (files: FileList) => {
    setSelectedFile(files[0]);
    console.log("Selected file:", files[0]);
  };

  const handleAnalyze = () => {
    // TODO: TanStack Query mutation으로 분석 요청
    console.log("Analyze:", selectedFile || linkInput);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-title-3 text-neutral-10 mb-2">
          이미지의 진위를 확인해보세요
        </h1>
        <p className="text-body-1-r text-neutral-50">
          이미지 또는 기사 링크를 업로드하면 AI가 생성한 콘텐츠인지 분석하고
          법적 리스크를 평가합니다.
        </p>
      </header>

      {/* Tabs - Compound Component 패턴 */}
      <Tabs.Root defaultValue="upload">
        <Tabs.List className="mb-6">
          <Tabs.Trigger value="upload" icon={<Image size={18} />}>
            이미지 업로드
          </Tabs.Trigger>
          <Tabs.Trigger value="link" icon={<LinkIcon size={18} />}>
            링크 입력
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="upload">
          <FileUpload onFileSelect={handleFileSelect} />
        </Tabs.Content>

        <Tabs.Content value="link">
          <Input
            type="text"
            placeholder="분석할 이미지 또는 기사 URL을 입력하세요."
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        </Tabs.Content>
      </Tabs.Root>

      {/* Submit Button */}
      <Button
        variant="secondary"
        size="lg"
        fullWidth
        className="mt-6"
        onClick={handleAnalyze}
      >
        AI 위변조 분석 시작하기
      </Button>
    </div>
  );
}
