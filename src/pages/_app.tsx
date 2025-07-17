import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Somali AI Dataset - Professional API Platform</title>
        <meta name="description" content="The world's first professional Somali AI dataset API. Scholar-approved, culturally authentic content for $9.99/month unlimited." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Somali AI Dataset - Professional API Platform" />
        <meta property="og:description" content="The world's first professional Somali AI dataset API. Scholar-approved, culturally authentic content for $9.99/month unlimited." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://somaliai.com" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Somali AI Dataset - Professional API Platform" />
        <meta name="twitter:description" content="The world's first professional Somali AI dataset API. Scholar-approved, culturally authentic content for $9.99/month unlimited." />
        
        {/* Additional Meta Tags */}
        <meta name="keywords" content="Somali, AI, dataset, API, machine learning, NLP, Islamic, authentic, professional" />
        <meta name="author" content="Somali AI Dataset" />
        <meta name="robots" content="index, follow" />
        
        {/* Stripe JS */}
        <script src="https://js.stripe.com/v3/" async></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}