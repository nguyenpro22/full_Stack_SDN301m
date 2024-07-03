"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const ForbiddenPage: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-black text-green-500"
      style={{ fontFamily: "'Press Start 2P', cursive" }}
    >
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="text-center">
        <div
          className="text-6xl mb-4"
          style={{ textShadow: "0px 0px 10px #54FE55" }}
        >
          403
        </div>
        <div
          className="text-2xl mb-4"
          style={{ textShadow: "0px 0px 10px #54FE55" }}
        >
          Forbidden<span className="blink">_</span>
        </div>
        <button
          onClick={handleBackToHome}
          className="mt-4 px-4 py-2 bg-green-500 text-black text-sm font-bold uppercase rounded"
        >
          Back to Home
        </button>
      </div>
      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 0;
          }
          49% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }
        .blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default ForbiddenPage;
