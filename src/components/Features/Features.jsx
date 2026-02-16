// src/components/Features/Features.jsx
import Icon from '../shared/Icon'; 
import styles from './Features.module.css'; 

const Features = ({ camper }) => {
  return (
    <div className={styles.featuresWrapper}>
      
      {/* ÜST BÖLÜM: İkonlu Rozet Listesi - İkon ID'leri -small olarak güncellendi */}
      <div className={styles.badgeList}>
        <div className="category-badge">
          <Icon id="diagram-small" width="20" height="20" /> 
          <span className="capitalize">{camper.transmission}</span>
        </div>
        
        {/* AC özelliği varsa göster */}
        {camper.AC && (
          <div className="category-badge">
            <Icon id="wind-small" width="20" height="20" /> AC
          </div>
        )}

        <div className="category-badge">
          <Icon id="fuel-pump-small" width="20" height="20" /> 
          <span className="capitalize">{camper.engine}</span>
        </div>

        {camper.kitchen && (
          <div className="category-badge">
            <Icon id="cup-hot-small" width="20" height="20" /> Kitchen
          </div>
        )}

        {camper.radio && (
          <div className="category-badge">
            <Icon id="ui-radios-small" width="20" height="20" /> Radio
          </div>
        )}

        {camper.bathroom && (
          <div className="category-badge">
            <Icon id="ph_shower-small" width="20" height="20" /> Bathroom
          </div>
        )}

        {camper.TV && (
          <div className="category-badge">
            <Icon id="tv-small" width="20" height="20" /> TV
          </div>
        )}
      </div>

      {/* ALT BÖLÜM: Teknik Detay Tablosu */}
      <div className={styles.vehicleDetails}>
        <h3 className={styles.tableTitle}>Vehicle details</h3>
        
        <div className={styles.detailTable}>
          <div className={`${styles.tableRow} Body2`}>
            <span>Form</span>
            <span className="capitalize">
              {/* "panelTruck" gibi gelen veriyi "Panel truck" yapalım */}
              {camper.form?.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </span>
          </div>
          <div className={`${styles.tableRow} Body2`}>
            <span>Length</span>
            <span>{camper.length}</span>
          </div>
          <div className={`${styles.tableRow} Body2`}>
            <span>Width</span>
            <span>{camper.width}</span>
          </div>
          <div className={`${styles.tableRow} Body2`}>
            <span>Height</span>
            <span>{camper.height}</span>
          </div>
          <div className={`${styles.tableRow} Body2`}>
            <span>Tank</span>
            <span>{camper.tank}</span>
          </div>
          <div className={`${styles.tableRow} Body2`}>
            <span>Consumption</span>
            <span>{camper.consumption}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;