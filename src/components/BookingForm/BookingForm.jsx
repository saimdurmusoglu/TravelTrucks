// src/components/BookingForm/BookingForm.jsx
import Calendar from '../Calendar/Calendar'; // Özel takvim bileşeni
import styles from './BookingForm.module.css'; // Form yerleşim stilleri

const BookingForm = () => {
  // Form gönderildiğinde sayfanın yenilenmesini engeller
  const handleSubmit = (e) => {
    e.preventDefault();
    // Buraya form verilerini API'ye gönderme mantığı eklenebilir
    console.log("Form submitted!");
  };

  return (
    <div className={styles.formCard}> {/* Formun dış çerçevesi */}
      <div className={styles.titleGroup}>
        {/* Global H3 sınıfı ile başlık */}
        <h3 className="H3">Book your campervan now</h3>
        {/* Global Body sınıfı ile alt metin */}
        <p className={`Body ${styles.subtitle}`}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Global 'input-main' sınıfı ile tasarım sistemine uygun giriş alanları */}
        <input type="text" placeholder="Name*" className="input-main" required />
        <input type="email" placeholder="Email*" className="input-main" required />
        
        {/* Takvim seçim alanı */}
        <Calendar />
        
        {/* Yorum alanı için textarea, input-main ile aynı tasarımı paylaşır */}
        <textarea 
          placeholder="Comment" 
          className={styles.textarea} 
          rows="4"
        ></textarea>
        
        {/* Global 'btn-primary' sınıfı ile gönder butonu */}
        <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;