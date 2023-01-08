import Head from "next/head";
import Separator from "ui/radix-ui/separator";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>server error</title>
      </Head>
      <div style={{ paddingTop: "1em", margin: "0 auto" }}>
        <h1>500</h1>
        <div style={{ padding: "2em" }}>
          <Separator style={{ maxWidth: 300, margin: "1em auto" }} />
        </div>
        <h2>Server-side error occurred</h2>
      </div>
    </>
  );
}
