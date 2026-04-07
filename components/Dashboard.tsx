
import React from 'react';
import { ViewType, UserStats } from '../types';
// Fixed: Consolidated all lucide-react imports and added the missing 'Ghost' icon.
import { Play, TrendingUp, Award, Zap, Flame, Book, Mic2, Ghost } from 'lucide-react';

interface DashboardProps {
  stats: UserStats;
  setView: (view: ViewType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, setView }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black">Chào bạn, {stats.level}! 👋</h2>
          <p className="text-slate-400 mt-2">Hôm nay bạn muốn học gì chuẩn Skibidi?</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 rounded-2xl skibidi-glass border-orange-500/50 text-orange-500 flex items-center gap-2">
             <TrendingUp size={20} />
             <span className="font-bold">Hạng {stats.level}</span>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<Zap />} 
          title="Nhiệm vụ hàng ngày" 
          value="3/5" 
          subtitle="Hoàn thành để nhận 100 coin"
          color="blue"
        />
        <StatCard 
          icon={<Award />} 
          title="Tổng XP" 
          value={stats.xp.toString()} 
          subtitle="Đang thăng hạng cực nhanh"
          color="purple"
        />
        <StatCard 
          icon={<Flame />} 
          title="Chuỗi học" 
          value={`${stats.streak} ngày`} 
          subtitle="Đừng để mất lửa nhé!"
          color="orange"
        />
      </div>

      <section>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Play size={20} className="text-orange-500" />
          Tiếp tục bài học
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div 
            onClick={() => setView(ViewType.DICTIONARY)}
            className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 cursor-pointer hover:border-orange-500/50 transition-all"
          >
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-500 text-xs font-bold uppercase mb-4 inline-block italic">Trending</span>
              <h4 className="text-2xl font-black mb-2">Từ điển "Chém Gió"</h4>
              <p className="text-slate-400">Tra những từ lóng mà sách giáo khoa chưa bao giờ dạy bạn.</p>
            </div>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Book size={120} />
            </div>
          </div>

          <div 
            onClick={() => setView(ViewType.SPEAKING)}
            className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 cursor-pointer hover:border-purple-500/50 transition-all"
          >
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-500 text-xs font-bold uppercase mb-4 inline-block italic">AI Powered</span>
              <h4 className="text-2xl font-black mb-2">Skibidi Bot Phản Xạ</h4>
              <p className="text-slate-400">Luyện nói tiếng Anh tự nhiên, không sợ bị quê.</p>
            </div>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Mic2 size={120} />
            </div>
          </div>
        </div>
      </section>

      <div className="skibidi-glass p-8 rounded-3xl border-purple-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center animate-bounce shadow-xl shadow-purple-500/30">
            <Ghost size={48} className="text-white" />
          </div>
          <div>
            <h4 className="text-2xl font-black mb-2">Thú cưng Skibidi đang đói!</h4>
            <p className="text-slate-300">Hoàn thành bài học để kiếm coin mua Pizza cho bé nó nào.</p>
            <button 
              onClick={() => setView(ViewType.PET)}
              className="mt-4 px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold transition-colors"
            >
              Xem ngay
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full -mr-20 -mt-20"></div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, subtitle, color }: any) => {
  const colors: any = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    orange: 'text-orange-500 bg-orange-500/10 border-orange-500/20'
  };
  
  return (
    <div className={`p-6 rounded-3xl border skibidi-glass flex flex-col gap-4`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]}`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <p className="text-slate-400 text-sm font-semibold">{title}</p>
        <h4 className="text-3xl font-black mt-1">{value}</h4>
        <p className="text-slate-500 text-xs mt-2">{subtitle}</p>
      </div>
    </div>
  );
};

export default Dashboard;
