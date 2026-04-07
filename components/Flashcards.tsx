
import React, { useState } from 'react';
import { RotateCw, CheckCircle2, XCircle } from 'lucide-react';

interface FlashcardData {
  id: string;
  word: string;
  phonetic: string;
  vietnamese: string;
  example: string;
  meme_url: string;
}

interface FlashcardsProps {
  addCoins: (amount: number) => void;
}

const Flashcards: React.FC<FlashcardsProps> = ({ addCoins }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);

  const cards: FlashcardData[] = [
    {
      id: "1",
      word: "Noob",
      phonetic: "/nuːb/",
      vietnamese: "Gà mờ / Lính mới",
      example: "Don't be a noob, learn English with Tung Skibidi!",
      meme_url: "https://picsum.photos/seed/noob/400/300"
    },
    {
      id: "2",
      word: "Slay",
      phonetic: "/sleɪ/",
      vietnamese: "Làm cực tốt / Đỉnh nóc kịch trần",
      example: "Your English skills are slaying!",
      meme_url: "https://picsum.photos/seed/slay/400/300"
    }
  ];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
      addCoins(100);
    }
  };

  const handleFeedback = (correct: boolean) => {
    if (correct) addCoins(20);
    handleNext();
  };

  if (completed) {
    return (
      <div className="text-center py-20 space-y-6 animate-in zoom-in duration-500">
        <div className="w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-yellow-500/30">
          <CheckCircle2 size={64} className="text-slate-900" />
        </div>
        <h2 className="text-4xl font-black text-white">XUẤT SẮC! 🎉</h2>
        <p className="text-slate-400 text-xl max-w-md mx-auto">Bạn đã hoàn thành bộ thẻ chuẩn Skibidi. Nhận ngay 100 Skibidi Coins!</p>
        <button 
          onClick={() => {setCompleted(false); setCurrentIndex(0);}}
          className="px-8 py-3 bg-orange-500 rounded-2xl font-bold hover:bg-orange-600 transition-colors text-white"
        >
          Học lại bộ này
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-xl mx-auto space-y-12 animate-in fade-in slide-in-from-top duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter text-white">Memory Skibidi 🧠</h2>
        <p className="text-slate-400">Dễ nhớ hơn cả người yêu cũ.</p>
        <div className="mt-6 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#FF00FF] transition-all duration-500" 
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest">Thẻ {currentIndex + 1} / {cards.length}</p>
      </div>

      <div 
        className="relative perspective-1000 w-full h-[300px] cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`
          relative w-full h-full transition-all duration-500 preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
        `}>
          {/* Front - Neon Tím */}
          <div className="absolute inset-0 backface-hidden bg-[#FF00FF] p-8 rounded-[20px] flex flex-col items-center justify-center border-4 border-white/20 shadow-[0_0_30px_rgba(255,0,255,0.4)] transition-all">
            <h3 className="text-[48px] font-black text-center text-white uppercase tracking-tighter drop-shadow-lg">
              {currentCard.word}
            </h3>
            <p className="text-white/80 font-mono mt-2">{currentCard.phonetic}</p>
            <p className="mt-8 text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <RotateCw size={14} /> Chạm để lật
            </p>
          </div>

          {/* Back - Neon Xanh */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#00FFFF] p-8 rounded-[20px] flex flex-col items-center justify-center border-4 border-white/20 shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all overflow-hidden">
             <div className="relative z-10 w-full flex flex-col items-center justify-center text-black">
               <h3 className="text-[32px] font-black text-center leading-tight mb-4">{currentCard.vietnamese}</h3>
               <p className="text-[16px] italic text-center text-black/70 px-4">"{currentCard.example}"</p>
             </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <button 
          onClick={(e) => { e.stopPropagation(); handleFeedback(false); }}
          className="flex-1 max-w-[160px] py-4 rounded-2xl bg-slate-900 border border-red-500/20 text-red-500 font-bold hover:bg-red-500/10 flex items-center justify-center gap-2 transition-all"
        >
          <XCircle size={20} /> Chưa nhớ
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleFeedback(true); }}
          className="flex-1 max-w-[160px] py-4 rounded-2xl bg-slate-900 border border-green-500/20 text-green-500 font-bold hover:bg-green-500/10 flex items-center justify-center gap-2 transition-all"
        >
          <CheckCircle2 size={20} /> Đã nhớ
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default Flashcards;
