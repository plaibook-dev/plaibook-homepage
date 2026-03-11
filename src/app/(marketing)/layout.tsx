import dynamic from "next/dynamic";
import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import StickyBookDemo from "@/components/marketing/StickyBookDemo";

const ChatWidget = dynamic(() => import("@/components/ui/ChatWidget"));

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
