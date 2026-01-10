import { useUser } from '@/features/auth/hooks/useUser';
import type { UserStore } from '@/types'; // Ensure this type is defined in your project
import { Plus, Store, ArrowRight, Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { data } = useUser();
  const userStores: UserStore[] = data?.Stores || [];
  const userName = data?.name || "Merchant"; // Fallback name

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* --- Simple Header --- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Next Commerce Logo" 
              className="h-10 w-auto object-contain" 
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-teal-500 hidden sm:block">
              Next Commerce
            </span>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors rounded-full hover:bg-purple-50">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-teal-400 p-[2px]">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                <span className="text-xs font-bold text-purple-700">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                Manage your stores or launch a new venture.
              </p>
            </div>
                   
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* Create New Store Card (Primary Action) */}
            <Link 
              to="/store/new" 
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-purple-200 hover:border-teal-400 bg-white/50 hover:bg-purple-50/30 transition-all duration-300 cursor-pointer min-h-[260px]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 h-16 w-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-teal-50 group-hover:shadow-lg group-hover:shadow-teal-200/50 transition-all duration-300">
                <Plus className="w-8 h-8 text-purple-600 group-hover:text-teal-600 transition-colors" />
              </div>
              
              <h3 className="relative z-10 text-lg font-semibold text-gray-800 group-hover:text-purple-700">
                Add New Store
              </h3>
              <p className="relative z-10 text-sm text-gray-400 mt-2 text-center max-w-[150px]">
                Create a new brand and start selling today.
              </p>
            </Link>

            {/* Existing Stores List */}
            {userStores.map((store) => (
              <div 
                key={store._id} 
                className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image / Banner Area */}
                <div className="h-24 bg-gradient-to-r from-gray-50 to-gray-100 relative">
                   {/* Status Dot (Mockup) */}
                   <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-teal-700 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                      Active
                   </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex-1 flex flex-col relative">
                  {/* Floating Logo */}
                  <div className="-mt-12 mb-4 self-center md:self-start">
                    {store.logo ? (
                      <img 
                        src={store.logo} 
                        alt={store.storeName} 
                        className="w-20 h-20 rounded-xl object-cover shadow-lg border-4 border-white bg-white"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-600 to-teal-500 flex items-center justify-center text-white shadow-lg border-4 border-white">
                        <Store className="w-9 h-9 opacity-90" />
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="text-center md:text-left mb-6">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors line-clamp-1">
                      {store.storeName}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 font-mono">
                      ID: {store._id.slice(-6).toUpperCase()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-3">
                    <Link 
                       to={`/admin/${store._id}/settings`}
                       className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                       title="Settings"
                    >
                      <Settings className="w-5 h-5" />
                    </Link>
                    
                    <Link 
                      to={`/admin/${store._id}/dashboard`}
                      className="flex-1 py-2 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-teal-500 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;