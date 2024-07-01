export const dynamic = 'force-dynamic'
export const revalidate = 10

import { fetchGame } from "@/app/server-actions/fetchGame";
import { connect } from "@/db/connect";
import { convertBallsToOvers } from "@/utils/convertBallsToOvers";

import styles from "./page.module.css"

const Summary = async ({ params }) => {
  const { id } = params;
  connect();
  const match = await fetchGame(id);
  const firstInning = match.firstInning;
  const secondInning = match.secondInning;

  if (!match) {
    return <div>Match not found</div>;
  }

  return (
    <div className={styles.summary_container}>
      <header className={styles.summary_header}>
        <h1>Score Board</h1>
      </header>
      <main className={styles.innings_container}>
        <section className={styles.inning_section}>
          <h2 className={styles.inning_heading}>First Innings</h2>
          <div className={styles.inning_tables}>
            <div className={styles.inning_summary}>
              <h2>{firstInning.battingCountry} {firstInning.totalRuns}-{firstInning.totalWickets} ({firstInning.oversPlayed} overs)</h2>
              <table className={styles.batting_table}>
                <thead>
                  <tr>
                    <th>Batsman</th>
                    <th>Runs</th>
                    <th>Balls</th>
                    <th>4s</th>
                    <th>6s</th>
                    <th>SR</th>
                  </tr>
                </thead>
                <tbody>
                  {firstInning.battingCountryPlayers.map((player, index) => {
                    const { name, numberOfRuns, numberOfFours, numberOfSixes, numberOfBallsPlayed } = player;
                    if (numberOfBallsPlayed == 0) {
                      return <tr key={index}>
                        <td> {name} </td>
                        <td> - </td>
                        <td> - </td>
                        <td> - </td>
                        <td> - </td>
                        <td> - </td>
                      </tr>
                    }
                    else return <tr key={index}>
                      <td>{name}</td>
                      <td>{numberOfRuns}</td>
                      <td>{numberOfBallsPlayed}</td>
                      <td>{numberOfFours}</td>
                      <td>{numberOfSixes}</td>
                      <td>{Math.floor(numberOfRuns / numberOfBallsPlayed * 100)}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
            <div className={styles.inning_summary}>
              <h2>{firstInning.bowlingCountry}</h2>
              <table className={styles.bowling_table}>
                <thead>
                  <tr>
                    <th>Bowler</th>
                    <th>Overs</th>
                    <th>Wickets</th>
                  </tr>
                </thead>
                <tbody>
                  {firstInning.bowlingCountryPlayers.map((player, index) => {
                    const { name, totalBallDelivered, numberOfWickets,
                    } = player;
                    if (totalBallDelivered == 0) {
                      return <tr key={index}>
                        <td> {name} </td>
                        <td> - </td>
                        <td> - </td>
                      </tr>
                    }
                    else return <tr key={index}>
                      <td>{name}</td>
                      <td>{convertBallsToOvers(totalBallDelivered)}</td>
                      <td>{numberOfWickets}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {
          match.currentInning === 'secondInning' && <section className={styles.inning_section}>
            <h2 className={styles.inning_heading}>Second First Innings</h2>
            <div className={styles.inning_tables}>
              <div className={styles.inning_summary}>
                <h2>{secondInning.battingCountry} {secondInning.totalRuns}-{secondInning.totalWickets} ({secondInning.oversPlayed} overs)</h2>
                <table className={styles.batting_table}>
                  <thead>
                    <tr>
                      <th>Batsman</th>
                      <th>Runs</th>
                      <th>Balls</th>
                      <th>4s</th>
                      <th>6s</th>
                      <th>SR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secondInning.battingCountryPlayers.map((player, index) => {
                      const { name, numberOfRuns, numberOfFours, numberOfSixes, numberOfBallsPlayed } = player;
                      if (numberOfBallsPlayed == 0) {
                        return <tr key={index}>
                          <td> {name} </td>
                          <td> - </td>
                          <td> - </td>
                          <td> - </td>
                          <td> - </td>
                          <td> - </td>
                        </tr>
                      }
                      else return <tr key={index}>
                        <td>{name}</td>
                        <td>{numberOfRuns}</td>
                        <td>{numberOfBallsPlayed}</td>
                        <td>{numberOfFours}</td>
                        <td>{numberOfSixes}</td>
                        <td>{Math.floor(numberOfRuns / numberOfBallsPlayed * 100)}</td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
              <div className={styles.inning_summary}>
                <h2>{secondInning.bowlingCountry}</h2>
                <table className={styles.bowling_table}>
                  <thead>
                    <tr>
                      <th>Bowler</th>
                      <th>Overs</th>
                      <th>Wickets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secondInning.bowlingCountryPlayers.map((player, index) => {
                      const { name, totalBallDelivered, numberOfWickets,
                      } = player;
                      if (totalBallDelivered == 0) {
                        return <tr key={index}>
                          <td> {name} </td>
                          <td> - </td>
                          <td> - </td>
                        </tr>
                      }
                      else return <tr key={index}>
                        <td>{name}</td>
                        <td>{convertBallsToOvers(totalBallDelivered)}</td>
                        <td>{numberOfWickets}</td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        }
      </main>
    </div>
  );
};

export default Summary;
