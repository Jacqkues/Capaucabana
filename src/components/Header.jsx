import styles from '@/styles/Header.module.css'
import { useAnimation } from 'framer-motion'
import { useEffect } from 'react';
import Loader from './Loader'
import { defautTransition } from '@/utils';
import { useState } from 'react';
import Menu from './Menu';
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
export default function Header({ toggleView, view, gridTogle }) {
    const router = useRouter()
    const ct = useAnimation();
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        ct.set(() => ({
            opacity: 0
        }))
    }, [])

    const clickFunction = () => {
        setShowMenu(true)
        ct.start(() => ({
            opacity: 1,
            transition: { defautTransition }
        }))
    }

    const click = () => {
        router.push("/")
      }
    return (
        <>
            {showMenu && <Menu toggle={setShowMenu} />}
            <motion.header className={styles.HeaderContainer}
            
            >



                {gridTogle && <button className={styles.HeaderButton}
                    onClick={() => toggleView(!view)}
                >
                    {!view ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-columns"><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path></svg>}
                </button>}

                <button className={styles.HeadMenu} onClick={() => clickFunction()}>MENU</button>


            </motion.header>

            <motion.div className={styles.sideTitle} onClick={() => click()} style={{
                cursor: 'pointer'
            }}
           
            >
                CAPAUCABANA
            </motion.div>
        </>
    )
}