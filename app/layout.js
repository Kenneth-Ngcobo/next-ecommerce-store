import Filters from "./components/Filters";
import Header from "./components/Header";
import "./globals.css";

export const metadata = {
  title: "E-Commerce Store",
  description: "Dummy JSON e-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto px-4">
          <Header />
          <Filters />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
