import '@mantine/core/styles.css';
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import Header from './components/header';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className="bg-[#F2E8DE] text-[#4C331F]">
        <MantineProvider>
          <Header/>
          <div className="container mx-10">
           {children}
          </div>
         </MantineProvider>
      </body>
    </html>
  );
}

// import { MantineProvider } from '@mantine/core'
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Header from './components/header';

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "梶研商店",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className="bg-[#F2E8DE] text-[#4C331F]">
//         <MantineProvider>
//         <Header/>
//         <div className="container mx-10">
//           {children}
//         </div>
//         </MantineProvider>
//       </body>
//     </html>
//   )
// }
