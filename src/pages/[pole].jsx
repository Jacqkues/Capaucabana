import Header from "@/components/Header"
import People from "@/components/People"
import { MembresPoles } from "@/poles"
import styles from "@/styles/Home.module.css"
import { motion } from "framer-motion"
import { defautTransition } from "@/utils"
import Head from "next/head"
import { useEffect } from "react"
export default function Pole({ data ,p}) {
    // const data = MembresPoles["com"].membres
    const mb = data.membres;
    
    console.log(p)
    useEffect(() => {
        localStorage.setItem('info', 'alreadyPlayed')
    }, [])

    return (
        <>

            <Head>
                <title>CAPAUCABANA</title>
                <meta name="description" content="Site internet de la liste bde capaucabana pour cytech pau" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/logo_normal_small.svg" />
            </Head>
            <Header gridTogle={false} />

            <div className={styles.listElement} >
                <motion.h1 className={styles.textPole}
                    initial={{
                        opacity: 0,
                        filter: 'blur(20px)',
                    }}
                    whileInView={{
                        opacity: 1,
                        filter: 'blur(0px)',
                    }}
                    transition={{ ...defautTransition }}
                    viewport={{ once: true }}

                    exit={{
                        filter: 'blur(20px)',
                        opacity: 0,
                        transition: { ...defautTransition, delay: 1 / 10 },
                        zIndex: 0,
                    }}


                >
                    
                    {data.text}
                    
                </motion.h1>
                {mb.map((element, index) => (
                    <div key={index} className={styles.elementL}>
                        <div className={styles.thumbnailWrapper}>
                            <People  element={element} index={index} over={p == "main" ? false : true}/>
                        </div>
                    </div>
                ))}
            </div>



        </>
    )
}


export async function getStaticProps({ params }) {
    return {
        props: {
            data: MembresPoles[params.pole],
            p: params.pole
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: Object.keys(MembresPoles).map((pole) => ({
            params: { pole },
        })),
        fallback: false,
    }
}
