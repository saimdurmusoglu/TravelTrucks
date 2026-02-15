import { Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import styles from './App.module.css'; // Modüler CSS eklendi

function App() {
  return (
    <div className={styles.appWrapper}>
      <Header />
      
      <main className={styles.mainContent}> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />} />
          {/* Hatalı route durumunda ana sayfaya yönlendirme */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;