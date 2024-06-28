import styles from "./Select.module.css";

const Select = ({ name, handleSelect, tossWinner, data, teams }) => {
  return (
    <div className={styles.card}>
      <h1 className={styles.card_title}>Team {name === "firstTeam" ? 1 : 2}</h1>
      <label className={styles.card_label}>Choose a team : </label>
      <select
        className={styles.card_select}
        name={name}
        onChange={handleSelect}
        disabled={tossWinner !== ""}
        value={teams[name]}
      >
        <option value="" disabled>
          Select team 1
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
