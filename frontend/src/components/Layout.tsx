import { ReactNode } from 'react';
import { Briefcase, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface text-textSecondary flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-textPrimary flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-accent" />
            ResumeShelf
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a href="#" className="flex items-center gap-3 px-3 py-2 bg-background text-textPrimary rounded-lg transition-colors hover:bg-background">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-background hover:text-textPrimary">
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-background hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border bg-surface flex items-center px-8 justify-between">
          <h2 className="text-lg font-semibold text-textPrimary">Dashboard</h2>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold uppercase">
                {user?.name?.charAt(0) || 'U'}
             </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
