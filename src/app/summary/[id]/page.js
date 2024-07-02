export const dynamic = "force-dynamic";
export const revalidate = 10;

import { GAME } from "@/constants/gameConstants";
import { fetchGame } from "@/app/server-actions/fetchGame";
import { connect } from "@/db/connect";

import styles from "./page.module.css";
import InningSummary from "@/app/components/inning-summary/InningSummary";
import BattingTable from "@/app/components/batting-table/BattingTable";
import BowlingTable from "@/app/components/bowling-table/BowlingTable";

const Summary = async ({ params }) => {
  const { id } = params;
  connect();
  const match = await fetchGame(id);

  const { firstInning, secondInning } = match;

  if (!match) {
    throw new Error("Not match found");
  }

  return (
    <div className={styles.summary_container}>
      <header className={styles.summary_header}>
        <h1>{GAME.SCORE_BOARD_TITLE}</h1>
      </header>
      <main className={styles.innings_container}>
        <section className={styles.inning_section}>
          <h2 className={styles.inning_heading}>{GAME.FIRST_INNINGS_TITLE}</h2>
          <div className={styles.inning_tables}>
            <div className={styles.inning_summary}>
              <InningSummary inning={firstInning} />
              <BattingTable players={firstInning.battingCountryPlayers} />
            </div>
            <div className={styles.inning_summary}>
              <h2>{firstInning.bowlingCountry}</h2>
              <BowlingTable players={firstInning.bowlingCountryPlayers} />
            </div>
          </div>
        </section>
        {match.currentInning === GAME.SECOND_INNINGS && (
          <section className={styles.inning_section}>
            <h2 className={styles.inning_heading}>
              {GAME.SECOND_INNINGS_TITLE}
            </h2>
            <div className={styles.inning_tables}>
              <div className={styles.inning_summary}>
                <InningSummary inning={secondInning} />
                <BattingTable players={secondInning.battingCountryPlayers} />
              </div>
              <div className={styles.inning_summary}>
                <h2>{secondInning.bowlingCountry}</h2>
                <BowlingTable players={secondInning.bowlingCountryPlayers} />
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Summary;
