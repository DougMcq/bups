import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const GeneralLayout = ({ title, children }) => {

  return (
    <div className="flex flex-col min-h-max max-w-[1920px] justify-center mx-auto relative">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main
        className="flex w-full flex-1 flex-col items-center text-center"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default GeneralLayout;
