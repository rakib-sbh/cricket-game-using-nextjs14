import styles from "./Header.module.css";
import { GAME } from "@/constants/gameConstants";

const Header = ({ gameState }) => {
  const currentInning = gameState.currentInning;
  const inningData = gameState[currentInning];
  const { battingCountry, bowlingCountry } = inningData;
  return (
    <header className={styles.game_header}>
      <h1>
        {battingCountry} VS {bowlingCountry}
      </h1>
      <h3>
        {gameState.currentInning === GAME.FIRST_INNINGS
          ? GAME.FIRST_INNINGS_TITLE
          : GAME.SECOND_INNINGS_TITLE}
      </h3>
    </header>
  );
};

export default Header;
