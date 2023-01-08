import Head from "next/head";
import Separator from "ui/radix-ui/separator";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>look somewhere else</title>
      </Head>
      <div style={{ paddingTop: "1em", margin: "0 auto" }}>
        <h1>404</h1>
        <div style={{ padding: "2em" }}>
          <Separator style={{ maxWidth: 300, margin: "1em auto" }} />
        </div>
        <h2>Not Found</h2>
      </div>
    </>
  );
}
