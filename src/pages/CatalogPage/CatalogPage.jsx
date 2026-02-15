import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCampers } from '../../services/api';
import Icon from '../../components/shared/Icon';
import Loader from '../../components/shared/Loader/Loader'; // Loader bileşeni eklendi
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const navigate = useNavigate();
  const [allCampers, setAllCampers] = useState([]);
  const [filteredCampers, setFilteredCampers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false); // Asenkron istek takibi
  
  const [location, setLocation] = useState('');
  const [activeEquipment, setActiveEquipment] = useState([]);
  const [activeType, setActiveType] = useState('');

  const toggleEquipment = (id) => {
    setActiveEquipment(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const getCampers = async () => {
      setLoading(true); // Yüklenme başlasın
      try {
        const { data } = await fetchCampers();
        const items = data.items || [];
        setAllCampers(items);
        setFilteredCampers(items);
      } catch (error) {
        console.error("Error fetching campers:", error);
      } finally {
        setLoading(false); // Yüklenme bitti
      }
    };
    getCampers();
  }, []);

  const handleSearch = () => {
    let results = [...allCampers];
    if (location) {
      results = results.filter(camper => 
        camper.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (activeType) {
      results = results.filter(camper => camper.form === activeType);
    }
    if (activeEquipment.length > 0) {
      results = results.filter(camper => {
        return activeEquipment.every(equipment => {
          if (equipment === 'transmission') return camper.transmission === 'automatic';
          return camper[equipment] === true;
        });
      });
    }
    setFilteredCampers(results);
    setVisibleCount(4);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        {/* Sidebar içeriği (Location, Filters, Search butonu) aynı kalıyor */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Location</label>
          <div className="input-wrapper">
            <Icon id="Map" width="20" height="20" className="input-icon-left" />
            <input 
              type="text" 
              placeholder="Kyiv, Ukraine" 
              className="input-main input-with-icon"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filtersSection}>
          <p className={styles.filterTitle}>Filters</p>
          <div>
            <h3 className={styles.sectionSubtitle}>Vehicle equipment</h3>
            <div className={styles.filterGrid}>
              {[
                { id: 'AC', icon: 'wind', label: 'AC' },
                { id: 'transmission', icon: 'diagram', label: 'Automatic' },
                { id: 'kitchen', icon: 'cup-hot', label: 'Kitchen' },
                { id: 'TV', icon: 'tv', label: 'TV' },
                { id: 'bathroom', icon: 'ph_shower', label: 'Bathroom' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleEquipment(item.id)}
                  className={`${styles.filterItem} ${activeEquipment.includes(item.id) ? styles.filterItemActive : ''}`}
                >
                  <Icon id={item.icon} width="32" height="32" />
                  <span className="Body2">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className={styles.sectionSubtitle}>Vehicle type</h3>
            <div className={styles.filterGrid}>
              {[
                { id: 'panelTruck', icon: 'bi_grid', label: 'Van' },
                { id: 'fullyIntegrated', icon: 'bi_grid-1x2', label: 'Fully Integrated' },
                { id: 'alcove', icon: 'bi_grid-3x3-gap', label: 'Alcove' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveType(activeType === item.id ? '' : item.id)}
                  className={`${styles.filterItem} ${activeType === item.id ? styles.filterItemActive : ''}`}
                >
                  <Icon id={item.icon} width="32" height="32" />
                  <span className="Body2">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={handleSearch} className="btn-primary">Search</button>
      </aside>

      <main className={styles.mainContent}>
        {/* LOADING GÖSTERGESİ BURADA DEVREYE GİRİYOR */}
        {loading ? (
          <Loader /> 
        ) : filteredCampers.length === 0 ? (
          <div className={styles.noResults}>
            <p className="text-center opacity-60">No campers found matching your filters.</p>
          </div>
        ) : (
          <>
            {filteredCampers.slice(0, visibleCount).map((camper) => (
              <div key={camper.id} className={styles.card}>
                {/* Kart içeriği aynı kalıyor */}
                <div className={styles.imageWrapper}>
                  <img src={camper.gallery?.[0]?.thumb} alt={camper.name} className={styles.image} />
                </div>
                
                <div className={styles.details}>
                  <div className={styles.headerRow}>
                    <h2 className={styles.camperName}>{camper.name}</h2>
                    <div className={styles.priceWrapper}>
                      <h2 className={styles.price}>€{camper.price?.toFixed(2)}</h2>
                      <Icon id="heart" width="24" height="24" className={styles.heartIcon} />
                    </div>
                  </div>
                  
                  <div className={styles.infoRow}>
                    <span className={`${styles.infoItem} Body-underline`}>
                      <Icon id="rating-pressed" width="16" height="16" color="var(--color-rating)" />
                      {camper.rating} ({camper.reviews?.length || 0} Reviews)
                    </span>
                    <span className={styles.infoItem}>
                      <Icon id="Map" width="16" height="16" />
                      {camper.location}
                    </span>
                  </div>

                  <p className={styles.description}>{camper.description}</p>

                  <div className={styles.badgeList}>
                    {camper.transmission === 'automatic' && (
                      <div className="category-badge"><Icon id="diagram" width="20" height="20" /> Automatic</div>
                    )}
                    {camper.engine === 'petrol' && (
                      <div className="category-badge"><Icon id="fuel-pump" width="20" height="20" /> Petrol</div>
                    )}
                    {camper.kitchen && (
                      <div className="category-badge"><Icon id="cup-hot" width="20" height="20" /> Kitchen</div>
                    )}
                    {camper.AC && (
                      <div className="category-badge"><Icon id="wind" width="20" height="20" /> AC</div>
                    )}
                  </div>

                  <button 
                    className="btn-primary mt-auto" 
                    onClick={() => navigate(`/catalog/${camper.id}`)}
                  >
                    Show more
                  </button>
                </div>
              </div>
            ))}

            {filteredCampers.length > visibleCount && (
              <div className={styles.loadMoreWrapper}>
                 <button onClick={handleLoadMore} className="btn-secondary">
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;