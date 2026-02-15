import { NavLink, Link } from 'react-router-dom';
import sprite from '../../assets/icons-sprite.svg';
import styles from './Header.module.css'; // CSS Module import edildi

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logoLink}>
            <svg className={styles.logoSvg}>
              <use xlinkHref={`${sprite}#logo`} />
            </svg>
          </Link>
        </div>

        {/* Navigation - Centered Layout */}
        <nav className={styles.nav}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/catalog" 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Catalog
          </NavLink>
        </nav>

        {/* Right spacing for balance (matches logo width) */}
        <div className={styles.spacer}></div>
      </div>
    </header>
  );
};

export default Header;