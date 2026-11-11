import "../globals.css";
import Nav from "@/components/MYUI/Nav";
import Footer from "@/components/MYUI/Footer";
import { Suspense } from "react";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className={`flex min-h-dvh flex-col`}>
      <Suspense>
        <Nav />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
