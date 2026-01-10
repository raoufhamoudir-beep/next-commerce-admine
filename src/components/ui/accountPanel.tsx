import {
  Settings,
  MessageCircle,
  HelpCircle,
  LogOut,
  Check,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { AccountPanelProps } from "@/types";
import { logout } from "@/features/auth/hooks/useAuthMutations";





const AccountPanel = ({ user, hide }: AccountPanelProps) => {
  const { t } = useTranslation("constants"); // Fixed typo

  const menu = [
    {
      link: "/Settings",
      label: t("StoreOwnerSettings"),
      icon: <Settings className="w-4 h-4 text-purple-600" />,
    },
    {
      link: "/ContactUs",
      label: t("ContactUs"),
      icon: <MessageCircle className="w-4 h-4 text-purple-600" />,
    },
    {
      link: "/FAQ",
      label: t("FAQ"),
      icon: <HelpCircle className="w-4 h-4 text-purple-600" />,
    },
    {
      link: "/login",
      label: t("LogOut"),
      icon: <LogOut className="w-4 h-4 text-purple-600" />,
      isDestructive: true, // Mark logout as special
    },
  ];

  const handleLinkClick = (link: string) => {
    hide();
    if (link === "/login") {
logout()
    }
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-gray-100 text-center">
        <h2 className="font-bold text-xl capitalize text-gray-900">
          {user?.name || "User"}
        </h2>
        <div className="flex justify-center items-center mt-1 text-sm text-gray-500 gap-1.5">
          <span>{t("StoreOwner")}</span>
          <div className="bg-teal-50 rounded-full p-0.5">
            <Check className="w-3 h-3 text-teal-600" />
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="p-3 space-y-1">
        {menu.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.link}
            onClick={() => handleLinkClick(item.link)}
            className={({ isActive }) =>
              `flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
               ${isActive
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
               }`
            }
          >
            <span className="flex items-center gap-3">
               {/* Optional: if you want icon on left, move {item.icon} here */}
               {item.label}
            </span>
            {item.icon}
          </NavLink>
        ))}
      </div>

      {/* Close button */}
      <div className="p-5 pt-2">
        <button
          onClick={hide}
          className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-xl transition-colors text-sm"
        >
          {t("Close")}
        </button>
      </div>
    </div>
  );
};

export default AccountPanel;