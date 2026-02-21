# -------------------- ENGLISH VERSION ---------------
# TravelTrucks - Campervan Rental Platform

TravelTrucks is a modern web application that allows users to find their dream campervans, explore detailed features, and make easy reservations. Developed with a user-friendly interface and powerful filtering options, it stays true to the Figma design specifications.

## 📝 Short Description
This project offers a comprehensive campervan catalog. Users can filter vehicles by equipment and type, read reviews from other users on detail pages, and fill out a reservation form for their desired travel dates.

## ✨ Key Features
- **Advanced Filtering:** Ability to search based on location, vehicle type, and equipment using **backend-based** filtering.
- **Dynamic Catalog:** Performance-oriented data listing with a "Load More" feature using real API pagination.
- **Detailed Vehicle View:** Vehicle gallery, technical specifications table, and a user reviews system.
- **Reservation System:** A user-friendly reservation panel featuring calendar integration and **success notifications** via React Toastify.
- **Favorites Management:** Persistence of favorited vehicles even after page refreshes using LocalStorage.
- **Asynchronous Data Management:** Loading indicators (Loader) to enhance user experience during API requests.

## 🛠️ Technology Stack
- **Frontend:** React (Vite).
- **State Management:** Redux Toolkit.
- **Routing:** React Router.
- **API Handling:** Axios & Redux Thunk.
- **Notifications:** React Toastify.
- **Styling:** CSS Modules & Normalize.css.

## 📦 Installation and Usage Instructions

Follow the steps below to run the project on your local machine:

1. **Clone the Project:**
   ```bash
   git clone [https://github.com/saimdurmusoglu/TravelTrucks.git](https://github.com/saimdurmusoglu/TravelTrucks.git)
   cd TravelTrucks

2. **Install Dependencies:**
   Run the following command to install the necessary packages:
   npm install

3. **Start the Application:**
   Use this command to launch the development server:
   npm run dev
   Note: The application typically runs at http://localhost:5173.

4. **Create Production (Build) Files:**
   Run the following command to generate optimized outputs:
   npm run build
   You can upload the resulting dist folder to your server after this command.

📋 Important Notes
As per project requirements, prices are displayed in a two-decimal format (8000.00).

All filtering and pagination processes are handled on the backend via MockAPI.

The project includes the necessary routing configuration (_redirects) to prevent 404 errors on platforms like Vercel or Netlify.

# -------------------- TÜRKÇE VERSİYON ---------------
# TravelTrucks - Karavan Kiralama Platformu

TravelTrucks, kullanıcıların hayallerindeki karavanı bulmalarını, detaylı özelliklerini incelemelerini ve kolayca rezervasyon yapmalarını sağlayan modern bir web uygulamasıdır. Figma tasarımına sadık kalınarak, kullanıcı dostu bir arayüz ve güçlü filtreleme özellikleriyle geliştirilmiştir.

## 📝 Kısa Açıklama
Bu proje, kapsamlı bir karavan kataloğu sunar. Kullanıcılar araçları ekipmanlarına ve tiplerine göre filtreleyebilir, detay sayfalarında diğer kullanıcıların yorumlarını okuyabilir ve gitmek istedikleri tarihler için rezervasyon formu doldurabilirler.

## ✨ Temel Özellikler
- **Gelişmiş Filtreleme:** Konum, araç tipi ve donanımlara göre **backend tabanlı** arama yapabilme.
- **Dinamik Katalog:** "Load More" özelliği ile gerçek API sayfalandırması (pagination).
- **Detaylı Araç Görünümü:** Araç galerisi, teknik özellikler ve kullanıcı yorumları (Reviews).
- **Rezervasyon Sistemi:** Takvim entegrasyonu ve **başarı bildirimleri** (Toastify) içeren rezervasyon paneli.
- **Favori Yönetimi:** Favoriye eklenen araçların sayfa yenilendiğinde korunması (LocalStorage).
- **Asenkron Veri Yönetimi:** Yüklenme durumları için özel "Loader" bileşeni.

## 🛠️ Teknoloji Yığını
- **Frontend:** React (Vite).
- **State Management:** Redux Toolkit.
- **Routing:** React Router.
- **API Handling:** Axios & Redux Thunk.
- **Notifications:** React Toastify.
- **Styling:** CSS Modules & Normalize.css.

## 📦 Kurulum ve Kullanım Talimatları

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edin:

1. **Projeyi Klonlayın:**
   ```bash
   git clone [https://github.com/saimdurmusoglu/TravelTrucks.git](https://github.com/saimdurmusoglu/TravelTrucks.git)
   cd TravelTrucks

2. **Bağımlılıkları yükleyin:**
   Projenin çalışması için gerekli olan paketleri (React, Redux, Toastify vb.) yüklemek için şu komutu çalıştırın:
   npm install

3. **Uygulamayı Başlatın:**
   Geliştirme sunucusunu ayağa kaldırmak ve tarayıcıda görüntülemek için şu komutu kullanın:
   npm run dev
   Not: Uygulama genellikle http://localhost:5173 adresinde çalışacaktır.

4. **Üretim (Build) Dosyalarını Oluşturun:**
   Projeyi yayına hazırlamak ve optimize edilmiş çıktıları almak için şu komutu çalıştırın:
   npm run build
   Bu komut sonrası oluşan dist klasörünü sunucunuza yükleyebilirsiniz.

📋 Önemli Notlar
Uygulama, fiyatları şartname gereği iki ondalık basamaklı (8000.00) formatta gösterir.

Tüm filtreleme ve sayfalandırma işlemleri MockAPI üzerinden backend tarafında gerçekleştirilmektedir.

Proje, Vercel/Netlify gibi platformlarda routing hatası almaması için gerekli yönlendirme yapılandırmasına uygundur.