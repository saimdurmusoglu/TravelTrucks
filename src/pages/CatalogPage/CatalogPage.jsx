import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCampers, resetItems, incrementPage } from "../../redux/campersSlice";
import { toggleFavorite } from "../../redux/favoritesSlice";
import Icon from "../../components/shared/Icon";
import Loader from "../../components/shared/Loader/Loader";
import styles from "./CatalogPage.module.css";

/**
 * CatalogPage component manages the camper listing, backend filtering, and pagination.
 * Key Requirements: 
 * - Backend-based filtering.
 * - Persistent pagination with "Load More".
 * - External link handling for item details.
 */
const CatalogPage = () => {
  const dispatch = useDispatch();
  
  const { items, isLoading, page, hasMore } = useSelector((state) => state.campers);
  const favorites = useSelector((state) => state.favorites.items || []);

  // Local state for filter parameters
  const [location, setLocation] = useState("");
  const [activeEquipment, setActiveEquipment] = useState([]);
  const [activeType, setActiveType] = useState("");

  // Map for camper equipment badges displayed on cards
  const featureMap = [
    { 
      key: "transmission", 
      icon: "diagram", 
      label: (val) => val === "automatic" ? "Automatic" : null 
    },
    { 
      key: "engine", 
      icon: "fuel-pump", 
      label: (val) => val ? val.charAt(0).toUpperCase() + val.slice(1) : null 
    },
    { key: "AC", icon: "wind", label: () => "AC" },
    { key: "kitchen", icon: "cup-hot", label: () => "Kitchen" },
    { key: "TV", icon: "tv", label: () => "TV" },
    { key: "bathroom", icon: "ph_shower", label: () => "Bathroom" },
  ];

  /**
   * Fetches data from the API with current page and filter parameters.
   * Memoized with useCallback to prevent unnecessary re-renders.
   */
  const fetchPageData = useCallback(() => {
    const params = {
      page,
      limit: 4,
      location: location || undefined,
      form: activeType || undefined,
    };

    // Append selected equipment to query parameters
    activeEquipment.forEach((feat) => {
      params[feat] = true;
    });

    dispatch(getCampers(params));
  }, [dispatch, page, location, activeType, activeEquipment]);

  // Triggers data fetching when page number changes
  useEffect(() => {
    fetchPageData();
  }, [page]); 

  // Toggle selection for equipment filters
  const toggleEquipment = (id) => {
    setActiveEquipment((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  /**
   * Handles the search action.
   * Clears existing items and resets page to 1 for a fresh backend search.
   */
  const handleSearch = () => {
    dispatch(resetItems()); 
    // If page is already 1, useEffect won't trigger; call manually
    if (page === 1) {
      fetchPageData();
    }
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  // Requirement: Opens details in a new browser tab
  const handleShowMore = (id) => {
    window.open(`/catalog/${id}`, "_blank");
  };

  return (
    <div className={styles.container}>
      {/* Sidebar: Filtering controls */}
      <aside className={styles.sidebar}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Location</label>
          <div className="input-wrapper">
            <Icon id="Map-small" width="20" height="20" className="input-icon-left" />
            <input
              type="text"
              placeholder="City, Country"
              className="input-main2 input-with-icon"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filtersSection}>
          <p className={styles.filterTitle}>Filters</p>
          
          {/* Equipment Filters */}
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

          {/* Vehicle Type Filters */}
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

      {/* Main Content: Camper List */}
      <main className={styles.mainContent}>
        {items.length === 0 && !isLoading ? (
          <div className={styles.noResults}>
            <p className="H2 text-center opacity-60">No campers found.</p>
          </div>
        ) : (
          <>
            {items.map((camper) => (
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
                          <h2 className="H2">€{Number(camper.price).toFixed(2)}</h2>
                          <button 
                            className={styles.favoriteBtn} 
                            onClick={() => dispatch(toggleFavorite(camper.id))}
                          >
                            <Icon
                              id={favorites?.includes(camper.id) ? "heart-pressed" : "heart"}
                              width="24" height="24" className={styles.heartIcon}
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
                        <Icon id="Map-small" width="16" height="16" />
                        {camper.location}
                      </span>
                    </div>
                  </div>

                  <p className={`Body ${styles.description}`}>{camper.description}</p>

                  <div className={styles.badgeList}>
                    {featureMap
                      .filter(f => {
                        const value = camper[f.key];
                        if (!value || value === "false") return false;
                        if (typeof f.label === 'function' && f.label(value) === null) return false;
                        return true;
                      })
                      .map(f => (
                        <div key={f.key} className="category-badge">
                          <Icon id={`${f.icon}-small`} width="20" height="20" />
                          <span>
                            {typeof f.label === 'function' ? f.label(camper[f.key]) : f.label}
                          </span>
                        </div>
                      ))}
                  </div>

                  <button 
                    className="btn-primary mt-auto" 
                    onClick={() => handleShowMore(camper.id)}
                  >
                    Show more
                  </button>
                </div>
              </div>
            ))}
            
            {isLoading && <Loader />}

            {/* Pagination mechanism: Displayed if more items exist and not currently loading */}
            {hasMore && !isLoading && items.length > 0 && (
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