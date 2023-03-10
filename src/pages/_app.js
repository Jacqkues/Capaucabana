import '@/styles/globals.css'
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps, router }) {

  return <AnimatePresence
    mode="wait"
    initial={false}
    onExitComplete={() => {
      console.log("EXIT COMPLETE", router.asPath);
    }}
  >
    <Component {...pageProps} key={router.pathname} />
  </AnimatePresence>


}
