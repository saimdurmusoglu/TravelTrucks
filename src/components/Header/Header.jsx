import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import sprite from '../../assets/icons-sprite.svg';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        {/* LOGO */}
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logoLink} onClick={closeMenu}>
            <svg className={styles.logoSvg}>
              <use xlinkHref={`${sprite}#logo`} />
            </svg>
          </Link>
        </div>

        {/* MOBİL MENÜ BUTONU */}
        <button 
          className={styles.menuBtn} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className={styles.menuIcon}>
            <use xlinkHref={`${sprite}#${isMenuOpen ? 'close' : 'menu'}`} />
          </svg>
        </button>

        {/* NAVİGASYON */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => 
              `${styles.navLink} Body2 ${isActive ? styles.active : ''}`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink 
            to="/catalog" 
            end 
            className={({ isActive }) => 
              `${styles.navLink} Body2 ${isActive ? styles.active : ''}`
            }
            onClick={closeMenu}
          >
            Catalog
          </NavLink>
        </nav>

        {/* MASAÜSTÜ İÇİN DENGELEYİCİ */}
        <div className={styles.spacer}></div>
      </div>
    </header>
  );
};

export default Header;