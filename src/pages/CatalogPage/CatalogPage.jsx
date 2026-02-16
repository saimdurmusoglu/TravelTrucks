import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Aynı sayfada açılması için eklendi
import { fetchCampers } from "../../services/api";
import { toggleFavorite } from "../../redux/favoritesSlice";
import Icon from "../../components/shared/Icon";
import Loader from "../../components/shared/Loader/Loader";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Yönlendirme için tanımlandı
  
  const favorites = useSelector((state) => state.favorites.items || []);

  const [allCampers, setAllCampers] = useState([]);
  const [filteredCampers, setFilteredCampers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState("");
  const [activeEquipment, setActiveEquipment] = useState([]);
  const [activeType, setActiveType] = useState("");

  const featureMap = [
    {
      key: "transmission",
      icon: "diagram",
      label: (val) => (val === "automatic" ? "Automatic" : null),
    },
    {
      key: "engine",
      icon: "fuel-pump",
      label: (val) => (val ? val.charAt(0).toUpperCase() + val.slice(1) : null),
    },
    { key: "AC", icon: "wind", label: () => "AC" },
    { key: "kitchen", icon: "cup-hot", label: () => "Kitchen" },
    { key: "TV", icon: "tv", label: () => "TV" },
    { key: "radio", icon: "ui-radios", label: () => "Radio" },
    { key: "bathroom", icon: "ph_shower", label: () => "Bathroom" },
  ];

  const toggleEquipment = (id) => {
    setActiveEquipment((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const getCampers = async () => {
      setLoading(true);
      try {
        const { data } = await fetchCampers();
        const items = data.items || [];
        setAllCampers(items);
        setFilteredCampers(items);
      } catch (error) {
        console.error("Error fetching campers:", error);
      } finally {
        setLoading(false);
      }
    };
    getCampers();
  }, []);

  const handleSearch = () => {
    let results = [...allCampers];
    if (location) {
      results = results.filter((camper) =>
        camper.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (activeType) {
      results = results.filter((camper) => camper.form === activeType);
    }
    if (activeEquipment.length > 0) {
      results = results.filter((camper) => {
        return activeEquipment.every((equipment) => {
          if (equipment === "transmission")
            return camper.transmission === "automatic";
          return camper[equipment] === true;
        });
      });
    }
    setFilteredCampers(results);
    setVisibleCount(4);
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 4);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Location</label>
          <div className="input-wrapper">
            {/* Hiza için Map ikonu -small yapıldı */}
            <Icon id="Map-small" width="20" height="20" className="input-icon-left" />
            <input
              type="text"
              placeholder="Kyiv, Ukraine"
              className="input-main2 input-with-icon"
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
                { id: "AC", icon: "wind", label: "AC" },
                { id: "transmission", icon: "diagram", label: "Automatic" },
                { id: "kitchen", icon: "cup-hot", label: "Kitchen" },
                { id: "TV", icon: "tv", label: "TV" },
                { id: "bathroom", icon: "ph_shower", label: "Bathroom" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleEquipment(item.id)}
                  className={`${styles.filterItem} ${
                    activeEquipment.includes(item.id) ? styles.filterItemActive : ""
                  }`}
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
                { id: "panelTruck", icon: "bi_grid-1x2", label: "Van" },
                { id: "fullyIntegrated", icon: "bi_grid", label: "Fully Integrated" },
                { id: "alcove", icon: "bi_grid-3x3-gap", label: "Alcove" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveType(activeType === item.id ? "" : item.id)}
                  className={`${styles.filterItem} ${
                    activeType === item.id ? styles.filterItemActive : ""
                  }`}
                >
                  <Icon id={item.icon} width="32" height="32" />
                  <span className="Button">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={handleSearch} className="btn-primary">Search</button>
      </aside>

      <main className={styles.mainContent}>
        {loading ? (
          <Loader />
        ) : filteredCampers.length === 0 ? (
          <div className={styles.noResults}>
            <p className="H2 text-center opacity-60">No campers found.</p>
          </div>
        ) : (
          <>
            {filteredCampers.slice(0, visibleCount).map((camper) => (
              <div key={camper.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img
                    src={camper.gallery?.[0]?.thumb}
                    alt={camper.name}
                    className={styles.image}
                  />
                </div>

                <div className={styles.details}>
                  <div className={styles.topContent}>
                    <div className={styles.headerRow}>
                      <div className={styles.namePriceRow}>
                        <h2 className={`H2 ${styles.camperName}`}>{camper.name}</h2>
                        <div className={styles.priceWrapper}>
                          <h2 className="H2">€{camper.price?.toFixed(2)}</h2>
                          <button 
                            className={styles.favoriteBtn} 
                            onClick={() => dispatch(toggleFavorite(camper.id))}
                          >
                            <Icon
                              id={favorites?.includes(camper.id) ? "heart-pressed" : "heart"}
                              width="24"
                              height="24"
                              className={styles.heartIcon}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.infoRow}>
                      <span className={`${styles.infoItem} Body-underline`}>
                        <Icon id="rating-pressed" width="16" height="16" color="var(--color-rating)" />
                        {camper.rating} ({camper.reviews?.length || 0} Reviews)
                      </span>
                      <span className={styles.infoItem}>
                        {/* Kart içindeki Map ikonu -small yapıldı */}
                        <Icon id="Map-small" width="16" height="16" />
                        {camper.location}
                      </span>
                    </div>
                  </div>

                  <p className={`Body ${styles.description}`}>{camper.description}</p>

                  <div className={styles.badgeList}>
                    {(() => {
                      const priorityKeys = ["transmission", "engine", "kitchen", "AC"];
                      const allAvailable = featureMap
                        .map((f) => {
                          const val = camper[f.key];
                          if (!val || (typeof f.label === "function" && f.label(val) === null)) return null;
                          return {
                            ...f,
                            displayLabel: typeof f.label === "function" ? f.label(val) : f.label,
                          };
                        })
                        .filter(Boolean);

                      const priorityItems = priorityKeys
                        .map((key) => allAvailable.find((item) => item.key === key))
                        .filter(Boolean);

                      const otherItems = allAvailable.filter((item) => !priorityKeys.includes(item.key));

                      return [...priorityItems, ...otherItems].slice(0, 4).map((item) => (
                        <div key={item.key} className="category-badge">
                          <Icon id={`${item.icon}-small`} width="20" height="20" />
                          <span>{item.displayLabel}</span>
                        </div>
                      ));
                    })()}
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
                <button onClick={handleLoadMore} className="btn-secondary">Load more</button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;