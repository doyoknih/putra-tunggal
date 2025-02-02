import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-screen-2xl mx-auto relative">
      <Header />
      {children}
    </main>
  );
}
