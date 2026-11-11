"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ------------------------------------------------------------------ */
/*  همه‌ی اندازه‌ها روی یک «صحنه‌ی» ثابت تعریف شدن و کل صحنه با       */
/*  توجه به عرض صفحه کوچیک می‌شه (scale)، پس روی موبایل هم درسته.      */
/* ------------------------------------------------------------------ */
const STAGE_W = 600;
const STAGE_H = 620;

// عکس جعبه (بعد از صاف کردن): اندازه‌ی اصلی + خط لبه‌ی بالای دیواره‌ی جلو + مرکز گودی
const NATIVE = { w: 449, h: 704, rim: 353, notchX: 222.4 };

const BOX_W = 290;
const S = BOX_W / NATIVE.w;
const BOX_H = NATIVE.h * S;
const BOX_LEFT = (STAGE_W - BOX_W) / 2;
const BOX_TOP = STAGE_H - BOX_H;
// خط لبه‌ی جعبه: کارت‌ها قبل از پرتاب کامل پشت همین خط قایم هستن
const MOUTH_Y = BOX_TOP + NATIVE.rim * S;
// مرکز دهانه‌ی جعبه
const MOUTH_X = BOX_LEFT + NATIVE.notchX * S;

const CX0 = STAGE_W / 2;
const DUR = 1.25; // مدت پرتاب هر کارت

type CardDef = {
  src: string;
  w: number; // عرض نمایش
  h: number; // ارتفاع نمایش
  cx: number; // مرکز نهایی (x)
  cy: number; // مرکز نهایی (y)
  angle: number; // زاویه‌ی نهایی
  lift: number; // اوج پرتاب بالاتر از جای نهایی
  depth: number; // شدت حرکت با موس
  z: number;
  order: number; // ترتیب پرتاب (۰ = اول)
  outline?: boolean;
};

const CARDS: CardDef[] = [
  {
    src: "card-1",
    w: 135,
    h: 165,
    cx: CX0 - 176,
    cy: 270,
    angle: -28,
    lift: 25,
    depth: 0.9,
    z: 11,
    order: 3,
  },
  {
    src: "card-2",
    w: 135,
    h: 165,
    cx: CX0 - 110,
    cy: 205,
    angle: -14,
    lift: 35,
    depth: 1.2,
    z: 12,
    order: 1,
  },
  {
    src: "card-3",
    w: 135,
    h: 165,
    cx: CX0,
    cy: 168,
    angle: 0,
    lift: 50,
    depth: 1.6,
    z: 14,
    order: 0,
  },
  {
    src: "card-4",
    w: 135,
    h: 165,
    cx: CX0 + 110,
    cy: 205,
    angle: 14,
    lift: 35,
    depth: 1.2,
    z: 12,
    order: 2,
    outline: true,
  },
  {
    src: "card-5",
    w: 135,
    h: 165,
    cx: CX0 + 176,
    cy: 270,
    angle: 28,
    lift: 25,
    depth: 0.9,
    z: 11,
    order: 4,
  },
];

const IMG = "/images/flashcards/";

