// src/app/layout.js

import '../styles/globals.css';
import Layout from '../components/Layout';

// export const metadata = {
//   title: 'Billing Software',
//   description: 'A minimalistic billing software PWA',
//   icons: [
//     { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
//     { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
//   ],
//   manifest: '/manifest.json',
//   themeColor: '#000000',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
