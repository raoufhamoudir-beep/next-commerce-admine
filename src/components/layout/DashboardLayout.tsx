import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useUser } from "@/features/auth/hooks/useUser";
import Header from "../ui/Header";
import Sidebar from "../ui/SideBar";
import Madel from "../ui/Madel";
import LanguagePanel from "../ui/LanguagePanel";
import AccountPanel from "../ui/accountPanel";

// Define what the User data looks like
 

const DashboardLayout = () => {
  const { data } = useUser()  // Cast to interface

  // Renamed 'SemalHarder' to 'isSidebarCollapsed' for clarity
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  // const openSidebar = () => setSidebarCollapsed(false);

  const [showPanels, setShowPanels] = useState({
    languagePanel: false,
    accountPanel: false,
  });

  const openLanguagePanel = () =>
    setShowPanels((prev) => ({ ...prev, languagePanel: true }));
  const openAccountPanel = () =>
    setShowPanels((prev) => ({ ...prev, accountPanel: true }));
  const closePanels = () =>
    setShowPanels({ accountPanel: false, languagePanel: false });
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        link={data?.repoName}
        isPaid={data?.isPaid}
        name={data?.name}
        orders={data?.orders}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
 
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Header
          isPaid={data?.isPaid}
          openAccountPanel={openAccountPanel}
          openLanguagePanel={openLanguagePanel}
          toggleSidebar={toggleSidebar}
        />
  {showPanels.languagePanel && <Madel  onClose={closePanels}><LanguagePanel hide={closePanels} /></Madel>}
      {showPanels.accountPanel && <Madel onClose={closePanels}><AccountPanel user={data} hide={closePanels} /></Madel>}
        {/* Dynamic Page Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;