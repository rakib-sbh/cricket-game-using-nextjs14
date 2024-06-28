import styles from "./Button.module.css";

const Button = ({ text }) => {
  return <button className={styles.btn}>{text}</button>;
};

export default Button;
