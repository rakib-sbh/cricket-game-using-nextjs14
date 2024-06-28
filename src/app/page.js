import Link from "next/link";

import styles from "./page.module.css";
import Button from "./components/button/Button";

const Page = () => {
  return (
    <main className={styles.main}>
      <div>
        <Link href={"/simulate-match"}>
          <Button text={"Start Playing"} />
        </Link>
      </div>
    </main>
  );
};

export default Page;
