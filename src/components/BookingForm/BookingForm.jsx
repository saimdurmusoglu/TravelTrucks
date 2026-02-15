// src/components/BookingForm/BookingForm.jsx
import Calendar from '../Calendar/Calendar';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  return (
    <div className={styles.formCard}>
      <div className={styles.titleGroup}>
        <h3 className="H3">Book your campervan now</h3>
        <p className="Body2" style={{color: 'var(--color-text)'}}>Stay connected! We are always ready to help you.</p>
      </div>
      
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Name*" className="input-main" required />
        <input type="email" placeholder="Email*" className="input-main" required />
        <Calendar />
        <textarea placeholder="Comment" className="input-main" rows="4"></textarea>
        
        <button type="submit" className="btn-primary" style={{alignSelf: 'center', marginTop: '12px'}}>
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;