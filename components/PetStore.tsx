
import React from 'react';
import { UserStats } from '../types';
import { Ghost, Heart, Star, ShoppingBag, Coffee, Pizza, Zap } from 'lucide-react';

interface PetStoreProps {
  stats: UserStats;
  setStats: React.Dispatch<React.SetStateAction<UserStats>>;
}

const PetStore: React.FC<PetStoreProps> = ({ stats, setStats }) => {
  const shopItems = [
    { name: 'Pizza Hải Sản', price: 50, icon: <Pizza className="text-red-400" />, buff: '+10 Vui vẻ' },
    { name: 'Cà phê Muối', price: 30, icon: <Coffee className="text-amber-600" />, buff: '+5 Tỉnh táo' },
    { name: 'Nước Tăng Lực', price: 80, icon: <Zap className="text-yellow-400" />, buff: '+20 XP Boost' },
    { name: 'Mũ Skibidi', price: 500, icon: <Star className="text-purple-400" />, buff: 'Trang phục Limited' },
  ];

  const buyItem = (price: number) => {
    if (stats.coins >= price) {
      setStats(prev => ({ ...prev, coins: prev.coins - price }));
      alert('Đã mua thành công! Pet của bạn rất thích nó.');
    } else {
      alert('Úi, bạn không đủ Skibidi Coins rồi. Đi học thêm để kiếm tiền nhé!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Pet Skibidi 👻</h2>
        <p className="text-slate-400">Chăm sóc thú cưng ảo để thăng hạng cực nhanh.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="skibidi-glass p-12 rounded-[50px] border-slate-800 relative flex flex-col items-center justify-center">
           <div className="absolute top-8 left-8 flex gap-2">
             <div className="flex items-center gap-1 bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-xs font-bold">
               <Heart size={14} fill="currentColor" /> 100%
             </div>
             <div className="flex items-center gap-1 bg-blue-500/20 text-blue-500 px-3 py-1 rounded-full text-xs font-bold">
               <Zap size={14} fill="currentColor" /> 85%
             </div>
           </div>

           <div className="w-48 h-48 bg-purple-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl shadow-purple-500/40 mt-12">
             <Ghost size={96} className="text-white" />
           </div>

           <div className="mt-12 text-center">
             <h3 className="text-2xl font-black mb-1">Tùng Bé Nhỏ</h3>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Cấp độ {Math.floor(stats.xp / 100)} Pet</p>
           </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <ShoppingBag className="text-orange-500" />
            Cửa hàng đồ chơi
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {shopItems.map((item, idx) => (
              <div 
                key={idx}
                className="skibidi-glass p-6 rounded-3xl border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-semibold">{item.buff}</p>
                  </div>
                </div>
                <button 
                  onClick={() => buyItem(item.price)}
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20"
                >
                  {item.price} <Star size={16} fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetStore;
