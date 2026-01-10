import {
  Home, Store, Box, Tag, Layers, Truck, Megaphone,
   Eye
} from 'lucide-react';
import { FaFacebook, FaTiktok } from "react-icons/fa";
import {  useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import { useState, useEffect} from 'react';
import { HiBars3BottomLeft } from "react-icons/hi2";
import { useTranslation } from 'react-i18next';
import { FaSheetPlastic } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import UpgradeBanner from './UpgradBanner'; // Fixed typo
import Dropdown from './Dropdown';
import NavItem from './NavItem';
import SectionLabel from './SectionLabel';
import type { SidebarProps } from '@/types';

// 1. Define Props Interface

export default function Sidebar({
  isCollapsed,
  toggleSidebar,
  name,
  link,
  isPaid,
  orders,
}: SidebarProps) {
  const { i18n, t } = useTranslation("constants"); // Fixed typo
  const currentLang = i18n.language;
  const location = useLocation();

  const [expandedMenus, setExpandedMenus] = useState({
    store: false,
    orders: false,
    products: false,
    categories: false,
    delivery: false,
    marketing: false,
    more: false,
  });

  // Auto-expand menu based on URL
  useEffect(() => {
    const path = location.pathname;
    setExpandedMenus((s) => ({
      ...s,
      orders: path.includes('/orders'),
      products: path.includes('/items') || path.includes('/additems'),
    }));
  }, [location.pathname]);

  const handleToggleMenu = (key: keyof typeof expandedMenus) => {
    setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.aside
      initial={{ x: currentLang === "ar" ? 1000 : -1000 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`
        fixed top-0 z-[500] h-full flex flex-col
        ${currentLang === "ar" ? "right-0 border-l" : "left-0 border-r"}
        bg-white/95 backdrop-blur-xl border-gray-100 shadow-2xl
        transition-all duration-300 ease-in-out overflow-hidden
        ${isCollapsed ? "w-0 md:w-[80px]" : "w-[85%] md:w-[280px]"}
      `}
    >
      {/* --- Header Section --- */}
      <div className={`flex items-center ${isCollapsed ? "justify-center px-0" : "justify-between px-5"} py-6 transition-all shrink-0`}>
        {!isCollapsed && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-black text-2xl bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent truncate"
          >
            {name || "NextStore"}
          </motion.h1>
        )}

        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-gray-500 hover:bg-purple-50 hover:text-purple-600 transition-colors"
        >
          <HiBars3BottomLeft className="w-6 h-6" />
        </button>
      </div>

      {/* --- Visit Website Button --- */}
      <div className={`mb-4 shrink-0 transition-all ${isCollapsed ? 'px-2 flex justify-center' : 'px-4'}`}>
        <a
          href={`https://${link}.next-commerce.shop`}
          target="_blank"
          rel="noreferrer"
          className={`
            group flex items-center justify-center rounded-xl transition-all duration-300 shadow-sm border
            ${isCollapsed
              ? "w-10 h-10 bg-white border-gray-200 text-teal-600 hover:bg-teal-50"
              : "gap-3 px-4 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white border-transparent hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5"
            }
          `}
        >
          <Eye className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-bold text-sm tracking-wide">{t("yourWebsite")}</span>}
        </a>
      </div>

      {/* --- Navigation Scroll Area --- */}
      <nav className={`flex-1 overflow-y-auto pb-4 space-y-1 scrollbar-hide ${isCollapsed ? "px-2" : "px-4"}`}>
        
        <SectionLabel label={t("Dashboard")} isCollapsed={isCollapsed} />
        
        <NavItem
          onClick={toggleSidebar}
          icon={<Home className="w-5 h-5" />}
          label={t("Home")}
          to="/"
          isCollapsed={isCollapsed}
        />

        <SectionLabel label={t("Management")} isCollapsed={isCollapsed} />

        <Dropdown
          label={t("Store")}
          icon={<Store className="w-5 h-5" />}
          isOpen={expandedMenus.store}
          toggle={() => handleToggleMenu('store')}
          isCollapsed={isCollapsed}
          isActive={location.pathname.includes('/update')}
        >
          <NavItem onClick={toggleSidebar} isSubItem label={t("Logo")} to="/update/logo" />
          <NavItem onClick={toggleSidebar} isSubItem label={t("Theme")} to="/update/theme" />
          <NavItem onClick={toggleSidebar} isSubItem label={t("Contactinformation")} to="/update/Contact-information" />
          <NavItem onClick={toggleSidebar} isSubItem label={t("Faqspage")} to="/update/faqs" />
          <NavItem onClick={toggleSidebar} isSubItem label={t("Storesettings")} to="/update/settings" />
        </Dropdown>

        <Dropdown
          label={t("Orders")}
          icon={<Box className="w-5 h-5" />}
          isOpen={expandedMenus.orders}
          toggle={() => handleToggleMenu('orders')}
          isCollapsed={isCollapsed}
          isActive={location.pathname.includes('/orders')}
        >
          <NavItem onClick={toggleSidebar} isSubItem label={t("AllOrders")} to="/orders" />
        </Dropdown>

        <Dropdown
          label={t("Products")}
          icon={<Tag className="w-5 h-5" />}
          isOpen={expandedMenus.products}
          toggle={() => handleToggleMenu('products')}
          isCollapsed={isCollapsed}
          isActive={location.pathname.includes('/items')}
        >
          <NavItem onClick={toggleSidebar} isSubItem label={t("Products")} to="/items" />
          <NavItem onClick={toggleSidebar} isSubItem label={t("AddProducts")} to="/additems" isHot />
        </Dropdown>

        {/* ... Repeated pattern for other dropdowns (Categories, Delivery, etc.) ... */}
         <Dropdown label={t("Categories")} icon={<Layers className="w-5 h-5" />} isOpen={expandedMenus.categories} toggle={() => handleToggleMenu('categories')} isCollapsed={isCollapsed} isActive={location.pathname.includes('/Categories')}>
            <NavItem onClick={toggleSidebar} isSubItem label={t("Categories")} to="/Categories" />
            <NavItem onClick={toggleSidebar} isSubItem label={t("AddCategories")} to="/AddCategories" />
        </Dropdown>

        <Dropdown label={t("Delivery")} icon={<Truck className="w-5 h-5" />} isOpen={expandedMenus.delivery} toggle={() => handleToggleMenu('delivery')} isCollapsed={isCollapsed} isActive={location.pathname.includes('/Liv')}>
            <NavItem onClick={toggleSidebar} isSubItem label={t("DeliveryCompanies")} to="/LivCompany" />
            <NavItem onClick={toggleSidebar} isSubItem label={t("DeliveryPrices")} to="/LivrisionPrice" />
        </Dropdown>

        <SectionLabel label={t("Growth")} isCollapsed={isCollapsed} />

        <Dropdown label={t("marketingTools")} icon={<Megaphone className="w-5 h-5" />} isOpen={expandedMenus.marketing} toggle={() => handleToggleMenu('marketing')} isCollapsed={isCollapsed} isActive={location.pathname.includes('Pixel')}>
            <NavItem onClick={toggleSidebar} isSubItem icon={<FaFacebook className="w-4 h-4 text-blue-600" />} label={t("facebookPixels")} to="/AddFacebookPixel" />
            <NavItem onClick={toggleSidebar} isSubItem icon={<FaTiktok className="w-4 h-4 text-black" />} label={t("TiktokPixels")} to="/AddTiktokPixel" />
        </Dropdown>

        <Dropdown label={t("others")} icon={<IoIosMore className="w-5 h-5" />} isOpen={expandedMenus.more} toggle={() => handleToggleMenu('more')} isCollapsed={isCollapsed}>
            <NavItem onClick={toggleSidebar} isSubItem icon={<FaSheetPlastic className="w-4 h-4 text-green-600" />} label={t("googlesheet")} to="/sheet" />
        </Dropdown>
      </nav>

      {/* Upgrade Banner */}
      {!isCollapsed && (
        <UpgradeBanner
          isPaid={isPaid}
          orders={orders}
          toggleSidebar={toggleSidebar}
        />
      )}

      {/* --- User/Profile Footer --- */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-100 bg-gray-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
              {name ? name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-700 truncate">{name}</p>
              <p className="text-xs text-gray-500 truncate">{t("StoreOwner")}</p>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  );
}










