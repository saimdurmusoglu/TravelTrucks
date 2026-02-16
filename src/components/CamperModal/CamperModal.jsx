// src/components/CamperModal/CamperModal.jsx
import { useState } from 'react';
import Icon from '../shared/Icon'; // İkon bileşeni
import Features from '../Features/Features'; // Özellikler sekmesi
import Reviews from '../Reviews/Reviews'; // Yorumlar sekmesi
import BookingForm from '../BookingForm/BookingForm'; // Rezervasyon formu
import styles from './CamperModal.module.css'; // Modal stilleri

const CamperModal = ({ camper, onClose }) => {
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div className={styles.overlay} onClick={onClose}> {/* Arka plan karartması */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}> {/* Modal penceresi */}
        
        {/* Kapatma Butonu */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <Icon id="close" width="32" height="32" />
        </button>

        {/* Araç Başlığı - Global H2 sınıfı ile */}
        <h2 className="H2">{camper.name}</h2>
        
        {/* Bilgi Satırı (Rating & Location) */}
        <div className={styles.infoRow}>
          <span className="Body-underline">
            <Icon id="rating-pressed" width="16" height="16" color="var(--color-rating)" />
            {camper.rating} ({camper.reviews.length} Reviews)
          </span>
          <span className="Body">
            <Icon id="Map" width="16" height="16" /> {camper.location}
          </span>
        </div>

        {/* Fiyat Bilgisi - H2 sınıfı kullanıldı, boşluklar CSS modülünde ayarlandı */}
        <p className={`H2 ${styles.price}`}>€{camper.price.toFixed(2)}</p>

        {/* Galeri Alanı */}
        <div className={styles.gallery}>
          {camper.gallery.map((img, i) => (
            <img key={i} src={img.original} className={styles.galleryImg} alt={camper.name} />
          ))}
        </div>

        {/* Araç Açıklaması - Body sınıfı ile */}
        <p className={`Body ${styles.description}`}>{camper.description}</p>

        {/* Sekme Menüsü (Tabs) */}
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabItem} ${activeTab === 'features' ? styles.active : ''}`}
            onClick={() => setActiveTab('features')}
          >
            <span className="H3">Features</span>
          </button>
          <button 
            className={`${styles.tabItem} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <span className="H3">Reviews</span>
          </button>
        </div>

        {/* Alt Bölüm: Sol tarafta sekme içeriği, sağ tarafta rezervasyon formu */}
        <div className={styles.bottomSection}>
          <div className={styles.tabContent}>
            {activeTab === 'features' ? <Features camper={camper} /> : <Reviews reviews={camper.reviews} />}
          </div>
          <div className={styles.formSection}>
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperModal;