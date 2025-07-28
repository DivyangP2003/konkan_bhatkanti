import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "Konkan Explorer - Discover the Beauty of Konkan Coast",
  description: "Explore pristine beaches, historic forts, and authentic culture of the Konkan region",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
