import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>
                Campers of your dreams
              </h1>
              {/* Global H2 sınıfını doğrudan kullanıyoruz */}
              <p className={`${styles.subtitle} H2`}>
                You can find everything you want in our catalog
              </p>
            </div>

            {/* Global btn-primary sınıfını doğrudan kullanıyoruz */}
            <button
              className="btn-primary heroBtn"
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