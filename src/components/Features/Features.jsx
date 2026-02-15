// src/components/Features/Features.jsx
import Icon from '../shared/Icon';
import styles from './Features.module.css';

const Features = ({ camper }) => {
  return (
    <div className={styles.featuresWrapper}>
      <div className={styles.badgeList}>
        {/* API'den gelen özelliklere göre dinamik rozetler */}
        <div className="category-badge"><Icon id="diagram" width="20" height="20" /> {camper.transmission}</div>
        <div className="category-badge"><Icon id="wind" width="20" height="20" /> AC</div>
        <div className="category-badge"><Icon id="fuel-pump" width="20" height="20" /> {camper.engine}</div>
        <div className="category-badge"><Icon id="cup-hot" width="20" height="20" /> Kitchen</div>
        {camper.radio && <div className="category-badge"><Icon id="radio" width="20" height="20" /> Radio</div>}
      </div>

      <div className={styles.vehicleDetails}>
        <h3 className={styles.tableTitle}>Vehicle details</h3>
        <div className={styles.detailTable}>
          <div className={styles.tableRow}><span>Form</span><span>{camper.form}</span></div>
          <div className={styles.tableRow}><span>Length</span><span>{camper.length}</span></div>
          <div className={styles.tableRow}><span>Width</span><span>{camper.width}</span></div>
          <div className={styles.tableRow}><span>Height</span><span>{camper.height}</span></div>
          <div className={styles.tableRow}><span>Tank</span><span>{camper.tank}</span></div>
          <div className={styles.tableRow}><span>Consumption</span><span>{camper.consumption}</span></div>
        </div>
      </div>
    </div>
  );
};

export default Features;