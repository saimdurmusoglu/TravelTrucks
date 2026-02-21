import Icon from '../shared/Icon'; 
import styles from './Features.module.css'; 

const Features = ({ camper }) => {
  // Gösterilmek istenen özelliklerin haritası
  const featureMap = [
    { key: "transmission", icon: "diagram", label: (val) => val },
    { key: "engine", icon: "fuel-pump", label: (val) => val },
    { key: "AC", icon: "wind", label: () => "AC" },
    { key: "kitchen", icon: "cup-hot", label: () => "Kitchen" },
    { key: "TV", icon: "tv", label: () => "TV" },
    { key: "radio", icon: "ui-radios", label: () => "Radio" },
    { key: "bathroom", icon: "ph_shower", label: () => "Bathroom" },
  ];

  return (
    <div className={styles.featuresWrapper}>
      <div className={styles.badgeList}>
        {featureMap.map((feature) => {
          const value = camper[feature.key];
          
          // Değer yoksa veya false ise (Boolean özellikler için) gösterme
          if (!value) return null;

          const displayLabel = typeof feature.label === "function" 
            ? feature.label(value) 
            : feature.label;

          return (
            <div key={feature.key}className={`category-badge ${styles.featureBadge}`}>
              <Icon id={`${feature.icon}-small`} width="20" height="20" />
              <span className="capitalize">{displayLabel}</span>
            </div>
          );
        })}
      </div>

      <div className={styles.vehicleDetails}>
        <h3 className={styles.tableTitle}>Vehicle details</h3>
        <div className={styles.detailTable}>
          {/* Form, Length, Width vb. teknik tablo alanı aynı kalabilir */}
          {[
            { label: "Form", value: camper.form?.replace(/([A-Z])/g, ' $1') },
            { label: "Length", value: camper.length },
            { label: "Width", value: camper.width },
            { label: "Height", value: camper.height },
            { label: "Tank", value: camper.tank },
            { label: "Consumption", value: camper.consumption }
          ].map((row, idx) => (
            <div key={idx} className={`${styles.tableRow} Body2`}>
              <span>{row.label}</span>
              <span className="capitalize">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;