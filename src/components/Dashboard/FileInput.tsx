import React from "react";

interface FileInputProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageClick: () => void;
  selectedFile: File | null;
}

const FileInput: React.FC<FileInputProps> = ({
  fileInputRef,
  handleFileChange,
  handleImageClick,
  selectedFile,
}) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  return (
    <div className="cursor-pointer" onClick={handleImageClick}>
      {selectedFile && previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-auto rounded-md border border-neutral-90"
        />
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInput;
