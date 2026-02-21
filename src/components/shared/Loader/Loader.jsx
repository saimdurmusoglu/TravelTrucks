import styles from './Loader.module.css';

/**
 * Loader component used for asynchronous data fetching states.
 * Features a CSS-based spinner and aligned typography with the design system.
 */
const Loader = () => {
  return (
    <div className={styles.container}>
      {/* Visual spinner ring created with CSS animation */}
      <div className={styles.spinner}></div>
      
      {/* Utilizing the global 'Body2' class for typography consistency */}
      <p className={`${styles.text} Body2`}>Fetching amazing campers...</p>
    </div>
  );
};

export default Loader;