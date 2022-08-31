import React from "react";

const Footer = () => {
  return (
    <footer className="text-center font-bold italic p-6 leading-relaxed space-y-4">
      <p>
        Like what you see AND would like to Pay It Forward to benefit other
        boaters?
      </p>
      <p>
        You are in luck! Just make a small donation to our{" "}
        <a
          className="underline"
          href="https://www.gofundme.com/f/8kpxz-help-us-boaters-amp-the-environment-sustain-bups"
          target="_blank"
        >
          GoFundMe&nbsp;
        </a>
        campaign.
      </p>
      <p>
        Funds will be used to add site features as well as inventory sources.
      </p>
    </footer>
  );
};

export default Footer;
