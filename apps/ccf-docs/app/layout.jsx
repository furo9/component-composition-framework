import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: 'Component Composition Framework',
  description: 'Documentation for Component Composition Framework'
}

const navbar = <Navbar logo={<b>Component Composition Framework</b>} />
const footer = <Footer>MIT {new Date().getFullYear()} (c) Component Composition Framework.</Footer>

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/furo9/component-composition-framework/tree/main/apps/ccf-docs"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
