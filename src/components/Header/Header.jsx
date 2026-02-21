import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import sprite from '../../assets/icons-sprite.svg';
import styles from './Header.module.css';

/**
 * Header component featuring a responsive navigation menu.
 * Includes a mobile hamburger menu and active link styling for SPA routing.
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        {/* LOGO: Primary brand link back to home */}
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logoLink} onClick={closeMenu}>
            <svg className={styles.logoSvg}>
              <use xlinkHref={`${sprite}#logo`} />
            </svg>
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE: Controlled by local state */}
        <button 
          className={styles.menuBtn} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className={styles.menuIcon}>
            <use xlinkHref={`${sprite}#${isMenuOpen ? 'close' : 'menu'}`} />
          </svg>
        </button>

        {/* NAVIGATION: Responsive list with active route highlighting */}
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

        {/* SPACER: Balancing the layout for desktop view */}
        <div className={styles.spacer}></div>
      </div>
    </header>
  );
};

export default Header;