import React from "react";

interface FileDetailsProps {
  selectedFile: File;
  onRemoveFile: () => void;
}

const FileDetails: React.FC<FileDetailsProps> = ({
  selectedFile,
  onRemoveFile,
}) => {
  return (
    <div className="flex justify-between items-center px-1">
      <p className="text-xs text-neutral-50">
        {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
      </p>
      <button onClick={onRemoveFile} className="text-xs text-red-500 underline">
        삭제
      </button>
    </div>
  );
};

export default FileDetails;
