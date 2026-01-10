import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoutes from "@/features/auth/components/ProtectedRoutes";
import Admin from "@/pages/Admin";
import CreateStore from "@/pages/CreateStore";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";


export const AppRoutes = () => {
  return (
    <Routes>
      {/* المسارات العامة (Public) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* المسارات المحمية (Protected) */}
      <Route element={<ProtectedRoutes />}>

        <Route path="/" element={<Admin />}  />
        <Route path="/store/new" element={<CreateStore />}  />
        <Route element={<DashboardLayout />}>
          <Route path="/store/:id" element={<div>hello</div>}  />
          <Route path="/orders" element={<div>صفحة الطلبات قريباً...</div>} />
          <Route path="/products" element={<div>صفحة المنتجات قريباً...</div>} />
        </Route>
      </Route>

      {/* أي رابط خطأ يوجه للرئيسية */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};