"use client";

import React from "react";
import Link from "next/link";
import { Button } from "antd";

const Page404 = () => {
  return (
    <section className="page_404 flex items-center justify-center min-h-screen bg-white">
      <div className="container text-center">
        <div
          className="four_zero_four_bg bg-no-repeat bg-center flex flex-col justify-between  bg-cover h-screen"
          style={{
            backgroundImage:
              "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
          }}
        >
          <h1 className="text-6xl">404</h1>
          <div className="contant_box_404 mt-20">
            <h3 className="text-2xl font-semibold">Look like you're lost</h3>
            <p className="text-lg">
              The page you are looking for is not available!
            </p>
            <Link href="/">
              <Button className="link_404 inline-block mt-4 py-2 px-6 bg-green-600 text-white rounded hover:bg-green-700">
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
