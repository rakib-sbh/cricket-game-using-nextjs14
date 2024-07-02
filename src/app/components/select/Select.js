import styles from "./Select.module.css";
import { GAME } from "@/constants/gameConstants";

const Select = ({ name, handleSelect, tossWinner, data, teams }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.card_title}>
        {GAME.TEAM} {name === GAME.FIRST_TEAM ? 1 : 2}
      </h1>
      <label className={styles.card_label}>{GAME.CHOOSE_TEAAM_TEXT} </label>
      <select
        className={styles.card_select}
        name={name}
        onChange={handleSelect}
        disabled={tossWinner !== ""}
        value={teams[name]}
      >
        <option value="" disabled>
          {GAME.SELECT_TEAM_TEXT}
        </option>
        {data
          .filter(
            (country) =>
              country !==
              (name === "firstTeam" ? teams.secondTeam : teams.firstTeam)
          )
          .map((country, index) => {
            return (
              <option
                value={country}
                key={index}
                disabled={country === teams[name]}
              >
                {country}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Select;
