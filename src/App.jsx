import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // ToastContainer eklendi
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appWrapper}>
      <Header />
      
      <main className={styles.mainContent}> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Toast bildirimlerinin ekranda çıkacağı yer */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;