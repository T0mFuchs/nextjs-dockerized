import Head from "next/head";
import Separator from "ui/radix-ui/separator";

export default function Error() {
  return (
    <>
      <Head>
        <title>Auth Error</title>
      </Head>
      <div style={{ paddingTop: "1em", margin: "0 auto" }}>
        <h1>Auth Error</h1>
        <div style={{ padding: "2em" }}>
          <Separator style={{ maxWidth: 300, margin: "1em auto" }} />
        </div>
        <h2>Something went wrong</h2>
      </div>
    </>
  );
}
