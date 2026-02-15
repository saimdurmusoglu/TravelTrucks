import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Fetching amazing campers...</p>
    </div>
  );
};

export default Loader;