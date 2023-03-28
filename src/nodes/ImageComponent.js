import * as React from "react";
import { Suspense, useRef } from "react";

const imageCache = new Set();

function useSuspenseImage(src) {
  if (!imageCache.has(src)) {
    // return new Promise((resolve) => {
    //   console.log('returning promise');
    //   const img = new Image();
    //   img.src = src;
    //   img.onload = () => {
    //     imageCache.add(src);
    //     resolve(null);
    //   };
    // });
    throw new Promise((resolve) => {
      console.log('throwing promise');
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
    // throw new Promise((resolve, reject) => reject('x'))
  }
  console.log('done throwing/resolving');
}

function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  maxWidth
}){
  useSuspenseImage(src);
  return (
    <img
      className={className || undefined}
      src={src}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        maxWidth,
        width
      }}
    />
  );
}

export default function ImageComponent({
  src,
  altText,
  width,
  height,
  maxWidth
}){
  const imageRef = useRef(null);
  return (
    // <Suspense fallback={null}>
    <Suspense fallback={<h1>Something failed!</h1>}>
      <div>
        <LazyImage
          className=""
          src={src}
          altText={altText}
          imageRef={imageRef}
          width={width}
          height={height}
          maxWidth={maxWidth}
        />
      </div>
    </Suspense>
  );
}
