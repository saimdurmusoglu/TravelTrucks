import sprite from '../../assets/icons-sprite.svg'; // Tüm ikonların toplandığı SVG dosyası
import styles from './Icon.module.css'; // İkon temel stilleri

const Icon = ({ id, className = "", width, height, color }) => {
  // Eğer width veya height dışarıdan (prop olarak) gelmediyse varsayılan boyutu kullanır
  const isDefaultSize = !width && !height;

  return (
    <svg 
      // styles.icon: Temel ayarlar, styles.defaultSize: 20x20 kuralı, className: Dışarıdan gelen ekstra sınıflar
      className={`${styles.icon} ${isDefaultSize ? styles.defaultSize : ''} ${className}`}
      style={{ 
        width: width ? `${width}px` : undefined, 
        height: height ? `${height}px` : undefined,
        color: color ? color : undefined // İkonun rengini dinamik olarak değiştirebilmek için (örn: sarı yıldız)
      }}
    >
      {/* Sprite içindeki ilgili ikonun ID'sini çağırır */}
      <use href={`${sprite}#${id}`} />
    </svg>
  );
};

export default Icon;