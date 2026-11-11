import { ProductContentData } from "@/lib/difintions";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  Info,
  Lightbulb,
  Package,
  Phone,
  Sparkles,
} from "lucide-react";

type ProductContentProps = {
  content: ProductContentData | null;
};

export function ProductContent({ content }: ProductContentProps) {
  if (!content) return null;

  const stats = [
    content.total_cards !== undefined && {
      label: "تعداد کارت‌ها",
      value: content.total_cards,
      icon: BookOpen,
    },
    content.total_pages !== undefined && {
      label: "تعداد صفحات",
      value: content.total_pages,
      icon: FileText,
    },
    content.total_items !== undefined && {
      label: "تعداد موارد",
      value: content.total_items,
      icon: Package,
    },
  ].filter((item) => item !== false);

  const hasContact =
    content.contact?.name || content.contact?.phone || content.contact?.message;

  return (
    <section className="mt-16 space-y-8 border-t border-border pt-10 w-[58%]">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <Info className="size-5" />
          <span className="text-sm font-semibold">معرفی محصول</span>
        </div>

        <h2 className="text-2xl font-bold sm:text-3xl">درباره این محصول</h2>
      </div>
      {(content.intro || content.description || content.usage) && (
        <div className="space-y-5">
          {content.intro && (
            <p className="text-base leading-9 text-foreground">
              {content.intro}
            </p>
          )}

          {content.description && (
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h3 className="mb-3 flex items-center gap-2 font-bold">
                <Info className="size-5 text-primary" />
                توضیحات محصول
              </h3>

              <p className="text-sm leading-8 text-muted-foreground">
                {content.description}
              </p>
            </div>
          )}

          {content.usage && (
            <div className="rounded-2xl border border-border bg-secondary/50 p-5 sm:p-6">
              <h3 className="mb-3 flex items-center gap-2 font-bold">
                <Lightbulb className="size-5 text-primary" />
                نحوه استفاده
              </h3>

              <p className="text-sm leading-8 text-muted-foreground">
                {content.usage}
              </p>
            </div>
          )}
        </div>
      )}

      {/* توضیحات ویژه */}
      {content.highlight && (
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-7">
          <div className="absolute -left-8 -top-8 size-32 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="size-5" />
              <span className="text-sm font-semibold">نکته ویژه</span>
            </div>

            <h3 className="text-lg font-bold">{content.highlight.title}</h3>

            {content.highlight.summary && (
              <p className="text-sm font-medium leading-8 text-foreground">
                {content.highlight.summary}
              </p>
            )}

            {content.highlight.description && (
              <p className="text-sm leading-8 text-muted-foreground">
                {content.highlight.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* بخش‌های محتوایی محصول */}
      {content.sections && content.sections.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          {content.sections.map((section, index) => (
            <div
              key={`${section.title}-${index}`}
              className="rounded-2xl border border-border bg-card p-5 sm:p-6"
            >
              <h3 className="mb-5 flex items-center gap-2 font-bold">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CheckCircle2 className="size-4" />
                </span>

                {section.title}
              </h3>

              {section.items && section.items.length > 0 && (
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-3 text-sm leading-7 text-muted-foreground"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.pages !== undefined && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <FileText className="size-4" />
                    {section.pages} صفحه
                  </div>

                  {section.description && (
                    <p className="text-sm leading-8 text-muted-foreground">
                      {section.description}
                    </p>
                  )}
                </div>
              )}

              {!section.items?.length &&
                section.pages === undefined &&
                section.description && (
                  <p className="text-sm leading-8 text-muted-foreground">
                    {section.description}
                  </p>
                )}
            </div>
          ))}
        </div>
      )}

      {/* آمار و مشخصات */}
      {(stats.length > 0 || content.format) && (
        <div className="rounded-2xl border border-border bg-muted/50 p-5 sm:p-6">
          <h3 className="mb-5 font-bold">مشخصات تکمیلی</h3>

          <div className="flex flex-wrap gap-3">
            {stats.map((stat) => {
              if (!stat) return null;

              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="flex min-w-36 flex-1 items-center gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>

                  <div>
                    <p className="text-lg font-bold tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}

            {content.format && (
              <div className="flex min-w-36 flex-1 items-center gap-3 rounded-xl border border-border bg-card p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="size-5" />
                </span>

                <div>
                  <p className="font-bold">{content.format}</p>
                  <p className="text-xs text-muted-foreground">نوع محصول</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* نکته ارسال */}
      {content.shipping_note && (
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
          <Package className="mt-1 size-5 shrink-0 text-primary" />

          <div>
            <h3 className="mb-2 font-bold">نکته ارسال</h3>
            <p className="text-sm leading-8 text-muted-foreground">
              {content.shipping_note}
            </p>
          </div>
        </div>
      )}

      {/* اطلاعات تماس */}
      {hasContact && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Phone className="size-5 text-primary" />
            <h3 className="font-bold">نیاز به اطلاعات بیشتر دارید؟</h3>
          </div>

          {content.contact?.message && (
            <p className="mb-4 text-sm leading-8 text-muted-foreground">
              {content.contact.message}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            {content.contact?.name && (
              <span className="text-sm font-medium">
                {content.contact.name}
              </span>
            )}

            {content.contact?.phone && (
              <a
                href={`tel:${content.contact.phone}`}
                dir="ltr"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Phone className="size-4" />
                {content.contact.phone}
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
