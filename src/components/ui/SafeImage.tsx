"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Image as ImageIcon } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  containerClassName?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc = "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/trust-main-logo.jpg",
  containerClassName = "",
  className = "",
  fill,
  width,
  height,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src as string);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {imgSrc ? (
        <Image
          {...props}
          src={imgSrc}
          alt={alt || "Yuvatejam Trust"}
          fill={fill}
          width={!fill ? width || 800 : undefined}
          height={!fill ? height || 500 : undefined}
          className={`${className} ${hasError ? "object-contain p-4 bg-slate-100" : ""}`}
          onError={handleError}
        />
      ) : (
        <div className="w-full h-full min-h-[160px] bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-4 rounded-xl">
          <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-xs font-medium">{alt || "Yuvatejam Trust Media"}</span>
        </div>
      )}
    </div>
  );
}
