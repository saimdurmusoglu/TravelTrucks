import styles from './Loader.module.css'; // Loader'a özel spinner ve yerleşim stilleri

const Loader = () => {
  return (
    <div className={styles.container}> {/* Sayfada ortalanmış ana kapsayıcı */}
      <div className={styles.spinner}></div> {/* Dönen görsel halka */}
      {/* Global 'Body2' sınıfını kullanarak tasarım sistemiyle uyumlu metin oluşturuyoruz */}
      <p className={`${styles.text} Body2`}>Fetching amazing campers...</p>
    </div>
  );
};

export default Loader;