import React from "react";

interface ImagePreviewProps {
  file: File;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!previewUrl) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-neutral-90 group transition-all">
      <img
        src={previewUrl}
        alt="Preview"
        className="w-full h-auto object-cover transition duration-300 group-hover:blur-[2px] group-hover:brightness-75"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
          <p className="text-white text-sm font-semibold">이미지 변경</p>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
