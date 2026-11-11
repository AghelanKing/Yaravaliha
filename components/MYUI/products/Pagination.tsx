"use client";

import { paginationGenerator } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

function Pagination({ totalPage }: { totalPage: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(pageNumber || 1));

    return `${pathname}?${params.toString()}`;
  };

  if (totalPage <= 1) return null;

  const allPages = paginationGenerator(totalPage, currentPage);

  return (
    <nav
      aria-label="صفحه‌بندی محصولات"
      className="mt-6 flex w-full min-w-0 items-center justify-center gap-1.5 p-1 sm:gap-2"
    >
      <PaginationArrow
        dir="right"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex min-w-0 items-center justify-center gap-1.5 sm:gap-2">
        {allPages.map((page, index) => {
          const middle = page === "...";

          return (
            <PaginationContent
              key={`${page}-${index}`}
              page={page}
              href={createPageURL(page)}
              middle={middle}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        dir="left"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPage}
      />
    </nav>
  );
}

function PaginationContent({
  page,
  href,
  middle,
  isActive,
}: {
  page: number | string;
  href: string;
  middle: boolean;
  isActive: boolean;
}) {
  const className = `
    flex size-9 shrink-0 items-center justify-center rounded-xl
    border border-border bg-background
    text-sm font-semibold text-muted-foreground
    transition-all duration-200
    sm:size-10 sm:text-base
    ${
      isActive
        ? "border-primary bg-primary text-primary-foreground shadow-sm"
        : "hover:border-primary hover:bg-secondary hover:text-primary"
    }
    ${
      middle
        ? "border-transparent bg-transparent text-muted-foreground hover:border-transparent hover:bg-transparent hover:text-muted-foreground"
        : ""
    }
  `;

  if (middle) {
    return (
      <span aria-hidden="true" className={className}>
        ...
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      aria-label={`صفحه ${page}`}
      className={className}
    >
      {page}
    </Link>
  );
}

function PaginationArrow({
  dir,
  href,
  isDisabled,
}: {
  dir: "right" | "left";
  href: string;
  isDisabled: boolean;
}) {
  const Icon = dir === "right" ? RiArrowRightLine : RiArrowLeftLine;

  const className = `
    flex size-9 shrink-0 items-center justify-center rounded-xl
    border border-border bg-background
    text-lg text-muted-foreground transition-all duration-200
    sm:size-10 sm:text-xl
    ${
      isDisabled
        ? "cursor-not-allowed opacity-40"
        : "hover:border-primary hover:bg-secondary hover:text-primary"
    }
  `;

  if (isDisabled) {
    return (
      <span aria-disabled="true" className={className}>
        <Icon />
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={dir === "right" ? "صفحه قبلی" : "صفحه بعدی"}
      className={className}
    >
      <Icon />
    </Link>
  );
}

export default Pagination;
