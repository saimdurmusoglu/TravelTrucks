// src/components/Reviews/Reviews.jsx
import Icon from "../shared/Icon"; 
import styles from "./Reviews.module.css"; 

/**
 * Reviews component renders a list of user feedback.
 * Features a dynamic 5-star rating system and generated user avatars.
 */
const Reviews = ({reviews}) => {
  return (
    <div className={styles.reviewsList}>
      {reviews.map((rev, index) => (
        <div key={index} className={styles.reviewItem}>
          {/* Header section: User avatar, name and star rating */}
          <div className={styles.reviewerInfo}>
            {/* Avatar generated using the first letter of the reviewer's name */}
            <div className={`${styles.avatar} H2`}>
              {rev.reviewer_name.charAt(0).toUpperCase()}
            </div>

            <div className={styles.nameGroup}>
              <span className={`${styles.reviewerName} Body2`}>
                {rev.reviewer_name}
              </span>

              {/* Dynamic Star Rating System */}
              <div className={styles.starsRow}>
                {[...Array(5)].map((_, i) => {
                  // Determine if the star should be active (pressed) or inactive based on the rating
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
          
          {/* Review text content styled with global typography */}
          <p className={`${styles.comment} Body`}>{rev.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;