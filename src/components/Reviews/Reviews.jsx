// src/components/Reviews/Reviews.jsx
import Icon from '../shared/Icon';
import styles from './Reviews.module.css';

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviewsList}>
      {reviews.map((rev, index) => (
        <div key={index} className={styles.reviewItem}>
          <div className={styles.reviewerInfo}>
            <div className={styles.avatar}>
              {rev.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.nameGroup}>
              <span className={styles.reviewerName}>{rev.reviewer_name}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <Icon 
                    key={i} 
                    id="rating-pressed" 
                    width="16" height="16" 
                    color={i < rev.reviewer_rating ? "var(--color-rating)" : "var(--color-gray-light)"} 
                  />
                ))}
              </div>
            </div>
          </div>
          <p className={styles.comment}>{rev.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews; // BU SATIRI EKLE