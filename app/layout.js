import "./globals.css";

export const metadata = {
  title: "E-Commerce Store",
  description: "Dummy JSON e-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
