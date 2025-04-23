
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="h-screen flex items-center justify-center flex-col">
    {children}
   </div>
  );
}