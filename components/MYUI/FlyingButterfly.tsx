"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DURATION = 3.8; // مدت ورود (ثانیه)

export default function FlyingButterfly() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [arrived, setArrived] = useState(false);

  const progress = useMotionValue(0);

  // مسیر: از راست-پایین به وسط، با موج سینوسی که آخرش خاموش می‌شه
  const x = useTransform(progress, (p) => {
    const base = 220 * (1 - p); // حرکت از راست به وسط
    const wave = 70 * Math.sin(p * Math.PI * 3) * (1 - p); // موج نرم که کم‌کم محو می‌شه
    return base + wave;
  });
  const y = useTransform(progress, (p) => 380 * (1 - p));
  const opacity = useTransform(progress, [0, 0.08], [0, 1]);
  const tilt = useTransform(
    progress,
    (p) => 12 - 8 * Math.cos(p * Math.PI * 3) * (1 - p),
  );

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(progress, 1, {
      duration: DURATION,
      ease: [0.25, 0.1, 0.25, 1],
      onComplete: () => setArrived(true),
    });
    return () => controls.stop();
  }, [isInView, progress]);

  return (
    <div
      ref={ref}
      className="relative flex h-96 w-full items-center justify-center"
    >
      {/* لایه ۱: مسیر موج‌دار */}
      <motion.div style={{ x, y, opacity }}>
        {/* لایه ۲: بال‌زدن */}
        <motion.div
          animate={
            isInView
              ? { y: [0, -7, 0, 7, 0], scaleX: [1, 0.94, 1, 0.94, 1] }
              : {}
          }
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* لایه ۳: کج بودن (حین ورود از tilt، بعدش شناوری) */}
          <motion.div
            style={arrived ? undefined : { rotate: tilt }}
            initial={{ rotate: 12 }}
            animate={
              arrived
                ? { y: [0, -14, 0, 12, 0], rotate: [12, 8, 12, 16, 12] }
                : undefined
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/logo2.png"
              alt="لوگوی پروانه"
              width={240}
              height={163}
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
