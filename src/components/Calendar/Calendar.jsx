import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Kütüphanenin temel stilleri
import styles from "./Calendar.module.css"; // Özel tema düzenlemelerimiz
import Icon from "../shared/Icon"; // Takvim ikonu için

const Calendar = () => {
  const [startDate, setStartDate] = useState(null); // Seçilen tarihi tutan state

  return (
    <div className={styles.wrapper}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Booking date*"
        required
        className="input-main" // Global CSS'deki input tasarımını kullanır
        dateFormat="dd.MM.yyyy"
        calendarClassName={styles.customCalendar} // Takvim paneline özel sınıf
        nextMonthButtonLabel=">"
        previousMonthButtonLabel="<"
      />
    </div>
  );
};

export default Calendar;