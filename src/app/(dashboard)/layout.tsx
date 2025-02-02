import DefaultLayout from "@/components/(dashboard)/layout/DefaultLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="hidden md:block">
      <DefaultLayout>{children}</DefaultLayout>
    </div>
  );
}
