import styles from "@/styles/Classique.module.css";
import Image from "next/image";
import Head from "next/head";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { defautTransition } from "@/utils";
import { useRouter } from "next/router";
export default function Repas() {




    return (
        <>

            <Head>
                <title>Menu - CAPAUCABANA</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/logo_normal_small.svg" />
            </Head>
            <Header gridTogle={false} />


            <motion.div className={styles.centerElement}

                transition={defautTransition}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}

               

            >

                <div className={styles.soir}>


                    <motion.img src={"/images/menu.png"}

                    />

                </div>

            </motion.div>

        </>
    )
}