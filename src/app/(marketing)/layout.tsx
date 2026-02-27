import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import StickyBookDemo from "@/components/marketing/StickyBookDemo";
import ChatWidget from "@/components/ui/ChatWidget";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <ChatWidget />
      <StickyBookDemo />
      <Footer />
    </>
  );
}
