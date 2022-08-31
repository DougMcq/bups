import "../styles/globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const description = `Boat Used Part Search (BUPS) is a free search service for US boaters. BUPS strives to keep boaters on the water & parts out of the landfill by matching buyers with sellers of used, re-built, NOS, vintage, NLA & clearance boat parts.`;

  return (
    <>
      <Head>
        <title>Boat Used Part Search</title>
        <meta name="description" content={description} />
        <link rel="shortcut icon" type="image/png" href="/favicon.jpg" />
      </Head>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
