import React, { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/data");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="A simple Next.js application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to my <a href="https://nextjs.org">Next.js</a> app!
        </h1>

        {data && (
          <div>
            <h2>Data from the API:</h2>
            <p>{JSON.stringify(data)}</p>
          </div>
        )}
      </main>
    </div>
  );
}
