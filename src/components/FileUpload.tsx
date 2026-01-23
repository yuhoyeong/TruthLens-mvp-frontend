import { useState, useRef, type ReactNode } from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // MB
  onFileSelect?: (files: FileList) => void;
  children?: ReactNode;
}

export default function FileUpload({
  accept = "image/jpeg,image/png",
  maxSize = 20,
  onFileSelect,
  children,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect?.(files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect?.(files);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        bg-white rounded-2xl border-2 border-dashed p-16 
        flex flex-col items-center justify-center 
        transition-colors cursor-pointer
        ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-neutral-90 hover:border-neutral-60"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
      {children ?? <DefaultContent maxSize={maxSize} />}
    </div>
  );
}

function DefaultContent({ maxSize }: { maxSize: number }) {
  return (
    <>
      <div className="w-16 h-16 rounded-full bg-neutral-98 flex items-center justify-center mb-4">
        <Upload size={28} className="text-neutral-50" />
      </div>
      <p className="text-body-1 text-neutral-30 mb-1">
        이미지를 드래그하거나 클릭하여 업로드해주세요.
      </p>
      <p className="text-label-2 text-neutral-60">
        JPG, PNG 형식을 지원합니다. (최대 {maxSize}MB)
      </p>
    </>
  );
}
