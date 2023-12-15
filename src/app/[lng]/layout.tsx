//libs
import { ReactNode } from "react";
import {dir} from 'i18next'
//styles
import "@/styles/global.scss"
//components
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
//redux
import { Providers } from "@/redux/provider";
import {languages} from "@/app/i18n/settings";


const mainagStyles = {
  flex: "1 1 auto",
  width: "100%",
  margin: "0 auto"
}



export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}
export default function LocaleLayout({
                                       children,
                                       params: {
                                         lng
                                       }
                                     } : {children: ReactNode, params: {lng: string}}) {
  return (
    <html lang={lng}>
      <body>
        <Providers>
          <Header />
          <main style={mainagStyles} className="main">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}



