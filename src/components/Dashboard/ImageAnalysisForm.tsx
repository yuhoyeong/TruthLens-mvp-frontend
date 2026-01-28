import React, { useState, useRef } from "react";
import { Link as LinkIcon, Image } from "lucide-react";
import { Loader2 } from "lucide-react";
import {
  Button,
  FileUpload,
  Input,
  Tabs,
  AnalysisProgress,
} from "@/components";
import { useAnalyzeImage, useAnalyzeUrl, useJobStatus } from "@/hooks";
import { useNavigate } from "react-router-dom";
import ImagePreview from "./ImagePreview";

const ImageAnalysisForm = () => {
  const navigate = useNavigate();
  const [linkInput, setLinkInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "link">("upload");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const analyzeImageMutation = useAnalyzeImage();
  const analyzeUrlMutation = useAnalyzeUrl();

  const { data: jobStatus, isLoading: isPolling } = useJobStatus(
    currentJobId || "",
    {
      enabled: !!currentJobId,
    },
  );

  React.useEffect(() => {
    if (jobStatus?.status === "completed" && currentJobId) {
      navigate(`/analysis-result/${currentJobId}`);
    }
  }, [jobStatus, currentJobId, navigate]);

  React.useEffect(() => {
    if (jobStatus?.status === "failed") {
      setCurrentJobId(null);
    }
  }, [jobStatus]);

  const isAnalyzing =
    analyzeImageMutation.status === "pending" ||
    analyzeUrlMutation.status === "pending" ||
    isPolling;

  const handleFileSelect = (files: File | FileList) => {
    const file = files instanceof FileList ? files[0] : files;
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAnalyze = async () => {
    try {
      if (activeTab === "upload" && selectedFile) {
        const result = await analyzeImageMutation.mutateAsync({
          file: selectedFile,
          note: "이미지 위변조 분석 요청",
        });
        // convert selected file to data URL and persist locally keyed by job id
        const fileToDataUrl = (file: File) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

        try {
          const dataUrl = await fileToDataUrl(selectedFile);
          try {
            localStorage.setItem(`preview:${result.job_id}`, dataUrl);
          } catch (e) {
            // ignore storage errors
          }
        } catch (e) {
          // ignore conversion errors
        }

        const delayMs = 700;
        setTimeout(() => setCurrentJobId(result.job_id), delayMs);
      } else if (activeTab === "link" && linkInput.trim()) {
        const inputType = "link";

        const result = await analyzeUrlMutation.mutateAsync({
          input_type: inputType,
          url: linkInput.trim(),
          note: "기사 분석 요청",
        });
        const delayMs = 700;
        setTimeout(() => setCurrentJobId(result.job_id), delayMs);
      }
    } catch {
      setCurrentJobId(null);
    }
  };

  const canAnalyze =
    (activeTab === "upload" && selectedFile) ||
    (activeTab === "link" && linkInput.trim());

  return (
    <div>
      <Tabs.Root
        defaultValue="upload"
        onValueChange={(value) => setActiveTab(value as "upload" | "link")}
      >
        <Tabs.List className="mb-6">
          <Tabs.Trigger value="upload" icon={<Image size={18} />}>
            이미지 업로드
          </Tabs.Trigger>
          <Tabs.Trigger value="link" icon={<LinkIcon size={18} />}>
            링크 입력
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="upload">
          {!selectedFile ? (
            <FileUpload onFileSelect={handleFileSelect} />
          ) : (
            <div className="mt-4 space-y-2">
              <div className="cursor-pointer" onClick={handleImageClick}>
                {/* ImagePreview 내부에서 모든 호버 효과 처리 */}
                <ImagePreview file={selectedFile} />
              </div>

              <div className="flex justify-between items-center px-1">
                <p className="text-xs text-neutral-50">
                  {selectedFile.name} (
                  {(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
                </p>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-xs text-red-500 underline"
                >
                  삭제
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          )}
        </Tabs.Content>

        <Tabs.Content value="link">
          <Input
            type="text"
            placeholder="분석할 이미지 또는 기사 URL을 입력하세요."
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
          {linkInput.trim() && (
            <div className="mt-4 p-3 bg-neutral-95 rounded-lg">
              <p className="text-body-2-r text-neutral-30">
                입력된 URL: {linkInput}
              </p>
            </div>
          )}
        </Tabs.Content>
      </Tabs.Root>

      {currentJobId && (
        <AnalysisProgress jobId={currentJobId} jobStatus={jobStatus} />
      )}

      <Button
        variant="secondary"
        size="lg"
        fullWidth
        className="mt-6"
        onClick={handleAnalyze}
        disabled={!canAnalyze || isAnalyzing}
      >
        {isAnalyzing ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            분석 진행 중...
          </div>
        ) : (
          "AI 위변조 분석 시작하기"
        )}
      </Button>
    </div>
  );
};

export default ImageAnalysisForm;
