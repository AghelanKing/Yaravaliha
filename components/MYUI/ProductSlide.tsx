"use client";

import { motion } from "motion/react";
import Image from "next/image";

export type CardConfig = {
  src: string;
  /** عرض کارت به درصدِ عرض جعبه */
  w: number;
  /** نسبت عرض به ارتفاع عکس */
  ratio: number;
  side: "left" | "right";
  /** زاویه‌ی کج شدن (درجه) */
  rotate: number;
  /** چند درصد از عرض جعبه، کارت بیرون از لبه‌ی جعبه باشه (پیش‌فرض ۲۶) */
  show?: number;
  /** جابه‌جایی عمودی به درصد ارتفاع کارت (منفی = بالاتر، پیش‌فرض ۱۲-) */
  y?: number;
};

export type Product = {
  title: string;
  box: { src: string; ratio: number };
  cards: CardConfig[];
  price: number;
  href: string;
};

export default function ProductSlide({
  product,
  active,
}: {
  product: Product;
  active: boolean;
}) {
  return (
    <div className="relative mx-auto my-16 w-40 sm:w-72.5">
      {product.cards.map((card, i) => {
        const show = card.show ?? 26;
        const y = card.y ?? -12;
        const offset = 50 + show - card.w / 2;
        const sign = card.side === "left" ? -1 : 1;
        const x = `${sign * (offset / card.w) * 100}%`;

        return (
          <div
            key={card.src}
            className="absolute z-0"
            style={{
              left: `${50 - card.w / 2}%`,
              width: `${card.w}%`,
              top: "50%",
              marginTop: `-${card.w / card.ratio / 2}%`,
            }}
          >
            <motion.div
              initial={false}
              animate={
                active
                  ? { x, y: `${y}%`, rotate: card.rotate, opacity: 1, scale: 1 }
                  : { x: "0%", y: "0%", rotate: 0, opacity: 0, scale: 0.9 }
              }
              transition={{
                type: "spring",
                stiffness: 55,
                damping: 13,
                delay: active ? 0.3 + i * 0.18 : 0,
              }}
            >
              {/* شناوری ملایم بعد از بیرون اومدن */}
              <motion.div
                animate={active ? { y: [0, -5, 0, 4, 0] } : { y: 0 }}
                transition={
                  active
                    ? {
                        duration: 6 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.4 + i * 0.3,
                      }
                    : { duration: 0.3 }
                }
              >
                <Image
                  src={card.src}
                  alt=""
                  width={400}
                  height={Math.round(400 / card.ratio)}
                  className="h-auto w-full rounded-md drop-shadow-lg"
                />
              </motion.div>
            </motion.div>
          </div>
        );
      })}

      {/* ===== جعبه: جلوی کارت‌ها ===== */}
      <motion.div
        className="relative z-10"
        initial={false}
        animate={
          active
            ? { scale: 1, opacity: 1, y: 0 }
            : { scale: 0.92, opacity: 0.6, y: 12 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image
          src={product.box.src}
          alt={product.title}
          width={700}
          height={Math.round(700 / product.box.ratio)}
          priority
          className="h-auto w-full drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
}
