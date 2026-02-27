import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import StickyBookDemo from "@/components/marketing/StickyBookDemo";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <StickyBookDemo />
      <Footer />
    </>
  );
}
