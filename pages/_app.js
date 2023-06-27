// import '../styles/calendar.css'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import dynamic from 'next/dynamic'

const Toaster = dynamic(
  () => import('react-hot-toast').then((c) => c.Toaster),
  {
    ssr: false,
  }
)
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 5000,
          style: {},
        }}
      />
    </SessionProvider>
  )
}
