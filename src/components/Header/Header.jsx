import { NavLink, Link } from 'react-router-dom';
import sprite from '../../assets/icons-sprite.svg';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        {/* LOGO BÖLÜMÜ */}
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logoLink} aria-label="Home">
            <svg className={styles.logoSvg}>
              <use xlinkHref={`${sprite}#logo`} />
            </svg>
          </Link>
        </div>

        {/* NAVİGASYON */}
        <nav className={styles.nav}>
          <NavLink 
            to="/" 
            // end prop'u sadece tam olarak "/" yolundayken active class'ını tetikler
            end
            className={({ isActive }) => 
              `${styles.navLink} Body2 ${isActive ? styles.active : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/catalog" 
            // BURASI KRİTİK: 'end' ekleyerek /catalog/123 gibi detay sayfalarında 
            // bu linkin kırmızı (aktif) kalmasını engelliyoruz.
            end 
            className={({ isActive }) => 
              `${styles.navLink} Body2 ${isActive ? styles.active : ''}`
            }
          >
            Catalog
          </NavLink>
        </nav>

        {/* DENGELEYİCİ */}
        <div className={styles.spacer}></div>
      </div>
    </header>
  );
};

export default Header;