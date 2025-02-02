import { useState } from "react";

const useImagePreview = () => {
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Cleanup URL
    } else {
      setPreviewUrl("");
    }
  };

  return { previewUrl, setPreviewUrl, handleImageChange };
};

export default useImagePreview;
