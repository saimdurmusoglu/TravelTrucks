import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {fetchCamperDetails} from "../../services/api";
import Icon from "../../components/shared/Icon";
import Features from "../../components/Features/Features";
import Reviews from "../../components/Reviews/Reviews";
import BookingForm from "../../components/BookingForm/BookingForm";
import styles from "./DetailsPage.module.css";

const DetailsPage = () => {
  const {id} = useParams();
  const [camper, setCamper] = useState(null);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    const getDetails = async () => {
      try {
        const {data} = await fetchCamperDetails(id);
        // Eğer 3 resim varsa, tasarımı bozmamak için ilk resmi sona kopyala
        if (data.gallery && data.gallery.length === 3) {
          data.gallery.push(data.gallery[0]);
        }
        setCamper(data);
      } catch (error) {
        console.error("Error fetching camper details:", error);
      }
    };
    getDetails();
  }, [id]);

  if (!camper)
    return (
      <div className={styles.container}>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div className={styles.container}>
      <h2 className="H1">{camper.name}</h2>

      <div className={styles.infoRow}>
        <span className="Body-underline flex items-center gap-1">
          <Icon
            id="rating-pressed"
            width="16"
            height="16"
            color="var(--color-rating)"
          />
          {camper.rating} ({camper.reviews?.length} Reviews)
        </span>
        <span className="flex items-center gap-1">
          <Icon id="Map" width="16" height="16" /> {camper.location}
        </span>
      </div>

      <p className="H1" style={{margin: "16px 0 28px"}}>
        €{camper.price?.toFixed(2)}
      </p>

      <div className={styles.gallery}>
        {camper.gallery?.map((img, i) => (
          <img
            key={i}
            src={img.original}
            className={styles.galleryImage}
            alt={camper.name}
          />
        ))}
      </div>

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabItem} ${activeTab === "features" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={`${styles.tabItem} ${activeTab === "reviews" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={styles.contentBottom}>
        <div className={styles.tabContent}>
          {activeTab === "features" ? (
            <Features camper={camper} />
          ) : (
            <Reviews reviews={camper.reviews} />
          )}
        </div>
        <BookingForm />
      </div>
    </div>
  );
};

export default DetailsPage;
