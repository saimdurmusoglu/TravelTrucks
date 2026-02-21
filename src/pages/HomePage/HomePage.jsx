import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

/**
 * HomePage component serving as the landing page (Hero Section).
 * It utilizes global typography and button styles to maintain design consistency.
 */
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      {/* Hero section featuring the primary background image and call-to-action */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.titleContainer}>
              {/* Main heading using the global H1 typography class */}
              <h1 className={`${styles.title} H1`}>
                Campers of your dreams
              </h1>
              {/* Subheading using the global H2 typography class */}
              <p className={`${styles.subtitle} H2`}>
                You can find everything you want in our catalog
              </p>
            </div>

            {/* Primary Action Button: Navigates the user to the Catalog page */}
            <button
              className="btn-primary"
              onClick={() => navigate("/catalog")}
            >
              View Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;