function Card({
  def,
  index,
  mx,
  my,
  reduce,
}: {
  def: CardDef;
  index: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduce: boolean;
}) {
  // موس: هر کارت بسته به depth کمتر یا بیشتر جابه‌جا می‌شه
  const px = useTransform(mx, [-0.5, 0.5], [-def.depth * 18, def.depth * 18]);
  const py = useTransform(my, [-0.5, 0.5], [-def.depth * 8, def.depth * 8]);
  const pr = useTransform(mx, [-0.5, 0.5], [-def.depth * 3, def.depth * 3]);

  const left = def.cx - def.w / 2;
  const top = def.cy - def.h / 2;
  // نقطه‌ی شروع: وسط دهانه‌ی جعبه و کامل پشت دیواره‌ی جلو
  const x0 = MOUTH_X - def.cx;
  const y0 = MOUTH_Y + 30 - top;
  const delay = 0.95 + def.order * 0.11;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: def.w,
        height: def.h,
        zIndex: def.z,
      }}
    >
      {/* ۱) پرتاب: اول مستقیم بالا از جعبه، بعد قوس به سمت جای نهایی */}
      <motion.div
        initial={reduce ? false : { x: x0, y: y0, rotate: 0 }}
        animate={
          reduce
            ? { x: 0, y: 0, rotate: def.angle }
            : {
                x: [x0, x0, 0],
                y: [y0, -def.lift, 7, 0],
                rotate: [0, 0, def.angle * 1.35, def.angle],
              }
        }
        transition={
          reduce
            ? { duration: 0 }
            : {
                x: {
                  duration: DUR,
                  delay,
                  times: [0, 0.22, 1],
                  ease: ["linear", "easeOut"],
                },
                y: {
                  duration: DUR,
                  delay,
                  times: [0, 0.42, 0.8, 1],
                  ease: ["easeOut", "easeIn", "easeOut"],
                },
                rotate: {
                  duration: DUR,
                  delay,
                  times: [0, 0.22, 0.65, 1],
                  ease: ["linear", "easeOut", "easeInOut"],
                },
              }
        }
      >
        {/* ۲) حرکت با موس */}
        <motion.div style={{ x: px, y: py, rotate: pr }}>
          {/* ۳) شناور بودن ملایم بعد از فرود + هاور */}
          <motion.div
            animate={
              reduce
                ? undefined
                : { y: [0, -7, 0], rotate: [0, 1.5, 0, -1.5, 0] }
            }
            transition={{
              y: {
                duration: 3.2 + index * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay + DUR,
              },
              rotate: {
                duration: 6 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay + DUR,
              },
            }}
            whileHover={{ y: -10, scale: 1.08 }}
          >
            <Image
              src={`${IMG}${def.src}.webp`}
              alt=""
              aria-hidden
              width={def.w * 2}
              height={def.h * 2}
              unoptimized
              priority
              draggable={false}
              style={{
                width: def.w,
                height: def.h,
                filter: def.outline
                  ? "drop-shadow(0 0 0.6px rgba(0,0,0,.5)) drop-shadow(0 8px 12px rgba(0,0,0,.22))"
                  : "drop-shadow(0 8px 12px rgba(0,0,0,.22))",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FlashcardBox() {
  const reduce = useReducedMotion() ?? false;
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // کوچیک کردن صحنه روی صفحه‌های باریک
  useIsoLayoutEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / STAGE_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // موس
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 16 });
  const sy = useSpring(my, { stiffness: 70, damping: 16 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return; // موبایل: بدون موس
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  // جعبه کمی خلاف جهت موس حرکت می‌کنه (حس عمق)
  const bx = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const by = useTransform(sy, [-0.5, 0.5], [4, -4]);

  return (
    <div
      ref={outerRef}
      className="relative mx-auto w-full"
      style={{ maxWidth: STAGE_W, height: STAGE_H * scale }}
    >
      <div
        dir="ltr"
        className="absolute left-1/2 top-0"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {/* ورود جعبه + تکون خوردن قبل از پرتاب کارت‌ها */}
        <motion.div
          className="absolute inset-0"
          style={{ transformOrigin: "50% 100%" }}
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: reduce ? 0 : [0, -2.5, 2.5, -2, 1.5, 0],
          }}
          transition={{
            opacity: { duration: 0.4 },
            y: { type: "spring", stiffness: 100, damping: 12 },
            rotate: { duration: 0.5, delay: 0.4, ease: "easeInOut" },
          }}
        >
          {/* حرکت کل مجموعه با موس */}
          <motion.div className="absolute inset-0" style={{ x: bx, y: by }}>
            {/* لایه‌ی پشت: کل جعبه */}
            <Image
              src={`${IMG}box-back.webp`}
              alt="جعبه‌ی فلش‌کارت نشانه‌ها و ترکیبات فارسی"
              width={NATIVE.w}
              height={NATIVE.h}
              unoptimized
              priority
              draggable={false}
              className="absolute max-w-none"
              style={{
                left: BOX_LEFT,
                top: BOX_TOP,
                width: BOX_W,
                height: BOX_H,
                zIndex: 0,
                filter: "drop-shadow(0 14px 18px rgba(0,0,0,.28))",
              }}
            />

            {/* کارت‌ها: بین لایه‌ی پشت و دیواره‌ی جلو */}
            {CARDS.map((c, i) => (
              <Card
                key={c.src}
                def={c}
                index={i}
                mx={sx}
                my={sy}
                reduce={reduce}
              />
            ))}

            {/* لایه‌ی جلو: فقط دیواره‌ی سبز جلوی جعبه */}
            <Image
              src={`${IMG}box-front.webp`}
              alt=""
              aria-hidden
              width={NATIVE.w}
              height={NATIVE.h}
              unoptimized
              priority
              draggable={false}
              className="pointer-events-none absolute max-w-none"
              style={{
                left: BOX_LEFT,
                top: BOX_TOP,
                width: BOX_W,
                height: BOX_H,
                zIndex: 20,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
