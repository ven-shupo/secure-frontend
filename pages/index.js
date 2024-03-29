import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Script from "next/script";
import CardHolder from "../components/cardHolder";


export default function Home() {
  return (
    <div
      className={styles.app}
      style={{backgroundColor: 'var(--tg-theme-secondary-bg-color)'}}
    >
      <Script
        src="https://ven-shupo.github.io/secure-frontend/tgcl.js"
        strategy="beforeInteractive"
      />
        <Head>
          <title>Secure frontend</title>
          <link rel="icon" href="https://ven-shupo.github.io/secure-frontend/favicon.ico" />
        </Head>
        <div>
          <CardHolder/>
        </div>
    </div>
  );
}
