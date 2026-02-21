// src/components/Reviews/Reviews.jsx
import Icon from "../shared/Icon"; // Yıldızlar için kullanılan ikon bileşeni
import styles from "./Reviews.module.css"; // Yorum listesi stilleri

const Reviews = ({reviews}) => {
  return (
    <div className={styles.reviewsList}>
      {" "}
      {/* Tüm yorumları alt alta dizen kapsayıcı */}
      {reviews.map((rev, index) => (
        <div key={index} className={styles.reviewItem}>
          {" "}
          {/* Tekil yorum kartı */}
          <div className={styles.reviewerInfo}>
            {/* Kullanıcının adının ilk harfinden oluşan avatar */}
            <div className={`${styles.avatar} H2`}>
              {rev.reviewer_name.charAt(0).toUpperCase()}
            </div>

            <div className={styles.nameGroup}>
              {/* Kullanıcı ismi için H3 font standartı kullanıldı */}
              <span className={`${styles.reviewerName} Body2`}>
                {rev.reviewer_name}
              </span>

              {/* Yıldızlı Puanlama Alanı */}
              <div className={styles.starsRow}>
                {[...Array(5)].map((_, i) => {
                  // Eğer döngü indeksi puandan küçükse sarı yıldız (rating-pressed), değilse gri (rating)
                  const isPressed = i < rev.reviewer_rating;

                  return (
                    <Icon
                      key={i}
                      id={isPressed ? "rating-pressed" : "rating"}
                      width="16"
                      height="16"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {/* Yorum metni - Global Body sınıfı ile */}
          <p className={`${styles.comment} Body`}>{rev.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
