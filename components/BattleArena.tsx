
import React, { useState, useEffect } from 'react';
import { Swords, Timer, Zap, Trophy, User } from 'lucide-react';
import { getQuizQuestions } from '../services/geminiService';

interface BattleArenaProps {
  addCoins: (amount: number) => void;
  stats: any;
}

const BattleArena: React.FC<BattleArenaProps> = ({ addCoins, stats }) => {
  const [gameState, setGameState] = useState<'lobby' | 'fighting' | 'result'>('lobby');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [loading, setLoading] = useState(false);

  const startBattle = async () => {
    setLoading(true);
    try {
      const data = await getQuizQuestions(stats.level);
      setQuestions(data);
      setGameState('fighting');
      setScore(0);
      setOpponentScore(0);
      setCurrentIndex(0);
      setTimeLeft(15);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer: any;
    if (gameState === 'fighting' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        // Randomly update opponent score
        if (Math.random() > 0.8) setOpponentScore(prev => prev + 10);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'fighting') {
      handleNextQuestion();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleAnswer = (option: string) => {
    if (option === questions[currentIndex].answer) {
      setScore(prev => prev + 20);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(15);
    } else {
      setGameState('result');
      if (score > opponentScore) addCoins(200);
      else if (score === opponentScore) addCoins(50);
    }
  };

  if (gameState === 'lobby') {
    return (
      <div className="max-w-4xl mx-auto text-center py-20 animate-in fade-in duration-500">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-orange-500 blur-[100px] opacity-20"></div>
          <Swords size={120} className="mx-auto text-orange-500 relative z-10 animate-pulse" />
        </div>
        <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">Đấu Trường Skibidi</h2>
        <p className="text-slate-400 text-xl mb-12">Thách đấu 1vs1 cùng "Skibidi Bot" để nhận hàng ngàn coins.</p>
        <button 
          onClick={startBattle}
          disabled={loading}
          className="px-12 py-5 bg-orange-500 hover:bg-orange-600 rounded-3xl text-2xl font-black transition-all transform hover:scale-105 shadow-2xl shadow-orange-500/20 disabled:opacity-50 flex items-center gap-4 mx-auto"
        >
          {loading ? 'Đang tìm đối thủ...' : 'THÁCH ĐẤU NGAY!'}
        </button>
      </div>
    );
  }

  if (gameState === 'fighting') {
    const q = questions[currentIndex];
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 skibidi-glass p-4 rounded-2xl flex items-center gap-4 border-orange-500/30">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center font-black">BẠN</div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Điểm số</p>
              <p className="text-2xl font-black">{score}</p>
            </div>
          </div>
          
          <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-black text-2xl ${timeLeft < 5 ? 'border-red-500 text-red-500 animate-bounce' : 'border-slate-700'}`}>
            {timeLeft}
          </div>

          <div className="flex-1 skibidi-glass p-4 rounded-2xl flex items-center justify-end gap-4 border-purple-500/30">
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase font-bold">Skibidi Bot</p>
              <p className="text-2xl font-black">{opponentScore}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center font-black">AI</div>
          </div>
        </div>

        <div className="skibidi-glass p-12 rounded-[40px] border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
             <div className="h-full bg-orange-500 transition-all duration-100" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
          </div>
          <p className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest italic">Câu hỏi {currentIndex + 1} / {questions.length}</p>
          <h3 className="text-3xl font-black mb-12">{q.question}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q.options.map((opt: string, i: number) => (
              <button 
                key={i}
                onClick={() => handleAnswer(opt)}
                className="p-6 rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-orange-500/50 text-xl font-bold transition-all text-left flex items-center gap-4"
              >
                <span className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-xs">{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-20 animate-in zoom-in duration-500">
      <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center shadow-2xl mb-8 ${score >= opponentScore ? 'bg-yellow-500 shadow-yellow-500/30' : 'bg-slate-800 shadow-slate-900'}`}>
        {score >= opponentScore ? <Trophy size={64} className="text-slate-900" /> : <Swords size={64} />}
      </div>
      <h2 className="text-5xl font-black mb-2 uppercase tracking-tighter">
        {score > opponentScore ? 'CHIẾN THẮNG!' : score === opponentScore ? 'HÒA RỒI!' : 'THUA MẤT RỒI!'}
      </h2>
      <p className="text-slate-400 text-xl mb-12">
        {score > opponentScore 
          ? `Bạn đã đánh bại Skibidi Bot và nhận 200 Coins.` 
          : `Đừng buồn, luyện tập thêm rồi quay lại phục thù nhé!`}
      </p>
      
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 p-6 bg-slate-900 border border-slate-800 rounded-3xl">
          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Của bạn</p>
          <p className="text-3xl font-black text-orange-500">{score}</p>
        </div>
        <div className="flex-1 p-6 bg-slate-900 border border-slate-800 rounded-3xl">
          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Skibidi Bot</p>
          <p className="text-3xl font-black text-purple-500">{opponentScore}</p>
        </div>
      </div>

      <button 
        onClick={() => setGameState('lobby')}
        className="px-12 py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl text-xl font-bold transition-all"
      >
        Trở lại sảnh
      </button>
    </div>
  );
};

export default BattleArena;
