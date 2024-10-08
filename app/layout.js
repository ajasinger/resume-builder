import { Noto_Sans } from 'next/font/google';
import { Merriweather } from 'next/font/google';
import "./globals.css";

const sans = Noto_Sans({ subsets: ['latin'] })
const serif = Merriweather({ weight: '400', subsets: ['latin'] })

export const metadata = {
  title: "Resume generator",
  description: "Automatically create your resume",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sans.className} ${serif.className} text-[#1E1928] bg-[#EEEDF8] px-12 py-24`}
      >
        {children}
      </body>
    </html>
  );
}
