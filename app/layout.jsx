import './globals.css';
import { CartProvider } from '../context/CartContext';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';

export const metadata = {
  title: 'VIVA — Live Better | Mindful Minimalist Store',
  description: 'Discover quality, sustainable products across beauty, home, tech, and fashion tailored for clean living.',
  keywords: 'ecommerce, clean green, sustainable living, minimalist shop, viva',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <Toast />
          <AnnouncementBar />
          <Navbar />
          <main className="main-content-area">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

