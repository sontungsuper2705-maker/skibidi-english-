
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Play, RefreshCw, Trophy, MessageCircle, ArrowRight } from 'lucide-react';
import { getSpeakingFeedback } from '../services/geminiService';

interface SpeakingCoachProps {
  addCoins: (amount: number) => void;
}

const SpeakingCoach: React.FC<SpeakingCoachProps> = ({ addCoins }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [currentSentence, setCurrentSentence] = useState("I think learning English with Skibidi English is so much fun!");

  const sentences = [
    "I think learning English with Skibidi English is so much fun!",
    "No cap, this app is the goat for learning slang.",
    "Can you give me a hand with this task?",
    "That movie was absolute fire, you should check it out."
  ];

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscript('');
      // In a real app, we'd use the Web Speech API or stream audio to Gemini
      // Here we simulate transcription
      setTimeout(() => {
        setTranscript(currentSentence.replace("fun", "fan")); // Simulate a small error
        setIsRecording(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (transcript && !isRecording) {
      handleEvaluate();
    }
  }, [transcript]);

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      const result = await getSpeakingFeedback(currentSentence, transcript);
      setFeedback(result);
      if (result.score > 80) addCoins(50);
      else addCoins(10);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const nextSentence = () => {
    const next = sentences[Math.floor(Math.random() * sentences.length)];
    setCurrentSentence(next);
    setFeedback(null);
    setTranscript('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-right duration-500">
      <div className="text-center">
        <h2 className="text-4xl font-black mb-4">Luyện Phát Âm "Dân Chơi" 🎙️</h2>
        <p className="text-slate-400">Nói chuẩn, nói hay, nói không bị quê cùng AI.</p>
      </div>

      <div className="skibidi-glass p-8 rounded-3xl border-slate-800 space-y-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <p className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">Đọc câu này nè:</p>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100">{currentSentence}</h3>
        </div>

        <div className="flex flex-col items-center justify-center py-10">
          <button
            onClick={toggleRecording}
            disabled={loading}
            className={`
              w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300
              ${isRecording 
                ? 'bg-red-500 animate-pulse shadow-2xl shadow-red-500/50 scale-110' 
                : 'bg-purple-600 hover:bg-purple-500 shadow-xl shadow-purple-500/30'}
              disabled:opacity-50
            `}
          >
            {isRecording ? <MicOff size={40} className="text-white" /> : <Mic size={40} className="text-white" />}
          </button>
          <p className="mt-6 font-bold text-lg">
            {isRecording ? 'Đang lắng nghe...' : 'Nhấn để bắt đầu nói'}
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-4 text-purple-400">
            <RefreshCw className="animate-spin" />
            <span className="font-bold">Skibidi Bot đang chấm điểm...</span>
          </div>
        )}

        {feedback && !loading && (
          <div className="animate-in zoom-in-95 duration-300 space-y-4">
            <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
              <div className="w-20 h-20 rounded-2xl skibidi-gradient flex flex-col items-center justify-center text-white shrink-0">
                <Trophy size={28} />
                <span className="text-2xl font-black">{feedback.score}</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-semibold mb-1 uppercase tracking-widest">Skibidi Bot nhận xét:</p>
                <p className="text-xl font-bold leading-tight">{feedback.feedback}</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex gap-4">
              <MessageCircle className="text-blue-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-blue-400 mb-1 uppercase tracking-widest">Tip cho bạn</p>
                <p className="text-slate-300">{feedback.tips}</p>
              </div>
            </div>

            <button 
              onClick={nextSentence}
              className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 font-bold transition-all flex items-center justify-center gap-2"
            >
              Thử câu tiếp theo <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl opacity-60">
        <h4 className="text-sm font-bold text-slate-500 mb-2">HƯỚNG DẪN:</h4>
        <ul className="text-xs space-y-1 text-slate-400 list-disc list-inside">
          <li>Hãy nói to, rõ ràng ở nơi yên tĩnh.</li>
          <li>Đừng lo lắng về lỗi sai, Skibidi Bot rất dễ tính!</li>
          <li>Điểm trên 80 sẽ nhận được x5 coins.</li>
        </ul>
      </div>
    </div>
  );
};

export default SpeakingCoach;
