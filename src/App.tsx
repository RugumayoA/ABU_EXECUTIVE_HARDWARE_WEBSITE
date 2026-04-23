import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import { RequireAdmin } from './components/admin/RequireAdmin'
import { HomePage } from './pages/HomePage'
import { AdminPage } from './pages/AdminPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import {
  AboutPage,
  PrivacyPage,
  WhyBuyPage,
} from './pages/SiteInfoPages'

export default function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/visit" element={<Navigate to="/about" replace />} />
          <Route path="/why-us" element={<WhyBuyPage />} />
          <Route path="/guarantee" element={<Navigate to="/about" replace />} />
          <Route path="/contact" element={<Navigate to="/about" replace />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminPage />
              </RequireAdmin>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  )
}
