// src/components/Reviews/Reviews.jsx
import Icon from '../shared/Icon'; // Yıldızlar için kullanılan ikon bileşeni
import styles from './Reviews.module.css'; // Yorum listesi stilleri

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviewsList}> {/* Tüm yorumları alt alta dizen kapsayıcı */}
      {reviews.map((rev, index) => (
        <div key={index} className={styles.reviewItem}> {/* Tekil yorum kartı */}
          <div className={styles.reviewerInfo}>
            {/* Kullanıcının adının ilk harfinden oluşan avatar */}
            <div className={`${styles.avatar} H2`}>
              {rev.reviewer_name.charAt(0).toUpperCase()}
            </div>
            
            <div className={styles.nameGroup}>
              {/* Kullanıcı ismi için H3 font standartı kullanıldı */}
              <span className={`${styles.reviewerName} H3`}>{rev.reviewer_name}</span>
              
              {/* Yıldızlı Puanlama Alanı */}
              <div className={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <Icon 
                    key={i} 
                    id="rating-pressed" 
                    width="16" 
                    height="16" 
                    // Kullanıcı puanına göre yıldızı sarı veya gri boyar
                    color={i < rev.reviewer_rating ? "var(--color-rating)" : "var(--color-gray-light)"} 
                  />
                ))}
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