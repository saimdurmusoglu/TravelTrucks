import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Calendar.module.css";
import Icon from "../shared/Icon"; 

const Calendar = () => {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className={styles.wrapper}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Booking date"
        className="input-main" // Global CSS'den geliyor
        dateFormat="dd/MM/yyyy"
        calendarClassName={styles.customCalendar}
        nextMonthButtonLabel=">"
        previousMonthButtonLabel="<"
      />
      <div className={styles.iconWrapper}>
        <Icon id="calendar" width="20" height="20" />
      </div>
    </div>
  );
};

export default Calendar;