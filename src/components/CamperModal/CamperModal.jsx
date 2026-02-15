// src/components/CamperModal/CamperModal.jsx
import { useState } from 'react';
import Icon from '../shared/Icon';
import Features from '../Features/Features';
import Reviews from '../Reviews/Reviews';
import BookingForm from '../BookingForm/BookingForm';
import styles from './CamperModal.module.css';

const CamperModal = ({ camper, onClose }) => {
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <Icon id="close" width="32" height="32" />
        </button>

        <h2 className="H2">{camper.name}</h2>
        
        <div className={styles.infoRow}>
          <span className="Body-underline">
            <Icon id="rating-pressed" width="16" height="16" color="var(--color-rating)" />
            {camper.rating} ({camper.reviews.length} Reviews)
          </span>
          <span><Icon id="Map" width="16" height="16" /> {camper.location}</span>
        </div>

        <p className="H2" style={{margin: '16px 0 24px'}}>€{camper.price.toFixed(2)}</p>

        <div className={styles.gallery}>
          {camper.gallery.map((img, i) => (
            <img key={i} src={img.original} className={styles.galleryImg} alt="camper" />
          ))}
        </div>

        <p className={styles.description}>{camper.description}</p>

        {/* Tabs Menu */}
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabItem} ${activeTab === 'features' ? styles.active : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button 
            className={`${styles.tabItem} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.tabContent}>
            {activeTab === 'features' ? <Features camper={camper} /> : <Reviews reviews={camper.reviews} />}
          </div>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default CamperModal;