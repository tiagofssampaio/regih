import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => (
  <>
    <Head>
      <title>RegiH</title>
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>RegiH</h1>

      <div className={styles.grid}>
        <div className={styles.card}>HELLO WORLD</div>
      </div>
    </main>
    <footer className={styles.footer}>Tiago Sampaio</footer>
  </>
);

export default Home;
