import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link href="/">MyApp</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-gray-200">
              About
            </Link>
          </li>
          <li>
            <Link href="/login" className="text-white hover:text-gray-200">
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/signup"
              className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-100"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
