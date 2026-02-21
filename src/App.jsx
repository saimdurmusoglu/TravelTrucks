import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Required for toast notifications
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import styles from './App.module.css';

/**
 * Main App component that handles routing and global layouts.
 * Includes the persistent Header and a Toast notification container.
 */
function App() {
  return (
    <div className={styles.appWrapper}>
      <Header />
      
      {/* Primary content area for application views */}
      <main className={styles.mainContent}> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />} />
          
          {/* Fallback route: Redirects any unknown paths to the home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Global configuration for react-toastify notifications */}
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