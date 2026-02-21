import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Default library styles
import styles from "./Calendar.module.css"; // Custom theme overrides
import Icon from "../shared/Icon";

/**
 * Calendar component utilizing react-datepicker.
 * Integrated with global input styles and custom calendar theme.
 */
const Calendar = () => {
  // State to manage the selected booking date
  const [startDate, setStartDate] = useState(null);

  return (
    <div className={styles.wrapper}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Booking date*"
        name="bookingDate"
        required
        className="input-main" // Applies project-wide input styling
        dateFormat="dd.MM.yyyy"
        calendarClassName={styles.customCalendar} // Custom CSS Module class for the popup
        nextMonthButtonLabel=">"
        previousMonthButtonLabel="<"
      />
    </div>
  );
};

export default Calendar;