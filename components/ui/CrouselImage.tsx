"use client";

import React, { useState, useEffect, useCallback } from "react";

interface ImageData {
  title: string;
  url: string;
}

interface ImageGalleryProps {
  images: ImageData[];
}

interface GalleryImageProps {
  url: string;
  open: boolean;
  inPlace: boolean;
  id: number;
  onInPlace: (id: number) => void;
  total: number;
}

declare global {
  interface Window {
    gsap?: any;
    MotionPathPlugin?: any;
  }
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [opened, setOpened] = useState(0);
  const [inPlace, setInPlace] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);

  useEffect(() => {
    const loadScripts = () => {
      if (window.gsap && window.MotionPathPlugin) {
        window.gsap.registerPlugin(window.MotionPathPlugin);
        setGsapReady(true);
        return;
      }

      const gsapScript = document.createElement("script");
      gsapScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";

      gsapScript.onload = () => {
        const motionPathScript = document.createElement("script");
        motionPathScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js";

        motionPathScript.onload = () => {
          if (window.gsap && window.MotionPathPlugin) {
            window.gsap.registerPlugin(window.MotionPathPlugin);
            setGsapReady(true);
          }
        };

        document.body.appendChild(motionPathScript);
      };

      document.body.appendChild(gsapScript);
    };

    loadScripts();
  }, []);

  const onClick = (index: number) => {
    if (!disabled) setOpened(index);
  };

  const onInPlace = (index: number) => setInPlace(index);

  const next = useCallback(() => {
    setOpened((current) => (current + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setOpened((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    setDisabled(true);
  }, [opened]);

  useEffect(() => {
    setDisabled(false);
  }, [inPlace]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-border bg-muted">
        <span className="text-sm text-muted-foreground">
          تصویری برای این محصول ثبت نشده است.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[420px]">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-lg">
        {gsapReady &&
          images.map((image, i) => (
            <div
              key={image.url}
              className="absolute inset-0 h-full w-full"
              style={{
                zIndex: inPlace === i ? i : images.length + 1,
              }}
            >
              <GalleryImage
                total={images.length}
                id={i}
                url={image.url}
                open={opened === i}
                inPlace={inPlace === i}
                onInPlace={onInPlace}
              />
            </div>
          ))}

        {!gsapReady && (
          <img
            src={images[0].url}
            alt={images[0].title}
            className="h-full w-full object-contain"
          />
        )}

        {/* Previous Button */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              disabled={disabled}
              aria-label="تصویر قبلی"
              className="absolute left-2 top-1/2 z-[101] flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-secondary/95 text-foreground shadow-md transition hover:scale-105 disabled:opacity-40"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={next}
              disabled={disabled}
              aria-label="تصویر بعدی"
              className="absolute right-2 top-1/2 z-[101] flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-secondary/95 text-foreground shadow-md transition hover:scale-105 disabled:opacity-40"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Image Thumbnails */}
      {images.length > 1 && (
        <div className="mt-5">
          <Tabs images={images} onSelect={onClick} />
        </div>
      )}
    </div>
  );
}

function GalleryImage({
  url,
  open,
  inPlace,
  id,
  onInPlace,
  total,
}: GalleryImageProps) {
  const [firstLoad, setLoaded] = useState(true);

  const clip = React.useRef<SVGCircleElement>(null);

  const gap = 10;
  const circleRadius = 7;
  const defaults = { transformOrigin: "center center" };
  const duration = 0.4;
  const width = 400;
  const height = 400;
  const scale = 55;

  const bigSize = circleRadius * scale;
  const overlap = 0;

  const getPosSmall = () => ({
    cx:
      width / 2 -
      (total * (circleRadius * 2 + gap) - gap) / 2 +
      id * (circleRadius * 2 + gap),
    cy: height - 30,
    r: circleRadius,
  });

  const getPosSmallAbove = () => ({
    cx:
      width / 2 -
      (total * (circleRadius * 2 + gap) - gap) / 2 +
      id * (circleRadius * 2 + gap),
    cy: height - 45,
    r: circleRadius,
  });

  const getPosCenter = () => ({
    cx: width / 2,
    cy: height / 2,
    r: circleRadius * 7,
  });

  const getPosEnd = () => ({
    cx: width / 2 - bigSize + overlap,
    cy: height / 2,
    r: bigSize,
  });

  const getPosStart = () => ({
    cx: width / 2 + bigSize - overlap,
    cy: height / 2,
    r: bigSize,
  });

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    setLoaded(false);

    if (clip.current) {
      const flipDuration = firstLoad ? 0 : duration;
      const upDuration = firstLoad ? 0 : 0.2;
      const bounceDuration = firstLoad ? 0.01 : 0.55;
      const delay = firstLoad ? 0 : flipDuration + upDuration;

      if (open) {
        gsap
          .timeline()
          .set(clip.current, { ...defaults, ...getPosSmall() })
          .to(clip.current, {
            ...defaults,
            ...getPosCenter(),
            duration: upDuration,
            ease: "power3.inOut",
          })
          .to(clip.current, {
            ...defaults,
            ...getPosEnd(),
            duration: flipDuration,
            ease: "power4.in",
            onComplete: () => onInPlace(id),
          });
      } else {
        gsap.set(clip.current, {
          ...defaults,
          ...getPosSmall(),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <clipPath id={`${id}_circleClip`}>
          <circle className="clip" cx="0" cy="0" r={circleRadius} ref={clip} />
        </clipPath>

        <clipPath id={`${id}_squareClip`}>
          <rect width={width} height={height} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}${inPlace ? "_squareClip" : "_circleClip"})`}>
        <image
          width={width}
          height={height}
          href={url}
          className="pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    </svg>
  );
}

function Tabs({
  images,
  onSelect,
}: {
  images: ImageData[];
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
      {images.map((image, i) => (
        <button
          key={image.url}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`نمایش تصویر ${i + 1}`}
          className="size-16 shrink-0 overflow-hidden rounded-xl border-2 border-border bg-muted transition-all hover:scale-105 hover:border-primary focus-visible:outline-2 focus-visible:outline-primary"
        >
          <img
            src={image.url}
            alt={image.title}
            className="h-full w-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
