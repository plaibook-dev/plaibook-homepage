import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
