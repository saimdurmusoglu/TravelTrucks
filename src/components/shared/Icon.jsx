import sprite from '../../assets/icons-sprite.svg';
import styles from './Icon.module.css';

const Icon = ({ id, className = "", width, height }) => {
  // Eğer dışarıdan özel bir genişlik/yükseklik verilmediyse defaultSize'ı ekle
  const isDefault = !className.includes('w-') && !className.includes('h-') && !width;

  return (
    <svg 
      className={`${styles.icon} ${isDefault ? styles.defaultSize : ''} ${className}`}
      style={{ 
        width: width ? `${width}px` : undefined, 
        height: height ? `${height}px` : undefined 
      }}
    >
      <use href={`${sprite}#${id}`} />
    </svg>
  );
};

export default Icon;