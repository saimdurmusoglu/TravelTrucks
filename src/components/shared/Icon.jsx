import sprite from '../../assets/icons-sprite.svg'; 
import styles from './Icon.module.css';

/**
 * Shared Icon component for rendering SVG sprites.
 * Supports dynamic sizing, custom coloring, and fallback to default 20x20 dimensions.
 */
const Icon = ({ id, className = "", width, height, color }) => {
  // Check if specific dimensions are provided via props
  const isDefaultSize = !width && !height;

  return (
    <svg 
      // Combines base icon styles, default size logic, and any external classes
      className={`${styles.icon} ${isDefaultSize ? styles.defaultSize : ''} ${className}`}
      style={{ 
        width: width ? `${width}px` : undefined, 
        height: height ? `${height}px` : undefined,
        color: color ? color : undefined // Allows dynamic color overrides (e.g., star ratings)
      }}
    >
      {/* Reference the specific icon ID within the SVG sprite map */}
      <use href={`${sprite}#${id}`} />
    </svg>
  );
};

export default Icon;