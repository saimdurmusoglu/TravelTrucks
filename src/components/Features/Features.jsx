import Icon from '../shared/Icon'; 
import styles from './Features.module.css'; 

/**
 * Features component displays camper specific equipment and technical dimensions.
 * Requirement: Only features available in the API response should be rendered.
 */
const Features = ({ camper }) => {
  // Mapping of potential camper features based on technical specifications
  const featureMap = [
    { 
      key: "transmission", 
      icon: "diagram", 
      label: (val) => val === "automatic" ? "Automatic" : val 
    },
    { 
      key: "engine", 
      icon: "fuel-pump", 
      label: (val) => val ? val.charAt(0).toUpperCase() + val.slice(1) : val 
    },
    { key: "AC", icon: "wind", label: () => "AC" },
    { key: "kitchen", icon: "cup-hot", label: () => "Kitchen" },
    { key: "TV", icon: "tv", label: () => "TV" },
    { key: "radio", icon: "ui-radios", label: () => "Radio" },
    { key: "bathroom", icon: "ph_shower", label: () => "Bathroom" },
    { key: "refrigerator", icon: "solar_fridge-linear", label: () => "Refrigerator" },
    { key: "microwave", icon: "lucide_microwave", label: () => "Microwave" },
    { key: "gas", icon: "hugeicons_gas-stove", label: () => "Gas" },
    { key: "water", icon: "ion_water-outline", label: () => "Water" },
  ];

  return (
    <div className={styles.featuresWrapper}>
      {/* Part 1: Vehicle Equipment Badges */}
      <div className={styles.badgeList}>
        {featureMap.map((feature) => {
          const value = camper[feature.key];
          
          // Technical Spec: Render only if the feature exists and is not "false"
          if (!value || value === "false") return null;

          const displayLabel = typeof feature.label === "function" 
            ? feature.label(value) 
            : feature.label;

          return (
            <div key={feature.key} className={`category-badge ${styles.featureBadge}`}>
              <Icon id={`${feature.icon}-small`} width="20" height="20" />
              <span className="capitalize">{displayLabel}</span>
            </div>
          );
        })}
      </div>

      {/* Part 2: Technical Specifications Table */}
      <div className={styles.vehicleDetails}>
        <h3 className={styles.tableTitle}>Vehicle details</h3>
        <div className={styles.detailTable}>
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