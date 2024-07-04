import Link from "next/link";

import styles from "./page.module.css";
import { GAME } from "@/constants/gameConstants";

const Page = () => {
  return (
    <main className={styles.main}>
      <div>
        <Link href={"/match/create"}>
          <button className={styles.btn}>{GAME.START}</button>
        </Link>
      </div>
    </main>
  );
};

export default Page;
