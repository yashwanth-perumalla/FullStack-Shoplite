export const metadata = { title: "ShopLite", description: "Mini e-commerce demo with Next.js + Zustand" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 16px", fontFamily: "system-ui, Arial" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
