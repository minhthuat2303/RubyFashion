import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingContactBar } from './components/common/FloatingContactBar';
import { ToastContainer } from './components/common/Toast';
import { ProductModal } from './components/common/ProductModal';
import { BookingModal } from './components/common/BookingModal';
import { SearchModal } from './components/common/SearchModal';
import { SEOPreviewModal } from './components/common/SEOPreviewModal';

import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { RentalGuidePage } from './pages/RentalGuidePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#1A1A1A] selection:bg-[#C5A059] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="flex-grow">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'collection' && <CollectionPage />}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'services' && <ServicesPage />}
        {activeTab === 'rental-guide' && <RentalGuidePage />}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'admin' && <AdminPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <FloatingContactBar />

      {/* Global Modals & Notifications */}
      <ProductModal />
      <BookingModal />
      <SearchModal />
      <SEOPreviewModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
