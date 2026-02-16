import { useNavigate } from "react-router-dom"; // Sayfa geçişleri için hook
import styles from "./HomePage.module.css"; // Sayfaya özel stiller

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}> {/* Tüm ekranı kaplayan kapsayıcı */}
      <section className={styles.hero}> {/* Arka plan görselinin olduğu alan */}
        <div className={styles.container}> {/* 1440px genişlik sınırlayıcı */}
          <div className={styles.content}>
            <div className={styles.titleContainer}>
              {/* Global H1 sınıfı ile ana başlık */}
              <h1 className={`${styles.title} H1`}>
                Campers of your dreams
              </h1>
              {/* Global H2 sınıfı ile alt başlık */}
              <p className={`${styles.subtitle} H2`}>
                You can find everything you want in our catalog
              </p>
            </div>

            {/* Global btn-primary sınıfı ile ana aksiyon butonu */}
            <button
              className="btn-primary" // Genişlik ve padding globalden geliyor
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