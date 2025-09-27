import { GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

interface HomeProps {
  domain: string
  url: string
  timestamp: string
}

export default function Home({ domain, url, timestamp }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js EasyPanel Starter</title>
        <meta name="description" content="Next.js starter project optimized for EasyPanel deployment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem-vindo ao <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Projeto starter otimizado para{' '}
          <a href="https://easypanel.io" target="_blank" rel="noopener noreferrer">
            EasyPanel
          </a>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Informações do Deploy &rarr;</h2>
            <p><strong>Domínio:</strong> {domain}</p>
            <p><strong>URL:</strong> {url}</p>
            <p><strong>Timestamp:</strong> {timestamp}</p>
          </div>

          <a href="/api/health" className={styles.card}>
            <h2>Health Check &rarr;</h2>
            <p>Verificar status da aplicação</p>
          </a>

          <a
            href="https://nextjs.org/docs"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>Documentação &rarr;</h2>
            <p>Encontre informações sobre recursos e API do Next.js.</p>
          </a>

          <a
            href="https://easypanel.io/docs"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>EasyPanel Docs &rarr;</h2>
            <p>Aprenda sobre deploy e configuração no EasyPanel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Powered by{' '}
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>{' '}
          & deployed on{' '}
          <a href="https://easypanel.io" target="_blank" rel="noopener noreferrer">
            EasyPanel
          </a>
        </p>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      domain: process.env.NEXT_PUBLIC_DOMAIN || 'localhost:3000',
      url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
      timestamp: new Date().toISOString(),
    },
  }
}
