import React, { useState } from "react";
import { Skeleton } from "../skeleton";


type CustomImageProps = {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
};

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt = "تصویر",
  fallbackSrc = '/no-image.png', // ✅ Correct now
  width = "100%",
  height = "auto",
  className = "",
  imgClassName = "",
  loading = "lazy",
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const showFallback = error || !src;

  return (
    <div
      className={`relative overflow-hidden rounded-md rounded-b-none ${className}`}
      style={{ width, height }}
    >
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full z-0 rounded-md" />
      )}

      <img
        src={showFallback ? fallbackSrc : src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={`transition-opacity duration-500 object-cover w-full h-full ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
};

export default CustomImage;
