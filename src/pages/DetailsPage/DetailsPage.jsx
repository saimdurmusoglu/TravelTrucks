import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCamperDetails } from "../../services/api";
import Icon from "../../components/shared/Icon";
import Features from "../../components/Features/Features";
import Reviews from "../../components/Reviews/Reviews";
import BookingForm from "../../components/BookingForm/BookingForm";
import Loader from "../../components/shared/Loader/Loader"; 
import styles from "./DetailsPage.module.css";

/**
 * DetailsPage component for displaying comprehensive information about a specific camper.
 * Handles data fetching, gallery layout adjustment, and tab-based navigation (Features/Reviews).
 */
const DetailsPage = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      try {
        const { data } = await fetchCamperDetails(id);
        
        // Gallery optimization: Ensure consistent layout by repeating the first image if needed
        if (data.gallery && data.gallery.length === 3) {
          data.gallery.push(data.gallery[0]);
        }
        
        setCamper(data);
      } catch (error) {
        console.error("Error fetching camper details:", error);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [id]);

  // Loading state with centered loader component
  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  // Fallback for null data states
  if (!camper) return null;

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h2 className="H2">{camper.name}</h2>

        {/* Essential info: Star rating and location */}
        <div className={styles.infoRow}>
          <span className={`${styles.ratingLink} Body-underline`}>
            <Icon
              id="rating-pressed"
              width="16"
              height="16"
              color="var(--color-rating)"
            />
            {camper.rating} ({camper.reviews?.length} Reviews)
          </span>
          <span className={styles.locationInfo}>
            <Icon id="Map-small" width="16" height="16" />
            {camper.location}
          </span>
        </div>

        {/* Pricing formatted according to technical requirements */}
        <p className={`H2 ${styles.price}`}>
          €{camper.price?.toFixed(2)}
        </p>
      </div>

      {/* Responsive Image Gallery */}
      <div className={styles.gallery}>
        {camper.gallery?.map((img, i) => (
          <div key={i} className={styles.imageWrapper}>
            <img
              src={img.original}
              className={styles.galleryImage}
              alt={`${camper.name} view ${i + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Main vehicle description */}
      <p className={`Body ${styles.description}`}>{camper.description}</p>

      {/* Tabbed Navigation: Switches between Features and Reviews */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabItem} ${activeTab === "features" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("features")}
        >
          <span className="H3">Features</span>
        </button>
        <button
          className={`${styles.tabItem} ${activeTab === "reviews" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          <span className="H3">Reviews</span>
        </button>
      </div>

      {/* Content Area: Features/Reviews content alongside the Booking Form */}
      <div className={styles.contentBottom}>
        <div className={styles.tabContent}>
          {activeTab === "features" ? (
            <Features camper={camper} />
          ) : (
            <Reviews reviews={camper.reviews} />
          )}
        </div>
        <aside className={styles.formSection}>
          <BookingForm />
        </aside>
      </div>
    </div>
  );
};

export default DetailsPage;