import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

    async function register()
    {
        const response = await fetch('/api/hello')
        const id = await response.json()
        console.log('response', id)
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
