
import React, { useState, useEffect } from 'react';
import { ViewType, UserStats } from './types';
import Dashboard from './components/Dashboard';
import Dictionary from './components/Dictionary';
import Flashcards from './components/Flashcards';
import SpeakingCoach from './components/SpeakingCoach';
import BattleArena from './components/BattleArena';
import PetStore from './components/PetStore';
import { 
  Home, 
  Book, 
  Layers, 
  Mic2, 
  Swords, 
  Ghost, 
  Coins, 
  Flame,
  Menu,
  X
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.DASHBOARD);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stats, setStats] = useState<UserStats>({
    coins: 1250,
    streak: 7,
    level: 'Dân Chơi',
    xp: 450
  });

  const addCoins = (amount: number) => {
    setStats(prev => ({ ...prev, coins: prev.coins + amount }));
  };

  const renderView = () => {
    switch (currentView) {
      case ViewType.DASHBOARD: return <Dashboard stats={stats} setView={setCurrentView} />;
      case ViewType.DICTIONARY: return <Dictionary addCoins={addCoins} />;
      case ViewType.FLASHCARDS: return <Flashcards addCoins={addCoins} />;
      case ViewType.SPEAKING: return <SpeakingCoach addCoins={addCoins} />;
      case ViewType.BATTLE: return <BattleArena addCoins={addCoins} stats={stats} />;
      case ViewType.PET: return <PetStore stats={stats} setStats={setStats} />;
      default: return <Dashboard stats={stats} setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 skibidi-glass sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold tracking-tighter text-orange-500 uppercase">Skibidi English</h1>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <nav className={`
        fixed inset-0 z-40 bg-slate-900 md:bg-transparent md:relative md:flex md:flex-col md:w-64 lg:w-72
        transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6 skibidi-glass m-4 rounded-3xl border-slate-800">
          <div className="hidden md:block mb-8">
            <h1 className="text-3xl font-extrabold tracking-tighter text-orange-500 uppercase">Skibidi English</h1>
            <p className="text-slate-400 text-xs mt-1 font-semibold uppercase tracking-widest">Học Chuẩn Trend</p>
          </div>

          <div className="flex flex-col gap-2 flex-grow">
            <NavItem icon={<Home />} label="Trang chủ" active={currentView === ViewType.DASHBOARD} onClick={() => {setCurrentView(ViewType.DASHBOARD); setIsMenuOpen(false);}} />
            <NavItem icon={<Book />} label="Từ điển xịn" active={currentView === ViewType.DICTIONARY} onClick={() => {setCurrentView(ViewType.DICTIONARY); setIsMenuOpen(false);}} />
            <NavItem icon={<Layers />} label="Thẻ ghi nhớ" active={currentView === ViewType.FLASHCARDS} onClick={() => {setCurrentView(ViewType.FLASHCARDS); setIsMenuOpen(false);}} />
            <NavItem icon={<Mic2 />} label="Luyện nói AI" active={currentView === ViewType.SPEAKING} onClick={() => {setCurrentView(ViewType.SPEAKING); setIsMenuOpen(false);}} />
            <NavItem icon={<Swords />} label="Đấu trường" active={currentView === ViewType.BATTLE} onClick={() => {setCurrentView(ViewType.BATTLE); setIsMenuOpen(false);}} />
            <NavItem icon={<Ghost />} label="Nuôi thú" active={currentView === ViewType.PET} onClick={() => {setCurrentView(ViewType.PET); setIsMenuOpen(false);}} />
          </div>

          <div className="mt-auto space-y-4 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-3 px-4">
              <div className="p-2 rounded-xl bg-orange-500/20 text-orange-500">
                <Flame size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Chuỗi ngày</p>
                <p className="font-bold">{stats.streak} ngày</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4">
              <div className="p-2 rounded-xl bg-yellow-500/20 text-yellow-500">
                <Coins size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Skibidi Coins</p>
                <p className="font-bold">{stats.coins.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto pb-20 md:pb-0">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200
      ${active 
        ? 'skibidi-gradient text-white shadow-lg shadow-orange-500/20' 
        : 'hover:bg-slate-800 text-slate-400 hover:text-white'}
    `}
  >
    {React.cloneElement(icon as React.ReactElement<any>, { size: 22 })}
    <span className="font-bold">{label}</span>
  </button>
);

export default App;
