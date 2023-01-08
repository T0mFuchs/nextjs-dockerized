import Head from "next/head";
import Image from "next/image";
import Separator from "ui/radix-ui/separator";

import styles from "styles/main.module.scss";
import css from "./about.module.scss";

import lighthousePNG from "../../public/assets/images/lighthouse.png";
import webvitalsPNG from "../../public/assets/images/webvitals.png";

export default function Page() {
  return (
    <>
      <Head>
        <title>?</title>
      </Head>
      <>
        <h2 className={styles.H2}>?</h2>
        <Separator className={css.sep} />
        <div aria-hidden style={{ paddingBottom: "1em" }} />
        <>
          <div style={{ padding: "1em" }}>
            <div className={`${styles.Card} ${css.card}`}>
              <div className={styles.border}>
                <p>next.js</p>
                <p>hosted with vercel on aws servers</p>
                <p>cold starts 1s max</p>
              </div>
            </div>
          </div>
          <div style={{ padding: "1em" }}>
            <div className={`${css.card} ${css.onhover}`}>
              <p>google lighthouse score</p>
              <Image
                src={lighthousePNG}
                alt="google lighthouse picture"
                className={css.img}
              />
            </div>
          </div>
          <div style={{ padding: "1em" }}>
            <div className={`${css.card} ${css.onhover}`}>
              <p>Web Vitals</p>
              <Image
                src={webvitalsPNG}
                alt="web vitalis picture"
                className={css.img}
              />
            </div>
          </div>
          <div aria-hidden style={{ height: 50 }} />
        </>
      </>
    </>
  );
}
