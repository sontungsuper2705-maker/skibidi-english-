
import React, { useState } from 'react';
// Fixed: Added 'Book' to the lucide-react imports.
import { Search, Loader2, Sparkles, Volume2, MessageSquareText, Book } from 'lucide-react';
import { getSmartDefinition } from '../services/geminiService';
import { WordDefinition } from '../types';

interface DictionaryProps {
  addCoins: (amount: number) => void;
}

const Dictionary: React.FC<DictionaryProps> = ({ addCoins }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<WordDefinition | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getSmartDefinition(query);
      setResult(data);
      addCoins(10); // Reward for searching
    } catch (err) {
      setError('Úi, Skibidi Bot chưa tìm thấy từ này. Thử từ khác xem sao!');
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(result?.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom duration-500">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black mb-4">Từ điển "Giao Quẻ" 🔮</h2>
        <p className="text-slate-400">Tra từ kiểu mới, học vèo vèo không mỏi mắt.</p>
      </div>

      <form onSubmit={handleSearch} className="relative group mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập từ muốn tra (ví dụ: Riz, Ghosting...)"
          className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-5 px-14 text-xl font-bold focus:border-orange-500 outline-none transition-all"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-orange-500 rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Tra ngay'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-center mb-8">
          {error}
        </div>
      )}

      {result && !loading && (
        <div className="space-y-6 animate-in zoom-in-95 duration-300">
          <div className="skibidi-glass p-8 rounded-3xl border-orange-500/30">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-5xl font-black text-orange-500 mb-2 uppercase tracking-tighter">{result.word}</h3>
                <p className="text-slate-400 font-mono text-lg">{result.phonetic}</p>
              </div>
              <button 
                onClick={playAudio}
                className="w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-orange-500 transition-all border border-slate-700"
              >
                <Volume2 size={32} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700">
                <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">Nghĩa tiếng Việt</p>
                <p className="text-xl font-bold">{result.vietnameseMeaning}</p>
              </div>
              <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-purple-400" />
                  <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">Góc Gen Z</p>
                </div>
                <p className="text-xl font-bold italic">"{result.slangMeaning}"</p>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-start gap-4">
                <MessageSquareText className="text-orange-500 shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-widest">Ví dụ thực tế</p>
                  <p className="text-lg leading-relaxed text-slate-200">{result.example}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!result && !loading && !error && (
        <div className="text-center py-20 opacity-30 select-none">
          <Book size={100} className="mx-auto mb-4" />
          <p className="text-xl font-bold">Thử một từ để thấy điều kỳ diệu!</p>
        </div>
      )}
    </div>
  );
};

export default Dictionary;
