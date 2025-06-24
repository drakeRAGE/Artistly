import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

// Define metadata for SEO
export const metadata = {
  title: 'Artistly - Book Performing Artists',
  description: 'Connect with top performing artists for your events on Artistly',
  openGraph: {
    title: 'Artistly',
    description: 'Book top artists for your events',
    url: 'https://artistly.vercel.app',
    type: 'website',
  },
};

/**
 * Root layout component for the app
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Root layout
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}