import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

    function register()
    {
        alert("timer started")
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>RegiH</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    RegiH
                </h1>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <button onClick={register}>
                            Start timer
                        </button>
                    </div>
                </div>
            </main>
            <footer className={styles.footer}>Tiago Sampaio</footer>
        </div>
    )
}
