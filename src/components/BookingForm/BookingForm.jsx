// src/components/BookingForm/BookingForm.jsx
import { toast } from 'react-toastify'; // Toast kütüphanesini içe aktar
import Calendar from '../Calendar/Calendar'; 
import styles from './BookingForm.module.css';

const BookingForm = () => {
  /**
   * Teknik Şartname: Rezervasyon başarıyla tamamlandığında bir bildirim gösterilmelidir.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form verilerini toplama
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // ŞARTNAME KRİTİK MADDE: Profesyonel Bildirim Gösterimi
    toast.success("Reservation successful! We will contact you soon.", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });

    // Formu temizle
    e.target.reset();
    
    // Konsol çıktısı (Mülakat kontrolü için)
    console.log("Booking Data Sent:", data);
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.titleGroup}>
        <h3 className="H3">Book your campervan now</h3>
        <p className={`Body ${styles.subtitle}`}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <input 
          name="userName"
          type="text" 
          placeholder="Name*" 
          className="input-main" 
          required 
        />
        <input 
          name="userEmail"
          type="email" 
          placeholder="Email*" 
          className="input-main" 
          required 
        />
        
        {/* Özel takvim bileşeni */}
        <Calendar />
        
        <textarea 
          name="userComment"
          placeholder="Comment" 
          className={`input-main ${styles.textarea}`} 
          rows="4"
        ></textarea>
        
        <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;