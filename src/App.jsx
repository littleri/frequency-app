import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { 
  Mic, Image, Radio, Gamepad2, Send, X, Wifi, Battery, Signal, 
  Activity, ArrowLeft, MoreHorizontal, MessageSquare, User, 
  Clock, Lock, Eye, Infinity as InfinityIcon, ChevronRight,
  Zap, Coffee, CloudRain, Ghost, RefreshCw, Home, Save, Trash2, Play, Pause, Music, Sparkles,
  Users, CheckCircle, Bell, MoreVertical, Pin, Fingerprint, Settings, Shield, BellRing, Info, LogOut, Moon,
  QrCode, Smartphone, Link, Key, SmartphoneNfc, Sun, Type, CreditCard, Heart
} from 'lucide-react';

// ==========================================
// 1. 上下文 & Hooks (Context & Hooks)
// ==========================================
const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });
const useTheme = () => useContext(ThemeContext);

// ==========================================
// 2. 基础 UI 组件 (Atoms)
// ==========================================

const StatusBar = () => {
  const { theme } = useTheme();
  return (
    <div className={`absolute top-0 w-full pt-3 px-6 flex justify-between items-center text-xs z-50 pointer-events-none ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
      <span className="font-medium">11:30</span>
      <div className="flex gap-1.5">
        <Signal size={12} />
        <Wifi size={12} />
        <Battery size={12} />
      </div>
    </div>
  );
};

const Toggle = ({ checked, onChange }) => {
    const { theme } = useTheme();
    return (
        <div 
            onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
            className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 ${checked ? 'bg-indigo-600' : (theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300')}`}
        >
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
        </div>
    );
};

const ResonanceIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="url(#paint0_linear)" fillOpacity="0.2"/>
    <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12M8 12C6 12 5 10 5 8M16 12C18 12 19 14 19 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1"/>
        <stop offset="1" stopColor="#8B5CF6"/>
      </linearGradient>
    </defs>
  </svg>
);

const AppContainer = ({ children, style = {}, className = "" }) => {
  const { theme } = useTheme();
  
  const bgStyle = theme === 'dark' 
    ? { backgroundColor: '#0B0F19' } 
    : { backgroundColor: '#F8FAFC' }; 

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 p-4 font-sans">
      <div 
        className={`relative overflow-hidden transition-colors duration-500 flex flex-col shadow-2xl rounded-[40px] border-8 ${theme === 'dark' ? 'border-slate-800 text-slate-100' : 'border-slate-200 text-slate-900'} ${className}`}
        style={{ width: '375px', height: '812px', ...bgStyle, ...style }}
      >
        <style>{`
          @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          @keyframes pulse-soft { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
          
          @keyframes float-1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes float-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-30px, 40px) scale(0.9); }
            66% { transform: translate(20px, -30px) scale(1.1); }
          }
          @keyframes float-3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(40px, 30px) scale(0.95); }
          }

          .animate-slide-up { animation: slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
          .animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
          .animate-zoom-in { animation: zoomIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
          .animate-pulse-soft { animation: pulse-soft 3s infinite ease-in-out; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .glass-panel-dark { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); }
          .glass-panel-light { background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.4); }
          
          /* 通用全屏玻璃背景类 - 让波纹透出来 */
          .page-glass-dark { background: rgba(11, 15, 25, 0.6); backdrop-filter: blur(20px); }
          .page-glass-light { background: rgba(248, 250, 252, 0.6); backdrop-filter: blur(20px); }
        `}</style>
        
        {/* --- 动态背景波纹层 (Background Layer) --- */}
        {/* 调整了颜色和透明度，使其更加明显 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
             {/* 波纹 1: 靛蓝/主色 (左上) */}
             <div 
                className={`absolute -top-[10%] -left-[10%] w-[70%] h-[50%] rounded-full filter blur-[80px] animate-[float-1_12s_infinite_ease-in-out] ${theme === 'dark' ? 'bg-indigo-600 opacity-30' : 'bg-indigo-400 opacity-40'}`} 
             ></div>
             
             {/* 波纹 2: 紫色/Emo色 (右上) */}
             <div 
                className={`absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full filter blur-[90px] animate-[float-2_15s_infinite_ease-in-out] ${theme === 'dark' ? 'bg-purple-600 opacity-25' : 'bg-purple-400 opacity-30'}`}
             ></div>

             {/* 波纹 3: 青色/Chill色 (底部) */}
             <div 
                className={`absolute -bottom-[10%] left-[20%] w-[60%] h-[50%] rounded-full filter blur-[100px] animate-[float-3_18s_infinite_ease-in-out] ${theme === 'dark' ? 'bg-teal-600 opacity-25' : 'bg-teal-400 opacity-30'}`}
             ></div>
        </div>

        {/* --- 内容层 (Z-Index 10 确保在波纹之上) --- */}
        <div className="relative z-10 w-full h-full flex flex-col">
            {children}
        </div>

        <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full z-[100] pointer-events-none ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`}></div>
      </div>
    </div>
  );
};

const BottomNav = ({ activeTab, onTabChange }) => {
  const { theme } = useTheme();
  // 增加背景不透明度，防止波纹过于干扰导航，但保持毛玻璃
  const bgClass = theme === 'dark' ? 'bg-[#0B0F19]/80 border-white/5' : 'bg-white/80 border-slate-200';
  const textClass = theme === 'dark' ? 'text-slate-600' : 'text-slate-400';
  const activeClass = 'text-indigo-500'; 

  return (
    <div className={`w-full h-20 border-t backdrop-blur-xl flex items-center justify-around px-6 pb-4 z-40 relative flex-shrink-0 transition-colors duration-300 ${bgClass}`}>
      <button onClick={() => onTabChange('whisper')} className={`flex flex-col items-center justify-center transition-all ${activeTab === 'whisper' ? `${activeClass} -translate-y-1` : textClass}`}>
        <MessageSquare size={activeTab === 'whisper' ? 26 : 24} strokeWidth={activeTab === 'whisper' ? 2.5 : 2}/>
        <span className="font-medium mt-1 text-[10px]" style={{ opacity: activeTab === 'whisper' ? 1 : 0 }}>密语</span>
      </button>
      
      <button onClick={() => onTabChange('resonance')} className={`flex flex-col items-center justify-center transition-all ${activeTab === 'resonance' ? '-translate-y-4 scale-110' : ''}`}>
        <div className={`w-14 h-14 rounded-full border flex items-center justify-center shadow-lg transition-all duration-500 ${activeTab === 'resonance' ? 'bg-gradient-to-tr from-indigo-500 to-purple-600 border-white/20 text-white shadow-indigo-500/40' : `${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} ${textClass}`}`}>
           <Activity size={24} className={activeTab === 'resonance' ? 'animate-pulse' : ''}/>
        </div>
        <span className={`font-medium mt-1 text-[10px] ${activeTab === 'resonance' ? 'text-indigo-500' : 'opacity-0'}`}>共鸣</span>
      </button>
      
      <button onClick={() => onTabChange('profile')} className={`flex flex-col items-center justify-center transition-all ${activeTab === 'profile' ? `${activeClass} -translate-y-1` : textClass}`}>
        <User size={activeTab === 'profile' ? 26 : 24} strokeWidth={activeTab === 'profile' ? 2.5 : 2}/>
        <span className="font-medium mt-1 text-[10px]" style={{ opacity: activeTab === 'profile' ? 1 : 0 }}>主页</span>
      </button>
    </div>
  );
};

// ==========================================
// 3. 功能模态窗与子页面 (严格排序: 功能 -> 子页)
// ==========================================

const ChatInitiateModal = ({ type, onClose, onSend }) => {
    const { theme } = useTheme();
    const [text, setText] = useState('');
    const isOneOff = type === 'one-off'; 

    const bgClass = theme === 'dark' ? 'bg-[#1A1E2E]/90 border-white/10' : 'bg-white/90 border-slate-100 shadow-xl';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-500' : 'text-slate-400';
    const inputBg = theme === 'dark' ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-200 text-slate-800';

    const handleSend = () => {
        onSend(text);
        onClose();
    };

    return (
        <div className="absolute inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-end justify-center" onClick={onClose}>
            <div className={`w-full ${bgClass} backdrop-blur-md rounded-t-3xl p-6 border-t animate-slide-up`} onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`${textMain} font-medium`}>{isOneOff ? '发送留言' : '发起同频对话'}</h3>
                    <button onClick={onClose}><X className={textSub}/></button>
                </div>
                {isOneOff && <div className="text-xs text-orange-400 mb-2">只能发送一条消息，对方回复后开启聊天</div>}
                <textarea 
                    className={`w-full h-32 rounded-xl p-4 text-sm outline-none resize-none border focus:border-indigo-500/50 ${inputBg} ${theme === 'light' ? 'placeholder:text-slate-400' : ''}`}
                    placeholder={isOneOff ? "说点什么..." : "Hi, 我也..."}
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button onClick={handleSend} className="w-full mt-4 py-3 bg-indigo-600 rounded-full text-white font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/30">
                    发送
                </button>
            </div>
        </div>
    );
};

const EmissionModal = ({ onClose }) => {
  const { theme } = useTheme();
  const [mood, setMood] = useState(50); 
  const [text, setText] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false); // 新增正在发送状态

  // 使用玻璃效果背景
  const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
  const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const inputColor = theme === 'dark' ? 'text-slate-200 placeholder-slate-600' : 'text-slate-800 placeholder-slate-400';
  const btnBg = theme === 'dark' ? 'bg-white/5 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800';

  const getMoodColor = () => {
    if (mood < 30) return 'text-indigo-400';
    if (mood > 70) return 'text-orange-400';
    return 'text-teal-400';
  };
  
  const getMoodLabel = () => {
     if (mood < 30) return '40Hz (Low)';
     if (mood > 70) return '180Hz (High)';
     return '100Hz (Chill)';
  }

  const handleEmit = () => {
    if (isSending) return;
    setIsSending(true);
    // 模拟发送过程动画，2秒后显示发送成功
    setTimeout(() => {
        setIsSending(false);
        setIsSent(true);
        setTimeout(onClose, 1500);
    }, 2000);
  };

  if (isSent) {
    return (
      <div className={`absolute inset-0 z-[80] flex flex-col items-center justify-center ${bgClass}`}>
        <div className="w-40 h-40 rounded-full bg-indigo-500/10 animate-pulse absolute"></div>
        <div className={`font-light tracking-widest text-lg ${textMain}`}>频率已发射...</div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 z-[80] flex flex-col px-6 transition-transform duration-300 h-full ${bgClass}`}>
      <StatusBar />
      <div className="absolute top-12 left-0 w-full text-center pointer-events-none">
          <span className={`${textMain} font-medium text-lg`}>发射台</span>
      </div>
      <button onClick={onClose} className={`absolute top-12 right-6 p-2 rounded-full z-50 ${theme === 'dark' ? 'text-slate-400 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-100'}`}><X /></button>
      
      <div className="flex-1 flex flex-col pt-24">
          <div className="mb-8 mt-8">
            <div className={`text-center mb-4 text-xl font-mono ${getMoodColor()}`}>{getMoodLabel()}</div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={mood} 
              onChange={(e) => setMood(e.target.value)}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className={`flex justify-between text-xs mt-2 ${textSub}`}>
              <span>Emo</span>
              <span>Hyper</span>
            </div>
          </div>

          <textarea
            className={`w-full bg-transparent text-2xl text-center outline-none resize-none h-40 ${inputColor}`}
            placeholder="你现在的频率是？"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={140}
          />
          <div className={`text-right text-xs ${textSub}`}>{text.length}/140</div>

          <div className="flex gap-4 justify-center mt-8">
            <button className={`p-3 rounded-full transition-colors ${btnBg}`}><Image size={20}/></button>
            <button className={`p-3 rounded-full transition-colors ${btnBg}`}><Mic size={20}/></button>
          </div>
      </div>

      <div className="w-full mt-4 pb-12">
        <button 
          onClick={handleEmit}
          disabled={isSending}
          className={`w-full py-4 font-bold rounded-full transition-all relative overflow-hidden group shadow-lg flex items-center justify-center ${theme === 'dark' ? 'bg-slate-100 text-black hover:bg-white' : 'bg-slate-900 text-white hover:bg-black'}`}
        >
          {isSending ? (
            <span className="relative z-10 animate-pulse flex items-center gap-2">
               <Activity size={18} className="animate-spin" />
               正在发射频率...
            </span>
          ) : (
            <>
                <span className="relative z-10">发射频率</span>
                <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const RandomSignalCard = ({ type, onClose, onConnect }) => {
  const { theme } = useTheme();
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const bgClass = theme === 'dark' ? 'bg-[#1A1E2E]/90 border-white/10' : 'bg-white/90 border-slate-100 shadow-2xl';
  const textMain = theme === 'dark' ? 'text-slate-100' : 'text-slate-900';
  const textSub = theme === 'dark' ? 'text-slate-500' : 'text-slate-400';
  const btnClass = theme === 'dark' ? 'text-slate-500 hover:text-white bg-white/5 border-white/5' : 'text-slate-500 hover:text-slate-900 bg-slate-100 border-slate-200';

  const signalData = {
    hyper: [
      { text: "今晚的月亮太好看了！有人要一起跑步吗？", img: "https://images.unsplash.com/photo-1532971383344-f584d4f82662?w=500&q=80" },
      { text: "这首节奏感太强了，忍不住抖腿！", audio: "3:45" },
      { text: "通宵打游戏，谁来？", img: null, audio: null }
    ],
    chill: [
      { text: "午后的阳光刚刚好。", img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=80" },
      { text: "海浪的声音。", audio: "1:20" },
      { text: "一杯咖啡，一本书。", img: null, audio: null }
    ],
    emo: [
      { text: "下雨天总是让人想很多。", img: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&q=80" },
      { text: "听着这首歌，感觉时间都慢下来了。", audio: "4:20" },
      { text: "好累，想变成石头。", img: null, audio: null }
    ]
  };

  const currentList = signalData[type] || signalData['chill'];
  const [idx, setIdx] = useState(0);
  const data = currentList[idx % currentList.length];

  const handleNext = () => setIdx(prev => prev + 1);

  const startHold = () => {
    if (holding) return;
    setHolding(true);
    let p = 0;
    timerRef.current = setInterval(() => {
      p += 3; 
      setProgress(p);
      if (p >= 100) {
        clearInterval(timerRef.current);
        onConnect(); 
      }
    }, 20);
  };

  const endHold = () => {
    setHolding(false);
    setProgress(0);
    if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
    }
  };

  const getTypeColor = () => {
      if (type === 'hyper') return 'bg-orange-500';
      if (type === 'emo') return 'bg-indigo-500';
      return 'bg-teal-500';
  };

  return (
    <div className="absolute inset-0 z-[60] bg-black/60 flex items-end justify-center backdrop-blur-sm">
      <div className={`w-full h-[85%] rounded-t-[40px] p-8 flex flex-col relative border-t animate-slide-up backdrop-blur-xl ${bgClass}`}>
        <button className={`absolute top-6 right-6 p-2 rounded-full ${btnClass}`} onClick={onClose}><X size={20}/></button>
        <div className="w-12 h-1.5 bg-slate-500/20 rounded-full mx-auto mb-8"></div>
        
        <div className="flex-1 flex flex-col items-center justify-center w-full">
            <div className={`w-4 h-4 rounded-full ${getTypeColor()} mb-4`}></div>
            
            <div className="w-full max-h-[60%] overflow-hidden rounded-2xl mb-6 relative group bg-black/5">
                {data.img && <img src={data.img} alt="Signal Content" className="w-full h-full object-cover" />}
                {data.audio && (
                    <div className={`w-full h-32 flex items-center justify-center gap-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-white/10' : 'bg-white shadow-sm'}`}><Play fill="currentColor" size={20} className={textMain}/></div>
                        <div className="h-10 flex gap-1 items-end">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className={`${theme === 'dark' ? 'bg-slate-500' : 'bg-slate-300'} rounded-full w-1`} style={{ height: (10 + Math.abs(Math.sin(i)) * 20) + 'px' }}></div>
                            ))}
                        </div>
                        <span className={`text-xs font-mono ${textSub}`}>{data.audio}</span>
                    </div>
                )}
            </div>

            <h2 className={`text-xl font-light leading-relaxed text-center px-4 ${textMain}`}>"{data.text}"</h2>
            <div className={`mt-4 text-xs ${textSub}`}>类型: {type.toUpperCase()}</div>
        </div>

        <div className={`mt-6 pt-6 border-t flex justify-between items-end pb-8 w-full ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
             <button onClick={handleNext} className={`flex flex-col items-center gap-2 transition-colors group ${textSub}`}>
                 <div className={`p-4 rounded-full border active:scale-95 transition-transform ${btnClass}`}><RefreshCw size={22} /></div>
                 <span style={{ fontSize: '11px' }}>换一个</span>
             </button>

             <div className="flex flex-col items-center gap-2">
                <div 
                    className="relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                    onMouseDown={startHold} onMouseUp={endHold} onTouchStart={startHold} onTouchEnd={endHold}
                >
                    <svg className="absolute w-full h-full -rotate-90">
                    <circle cx="48" cy="48" r="46" stroke={theme==='dark' ? '#334155' : '#CBD5E1'} strokeWidth="2" fill="none" />
                    <circle cx="48" cy="48" r="46" stroke={theme==='dark' ? '#fff' : '#475569'} strokeWidth="4" fill="none" strokeDasharray="289" strokeDashoffset={289 - (289 * progress) / 100} className="transition-all duration-75" />
                    </svg>
                    <Activity size={32} className={`transition-colors ${holding ? (theme==='dark' ? 'text-white' : 'text-slate-900') : textSub}`} />
                </div>
                <span className={`font-medium ${textSub}`} style={{ fontSize: '11px' }}>{holding ? '连接中...' : '长按同频'}</span>
             </div>
        </div>
      </div>
    </div>
  );
};

const MyFrequencyList = ({ onBack, onSelectFrequency }) => {
    const { theme } = useTheme();
    // 使用玻璃效果背景
    const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const itemBg = theme === 'dark' ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white/40 border-slate-200 shadow-sm hover:border-indigo-200 hover:bg-white/60';
    const textSub = theme === 'dark' ? 'text-slate-500' : 'text-slate-400';
    const textContent = theme === 'dark' ? 'text-slate-200' : 'text-slate-700';

    const frequencies = [
        { id: 1, text: '想要去海边看日出...', unread: 10, time: '10:30' },
        { id: 2, text: '周五晚上的爵士乐...', unread: 4, time: '昨天' },
    ];

    return (
        <div className={`absolute inset-0 z-[60] flex flex-col ${bgClass}`}>
            <StatusBar />
            <div className="pt-12 px-6 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack}><ArrowLeft className={textSub} /></button>
                    <h1 className={`text-xl font-light tracking-wider ${textMain}`}>我的相似频率</h1>
                </div>
                <div className="space-y-4">
                    {frequencies.map(item => (
                        <div key={item.id} onClick={() => onSelectFrequency(item)} className={`p-5 rounded-2xl border transition-colors relative cursor-pointer ${itemBg}`}>
                             {item.unread > 0 && (
                                 <div className={`absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center border-4 font-bold shadow-sm ${theme === 'dark' ? 'border-[#0B0F19]' : 'border-slate-50'}`}>
                                     {item.unread}
                                 </div>
                             )}
                             <div className="flex justify-between items-start mb-2">
                                 <span className={`text-xs ${textSub}`}>{item.time}</span>
                                 <Sparkles size={12} className="text-teal-400"/>
                             </div>
                             <p className={`text-sm font-light ${textContent}`}>"{item.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SimilarDetailView = ({ onClose, onConnect }) => {
    const { theme } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [unreadCount, setUnreadCount] = useState(10);
    const bgBackdrop = theme === 'dark' ? 'bg-black/80' : 'bg-slate-100/80';
    const cardBg = theme === 'dark' ? 'bg-[#1A1E2E]/90 border-white/10 shadow-2xl' : 'bg-white/90 border-slate-200 shadow-xl';
    const textMain = theme === 'dark' ? 'text-slate-200' : 'text-slate-800';
    const navColor = theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-800';

    const handleNext = () => {
        if (currentIndex < 9) {
            setCurrentIndex(prev => prev + 1);
            setUnreadCount(prev => Math.max(0, prev - 1));
        } else {
            onClose(); 
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    const [holding, setHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(null);

    const startHold = () => {
        if (holding) return;
        setHolding(true);
        let p = 0;
        timerRef.current = setInterval(() => {
        p += 4; 
        setProgress(p);
        if (p >= 100) {
            clearInterval(timerRef.current);
            onConnect(); 
        }
        }, 20);
    };

    const endHold = () => {
        setHolding(false);
        setProgress(0);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    return (
        <div className={`absolute inset-0 z-[70] backdrop-blur-xl flex flex-col ${bgBackdrop}`}>
            <StatusBar />
            <div className="pt-12 px-6 flex justify-between items-center">
                <button onClick={onClose}><X className={navColor}/></button>
                <div className="flex gap-1">{[...Array(5)].map((_, i) => (<div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentIndex % 5 ? (theme==='dark'?'bg-white':'bg-slate-800') : (theme==='dark'?'bg-slate-700':'bg-slate-300')}`}></div>))}</div>
                <div className="text-xs text-red-500 font-mono">剩余 {unreadCount}</div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
                {currentIndex > 0 && (<button onClick={handlePrev} className={`absolute left-2 p-2 ${navColor}`}><ChevronRight className="rotate-180"/></button>)}
                <div className={`w-full aspect-[3/4] rounded-3xl p-8 border flex flex-col animate-zoom-in relative ${cardBg}`}>
                    <div className="flex items-center gap-3 mb-6"><div className="w-8 h-8 rounded-full bg-orange-500"></div><span className="text-xs text-slate-400">USER_{3000+currentIndex}</span></div>
                    <div className="flex-1 flex items-center justify-center"><p className={`text-xl font-light text-center leading-relaxed ${textMain}`}>"这里的频率和我很像... 我也经常在半夜去海边。"</p></div>
                    <div className="text-center text-xs text-slate-500 mt-4">匹配度 {98 - currentIndex}%</div>
                </div>
                <button onClick={handleNext} className={`absolute right-2 p-2 ${navColor}`}><ChevronRight /></button>
            </div>
            <div className="pb-12 px-8 flex justify-center flex-col items-center gap-2">
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform" onMouseDown={startHold} onMouseUp={endHold} onTouchStart={startHold} onTouchEnd={endHold}>
                    <div className="absolute inset-0 border-2 border-teal-500/30 rounded-full"></div>
                    <svg className="absolute w-full h-full -rotate-90"><circle cx="40" cy="40" r="38" stroke="transparent" strokeWidth="2" fill="none" /><circle cx="40" cy="40" r="38" stroke="#2dd4bf" strokeWidth="4" fill="none" strokeDasharray="238" strokeDashoffset={238 - (238 * progress) / 100} className="transition-all duration-75" /></svg>
                    <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-xl"></div>
                    <span className="text-xs font-bold text-teal-400 relative z-10">{holding ? 'Connecting' : '长按同频'}</span>
                </div>
                <div className="text-center text-slate-500 text-[10px]">建立连接并保存至密语</div>
            </div>
        </div>
    );
};

const FriendsListPage = ({ onBack, onChatStart }) => {
    const { theme } = useTheme();
    // 使用玻璃效果背景
    const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    const itemBg = theme === 'dark' ? 'bg-white/5 border-white/5 active:bg-white/10' : 'bg-white/40 border-slate-200 active:bg-slate-100 shadow-sm';
    
    const friends = [
        { id: 1, name: '林语堂', avatarColor: 'bg-blue-500', resonanceTime: '2小时前' },
        { id: 2, name: '张爱玲', avatarColor: 'bg-red-500', resonanceTime: '昨天' },
        { id: 3, name: '鲁迅', avatarColor: 'bg-slate-700', resonanceTime: '3天前' },
    ];

    return (
        <div className={`absolute inset-0 z-[60] flex flex-col ${bgClass}`}>
            <StatusBar />
            <div className="pt-12 px-6 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white/50 hover:bg-slate-100/50 shadow-sm'}`}>
                        <ArrowLeft className={textSub} size={20} />
                    </button>
                    <h1 className={`text-xl font-light tracking-wider flex items-center gap-2 ${textMain}`}>
                        <Users size={20} className="text-indigo-400"/> 已同频好友
                    </h1>
                </div>
                <div className="space-y-4 overflow-y-auto flex-1 pb-4 no-scrollbar">
                    {friends.map(friend => (
                        <div key={friend.id} onClick={onChatStart} className={`p-4 rounded-xl flex items-center gap-4 transition-colors cursor-pointer border ${itemBg}`}>
                            <div className={`w-12 h-12 rounded-full ${friend.avatarColor} flex items-center justify-center text-white font-bold`}>{friend.name[0]}</div>
                            <div className="flex-1">
                                <div className={`font-medium text-sm ${textMain}`}>{friend.name}</div>
                                <div className="text-xs text-slate-500">同频于 {friend.resonanceTime}</div>
                            </div>
                            <ChevronRight size={16} className="text-slate-600"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const SystemNotifyPage = ({ onBack }) => {
    const { theme } = useTheme();
    // 使用玻璃效果背景
    const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    const itemBg = theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white/50 border-slate-200 shadow-sm';
    
    return (
        <div className={`absolute inset-0 z-[60] flex flex-col ${bgClass}`}>
            <StatusBar />
            <div className={`pt-12 px-6 pb-4 flex items-center gap-4 border-b flex-shrink-0 ${theme === 'dark' ? 'border-white/5' : 'border-slate-200/50'}`}>
                <button onClick={onBack}><ArrowLeft className={textSub}/></button>
                <h1 className={`text-lg ${textMain}`}>系统通知</h1>
            </div>
            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                <div className={`p-4 rounded-xl border ${itemBg}`}>
                    <h4 className="text-indigo-400 text-sm font-bold mb-1">版本更新 2.0</h4>
                    <p className={`text-xs ${textSub}`}>优化了共频匹配算法，新增相似频率浏览模式。</p>
                </div>
                <div className={`p-4 rounded-xl border ${itemBg}`}>
                    <h4 className="text-teal-400 text-sm font-bold mb-1">安全提醒</h4>
                    <p className={`text-xs ${textSub}`}>请勿轻信陌生人转账请求。</p>
                </div>
            </div>
        </div>
    );
};

const ResonanceListPage = ({ signal, onBack, onChatStart }) => {
    const { theme } = useTheme();
    // 使用玻璃效果背景
    const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    const itemBg = theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white/50 border-slate-200 shadow-sm';
    const quoteBg = theme === 'dark' ? 'bg-slate-800/50 border-indigo-500' : 'bg-indigo-50/50 border-indigo-400';

    return (
        <div className={`absolute inset-0 z-[60] flex flex-col ${bgClass}`}>
            <StatusBar />
            <div className="pt-12 px-6 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6 flex-shrink-0">
                    <button onClick={onBack}><ArrowLeft className={textSub} /></button>
                    <h1 className={`text-xl font-light tracking-wider ${textMain}`}>共频留言</h1>
                </div>
                <div className={`p-4 rounded-xl mb-8 border-l-2 flex-shrink-0 ${quoteBg}`}>
                    <div className="text-slate-500 mb-1" style={{ fontSize: '10px' }}>源频率</div>
                    <p className={`text-sm italic ${textMain}`}>"{signal.content}"</p>
                </div>
                
                <div className="space-y-3 overflow-y-auto no-scrollbar flex-1 pb-8">
                    {[...Array(3)].map((_, i) => (
                          <div key={i} className={`flex flex-col p-4 rounded-xl border ${itemBg}`}>
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full ${i%2===0 ? 'bg-indigo-500' : 'bg-teal-500'} flex items-center justify-center font-bold text-xs text-white`}>U{i}</div>
                                    <span className={`text-sm ${textMain}`}>USER_{9000+i}</span>
                                </div>
                                <span className="bg-indigo-500/20 text-indigo-400 text-[10px] px-2 py-0.5 rounded">留言</span>
                            </div>
                            <p className={`text-xs mb-4 pl-10 ${textSub}`}>
                                {i%2===0 ? "我也觉得这种感觉很糟糕，抱抱你。" : "我也在听这首歌！太巧了。"}
                            </p>
                            <button onClick={onChatStart} className="self-end px-4 py-1.5 rounded-full bg-slate-700 hover:bg-indigo-600 text-xs text-white transition-colors">
                                对话
                            </button>
                          </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const ProfileSettingsPage = ({ onBack }) => {
    const { theme } = useTheme();
    // 使用玻璃效果背景
    const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    const cardBg = theme === 'dark' ? 'bg-[#151925]/80 border-white/5' : 'bg-white/60 border-slate-200 shadow-sm';
    const borderClass = theme === 'dark' ? 'border-white/5' : 'border-slate-100';

    return (
        <div className={`absolute inset-0 z-[70] flex flex-col animate-slide-in-right ${bgClass}`}>
            <StatusBar />
            <div className={`pt-12 px-6 pb-4 flex items-center gap-4 border-b flex-shrink-0 ${borderClass}`}>
                <button onClick={onBack} className={`p-2 -ml-2 rounded-full transition-colors ${textSub}`}><ArrowLeft/></button>
                <h1 className={`text-lg font-medium ${textMain}`}>个人信息</h1>
            </div>
            <div className="p-6">
                <div className={`rounded-2xl overflow-hidden border ${cardBg}`}>
                    <div className={`flex items-center justify-between p-4 border-b ${borderClass} cursor-pointer`}>
                        <span className={`text-sm ${textMain}`}>头像</span>
                        <div className="flex items-center gap-2"><div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800"></div><ChevronRight size={16} className={textSub}/></div>
                    </div>
                    <div className={`flex items-center justify-between p-4 border-b ${borderClass} cursor-pointer`}>
                        <span className={`text-sm ${textMain}`}>名字</span>
                        <div className="flex items-center gap-2"><span className={`text-xs ${textSub}`}>User_8848</span><ChevronRight size={16} className={textSub}/></div>
                    </div>
                    <div className={`flex items-center justify-between p-4 cursor-pointer`}>
                        <span className={`text-sm ${textMain}`}>频率号</span>
                        <div className="flex items-center gap-2"><span className={`text-xs ${textSub}`}>freq_8848</span><ChevronRight size={16} className={textSub}/></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AccountSecurityPage = ({ onBack }) => {
    const { theme } = useTheme();
    // 使用玻璃效果背景
    const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
    const cardBg = theme === 'dark' ? 'bg-[#151925]/80 border-white/5' : 'bg-white/60 border-slate-200 shadow-sm';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    return (
        <div className={`absolute inset-0 z-[70] flex flex-col animate-slide-in-right ${bgClass}`}>
            <StatusBar />
            <div className={`pt-12 px-6 pb-4 flex items-center gap-4 border-b flex-shrink-0 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                <button onClick={onBack} className={`p-2 -ml-2 rounded-full transition-colors ${textSub}`}><ArrowLeft/></button>
                <h1 className={`text-lg font-medium ${textMain}`}>账号与安全</h1>
            </div>
            <div className="p-6">
                <div className={`rounded-2xl overflow-hidden border ${cardBg}`}>
                    <div className="flex items-center justify-between p-4 border-b border-white/5">
                        <span className={`text-sm ${textMain}`}>手机号</span>
                        <div className="flex items-center gap-2"><span className={`text-xs ${textSub}`}>138****8848</span><ChevronRight size={16} className={textSub}/></div>
                    </div>
                    <div className="flex items-center justify-between p-4">
                        <span className={`text-sm ${textMain}`}>声音锁</span>
                        <div className="flex items-center gap-2"><span className={`text-xs ${textSub}`}>未设置</span><ChevronRight size={16} className={textSub}/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const NotificationSettingsPage = ({ onBack }) => {
    const { theme } = useTheme();
    const [s, setS] = useState({ newMsg: true, sound: true });
    // 使用玻璃效果背景
    const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
    const cardBg = theme === 'dark' ? 'bg-[#151925]/80 border-white/5' : 'bg-white/60 border-slate-200 shadow-sm';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    return (
        <div className={`absolute inset-0 z-[70] flex flex-col animate-slide-in-right ${bgClass}`}>
            <StatusBar />
            <div className={`pt-12 px-6 pb-4 flex items-center gap-4 border-b flex-shrink-0 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                <button onClick={onBack} className={`p-2 -ml-2 rounded-full transition-colors ${textSub}`}><ArrowLeft/></button>
                <h1 className={`text-lg font-medium ${textMain}`}>消息通知</h1>
            </div>
            <div className="p-6">
                <div className={`rounded-2xl overflow-hidden border ${cardBg}`}>
                    <div className="flex items-center justify-between p-4 border-b border-white/5">
                        <span className={`text-sm ${textMain}`}>接收新消息通知</span>
                        <Toggle checked={s.newMsg} onChange={v=>setS({...s, newMsg: v})} />
                    </div>
                    <div className="flex items-center justify-between p-4">
                        <span className={`text-sm ${textMain}`}>声音</span>
                        <Toggle checked={s.sound} onChange={v=>setS({...s, sound: v})} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const PrivacySettingsPage = ({ onBack }) => {
    const { theme } = useTheme();
    const [s, setS] = useState({ verify: true });
    // 使用玻璃效果背景
    const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
    const cardBg = theme === 'dark' ? 'bg-[#151925]/80 border-white/5' : 'bg-white/60 border-slate-200 shadow-sm';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    return (
        <div className={`absolute inset-0 z-[70] flex flex-col animate-slide-in-right ${bgClass}`}>
            <StatusBar />
            <div className={`pt-12 px-6 pb-4 flex items-center gap-4 border-b flex-shrink-0 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                <button onClick={onBack} className={`p-2 -ml-2 rounded-full transition-colors ${textSub}`}><ArrowLeft/></button>
                <h1 className={`text-lg font-medium ${textMain}`}>隐私设置</h1>
            </div>
            <div className="p-6">
                <div className={`rounded-2xl overflow-hidden border ${cardBg}`}>
                    <div className="flex items-center justify-between p-4">
                        <span className={`text-sm ${textMain}`}>加我为好友时需要验证</span>
                        <Toggle checked={s.verify} onChange={v=>setS({...s, verify: v})} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const DisplaySettingsPage = ({ onBack }) => {
    const { theme, toggleTheme } = useTheme();
    // 使用玻璃效果背景
    const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    const cardBg = theme === 'dark' ? 'bg-[#151925]/80 border-white/5' : 'bg-white/60 border-slate-200 shadow-sm';

    return (
        <div className={`absolute inset-0 z-[70] flex flex-col animate-slide-in-right ${bgClass}`}>
            <StatusBar />
            <div className={`pt-12 px-6 pb-4 flex items-center gap-4 border-b flex-shrink-0 ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
                <button onClick={onBack} className={`p-2 -ml-2 rounded-full transition-colors ${textSub}`}><ArrowLeft/></button>
                <h1 className={`text-lg font-medium ${textMain}`}>显示与亮度</h1>
            </div>
            <div className="p-6">
                <h3 className={`text-xs font-medium mb-3 ml-2 ${textSub}`}>外观</h3>
                <div className={`rounded-2xl overflow-hidden border flex p-4 justify-between items-center mb-6 ${cardBg}`}>
                    <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => theme === 'dark' && toggleTheme()}>
                        <div className={`w-16 h-24 bg-slate-100 rounded-lg border-2 ${theme === 'light' ? 'border-indigo-500' : 'border-transparent'} relative`}>
                            {theme === 'light' && <div className="absolute bottom-1 right-1 bg-indigo-500 rounded-full p-0.5"><CheckCircle size={10} className="text-white"/></div>}
                        </div>
                        <span className={`text-xs ${theme === 'light' ? 'text-indigo-500 font-bold' : textSub}`}>浅色</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => theme === 'light' && toggleTheme()}>
                        <div className={`w-16 h-24 bg-slate-900 rounded-lg border-2 ${theme === 'dark' ? 'border-indigo-500' : 'border-transparent'} relative`}>
                            {theme === 'dark' && <div className="absolute bottom-1 right-1 bg-indigo-500 rounded-full p-0.5"><CheckCircle size={10} className="text-white"/></div>}
                        </div>
                        <span className={`text-xs ${theme === 'dark' ? 'text-indigo-500 font-bold' : textSub}`}>深色</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 opacity-50">
                        <div className="w-16 h-24 bg-gradient-to-br from-slate-100 to-slate-900 rounded-lg border-2 border-transparent"></div>
                        <span className={`text-xs ${textSub}`}>跟随系统</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DonationPage = ({ onBack }) => {
    const { theme } = useTheme();
    const [selectedAmount, setSelectedAmount] = useState(10);
    const [showThankYou, setShowThankYou] = useState(false);
    // 使用玻璃效果背景
    const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    const btnClass = theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white/50 border-slate-200 text-slate-600 shadow-sm';
    const btnActive = 'bg-indigo-600 border-indigo-600 text-white';

    const handleDonate = () => { setShowThankYou(true); setTimeout(() => { setShowThankYou(false); onBack(); }, 2000); };

    return (
        <div className={`absolute inset-0 z-[70] flex flex-col animate-slide-in-right ${bgClass}`}>
            <StatusBar />
            <div className={`pt-12 px-6 pb-4 flex items-center gap-4 border-b flex-shrink-0 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                <button onClick={onBack} className={`p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors ${textSub}`}><ArrowLeft /></button>
                <h1 className={`text-lg font-medium ${textMain}`}>打赏开发者</h1>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                {showThankYou ? (
                    <div className="flex flex-col items-center animate-zoom-in">
                        <Heart size={64} className="text-red-500 fill-current animate-pulse-soft mb-4" />
                        <h2 className={`text-2xl font-bold ${textMain} mb-2`}>感谢支持！</h2>
                    </div>
                ) : (
                    <>
                        <div className="w-24 h-24 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20"><Coffee size={40} className="text-white" /></div>
                        <h2 className={`text-xl font-bold ${textMain} mb-2`}>请我喝杯咖啡</h2>
                        <p className={`text-sm text-center mb-10 leading-relaxed ${textSub}`}>如果你喜欢频率 App，<br/>欢迎打赏支持我们的开发工作。</p>
                        <div className="grid grid-cols-3 gap-4 w-full mb-8">
                            {[5, 10, 50].map(amount => (
                                <button key={amount} onClick={() => setSelectedAmount(amount)} className={`py-4 rounded-xl border transition-all font-bold ${selectedAmount === amount ? btnActive : btnClass}`}>¥{amount}</button>
                            ))}
                        </div>
                        <button onClick={handleDonate} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"><CreditCard size={18} /> 立即支付 ¥{selectedAmount}</button>
                    </>
                )}
            </div>
        </div>
    )
}

const SettingsPage = ({ onBack, onNavigate }) => {
    const { theme } = useTheme();
    // 使用玻璃效果背景
    const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    const cardBg = theme === 'dark' ? 'bg-[#151925]/80 border-white/5' : 'bg-white/60 border-slate-200 shadow-sm';
    const borderClass = theme === 'dark' ? 'border-white/5' : 'border-slate-100';

    const settingGroups = [
        { title: "账号与安全", items: [{ icon: <User size={18} />, label: "个人资料设置", value: "", action: 'profile-settings' }, { icon: <Shield size={18} />, label: "账号安全中心", value: "已保护", action: 'account-security' }] },
        { title: "通用", items: [{ icon: <BellRing size={18} />, label: "消息通知", value: "", action: 'notification-settings' }, { icon: <Eye size={18} />, label: "隐私设置", value: "", action: 'privacy-settings' }, { icon: <Moon size={18} />, label: "显示与亮度", value: theme === 'dark' ? "深色" : "浅色", action: 'display-settings' }] },
        { title: "其他", items: [{ icon: <Coffee size={18} />, label: "打赏开发者", value: "", action: 'donation' }, { icon: <Info size={18} />, label: "关于频率", value: "v2.1.0", action: '' }] }
    ];

    return (
        <div className={`absolute inset-0 z-[60] flex flex-col animate-slide-in-right ${bgClass}`}>
            <StatusBar />
            <div className={`pt-12 px-6 pb-4 flex items-center gap-4 border-b flex-shrink-0 ${borderClass}`}>
                <button onClick={onBack} className={`p-2 -ml-2 rounded-full transition-colors ${textSub} hover:bg-white/10`}><ArrowLeft /></button>
                <h1 className={`text-lg font-medium ${textMain}`}>设置</h1>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {settingGroups.map((group, idx) => (
                    <div key={idx}>
                        <h3 className={`text-xs font-medium mb-3 ml-2 ${textSub}`}>{group.title}</h3>
                        <div className={`rounded-2xl overflow-hidden border ${cardBg}`}>
                            {group.items.map((item, itemIdx) => (
                                <div key={itemIdx} onClick={() => item.action && onNavigate(item.action)} className={`flex items-center justify-between p-4 transition-colors cursor-pointer ${itemIdx !== group.items.length - 1 ? `border-b ${borderClass}` : ''} active:opacity-70`}>
                                    <div className="flex items-center gap-3"><div className={textSub}>{item.icon}</div><span className={`text-sm ${textMain}`}>{item.label}</span></div>
                                    <div className="flex items-center gap-2"><span className={`text-xs ${textSub}`}>{item.value}</span><ChevronRight size={16} className={textSub}/></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button className={`w-full py-4 rounded-2xl border text-red-500 text-sm font-medium flex items-center justify-center gap-2 transition-colors mt-8 ${cardBg} active:scale-95`}><LogOut size={18} /> 退出登录</button>
            </div>
        </div>
    );
};

const ChatRoom = ({ onClose }) => {
    const { theme } = useTheme();
    // 使用玻璃效果背景
    const bgClass = theme === 'dark' ? 'page-glass-dark' : 'page-glass-light';
    const headerBg = theme === 'dark' ? 'bg-[#121623]/80 border-white/5' : 'bg-white/60 border-slate-200 shadow-sm';
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    const inputBg = theme === 'dark' ? 'bg-[#121623]/90 border-white/5' : 'bg-white/90 border-slate-200';
    const inputFieldBg = theme === 'dark' ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-800';

    const [messages, setMessages] = useState([
        { id: 1, text: 'Resonance Achieved.', type: 'system', time: '12:30' },
        { id: 2, text: '你好，你也喜欢在雨天听爵士吗？', type: 'other', time: '12:31' },
    ]);
    const [inputText, setInputText] = useState('');
    const [isGameModalOpen, setIsGameModalOpen] = useState(false);
    const [btnPos, setBtnPos] = useState({ x: 280, y: 550 });
    const [isDragging, setIsDragging] = useState(false);
    const dragDataRef = useRef({ startX: 0, startY: 0, initialBtnX: 0, initialBtnY: 0, containerWidth: 0, containerHeight: 0 });
    const [hasMoved, setHasMoved] = useState(false);
    const chatRoomRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (chatRoomRef.current) {
            const { width, height } = chatRoomRef.current.getBoundingClientRect();
            const initX = width - 70; 
            const initY = height - 140; 
            setBtnPos({ x: initX, y: initY });
        }
    }, []);

    const handleSend = () => {
        if(!inputText.trim()) return;
        setMessages(prev => [...prev, { id: Date.now(), text: inputText, type: 'me', time: '12:35' }]);
        setInputText('');
    }

    const handleIceBreaker = (type) => {
        setIsGameModalOpen(false);
        const msg = type === 'radio' ? '邀请你一同收听「雨夜巴士」电台...' : '发起了「默契二选一」挑战...';
        setMessages(prev => [...prev, { id: Date.now(), text: msg, type: 'system-action', time: '12:36' }]);
    }

    const handlePointerDown = (e) => {
        e.preventDefault(); e.stopPropagation();
        setIsDragging(true); setHasMoved(false); e.currentTarget.setPointerCapture(e.pointerId);
        if(chatRoomRef.current) {
            const rect = chatRoomRef.current.getBoundingClientRect();
            dragDataRef.current = { startX: e.clientX, startY: e.clientY, initialBtnX: btnPos.x, initialBtnY: btnPos.y, containerWidth: rect.width, containerHeight: rect.height };
        }
    };
    const handlePointerMove = (e) => {
        if (!isDragging) return;
        e.preventDefault(); e.stopPropagation();
        const { startX, startY, initialBtnX, initialBtnY, containerWidth, containerHeight } = dragDataRef.current;
        const dx = e.clientX - startX; const dy = e.clientY - startY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) setHasMoved(true);
        let newX = Math.max(10, Math.min(initialBtnX + dx, containerWidth - 66));
        let newY = Math.max(10, Math.min(initialBtnY + dy, containerHeight - 66));
        setBtnPos({ x: newX, y: newY });
    };
    const handlePointerUp = (e) => { 
        setIsDragging(false); 
        e.preventDefault(); 
        e.stopPropagation(); 
        e.currentTarget.releasePointerCapture(e.pointerId); 
        if (!hasMoved) setIsGameModalOpen(true); 
    };

    return (
        <div ref={chatRoomRef} className={`absolute inset-0 z-[90] flex flex-col overflow-hidden ${bgClass}`}>
            <div className={`pt-12 px-4 pb-4 flex items-center justify-between border-b shadow-sm ${headerBg}`}>
                <div className="flex items-center gap-3">
                    <button onClick={onClose}><ArrowLeft className={textSub} size={20}/></button>
                    <div className={`${textMain} font-medium`}>聊天界面</div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.type === 'me' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`px-4 py-2 rounded-xl text-sm ${msg.type === 'me' ? 'bg-indigo-600 text-white' : (msg.type==='system' ? 'bg-transparent text-slate-500 text-xs w-full text-center' : (theme==='dark'?'bg-white/10 text-slate-200':'bg-white shadow-sm text-slate-800'))}`}>
                           {msg.text}
                       </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            {/* 输入框 */}
            <div className={`p-4 border-t flex gap-2 ${inputBg}`}>
                <input 
                    className={`flex-1 rounded-full px-4 text-sm outline-none ${inputFieldBg}`} 
                    value={inputText} 
                    onChange={e=>setInputText(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="输入消息..."
                />
                <button onClick={handleSend} className="p-2 bg-indigo-600 rounded-full text-white"><Send size={18}/></button>
            </div>
            {/* 悬浮球 */}
            <div 
                className="absolute z-[100] cursor-grab active:cursor-grabbing"
                style={{ left: btnPos.x, top: btnPos.y, touchAction: 'none' }}
                onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}
            >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg border border-white/20">
                    <Activity className="text-white animate-pulse" />
                </div>
            </div>
            {isGameModalOpen && (
                <div className="absolute inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-end justify-center" onClick={()=>setIsGameModalOpen(false)}>
                    <div className={`w-full rounded-t-3xl p-6 ${theme==='dark'?'bg-[#1A1E2E]':'bg-white'}`} onClick={e=>e.stopPropagation()}>
                        <div className={`font-bold mb-4 ${textMain}`}>选择破冰游戏</div>
                        <div className="flex gap-4">
                            <button onClick={() => handleIceBreaker('radio')} className={`flex-1 h-20 rounded-xl flex flex-col items-center justify-center text-teal-400 ${theme==='dark'?'bg-white/5':'bg-slate-50'}`}>
                                <Radio className="mb-1"/> <span className="text-xs">同频电台</span>
                            </button>
                            <button onClick={() => handleIceBreaker('game')} className={`flex-1 h-20 rounded-xl flex flex-col items-center justify-center text-indigo-400 ${theme==='dark'?'bg-white/5':'bg-slate-50'}`}>
                                <Gamepad2 className="mb-1"/> <span className="text-xs">默契二选一</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

// --- 页面 1: 共鸣界面 ---
const ResonancePage = ({ onSignalMatch, onOpenEmit, onOpenSimilar }) => {
  const { theme } = useTheme();
  const moods = [
    { id: 'hyper', label: 'Hyper', icon: Zap, color: 'text-orange-400', bg: theme === 'dark' ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-100 border-orange-200', desc: '躁动 / 狂喜', glowColor: 'rgba(249, 115, 22, 0.4)' },
    { id: 'chill', label: 'Chill', icon: Coffee, color: 'text-teal-400', bg: theme === 'dark' ? 'bg-teal-500/10 border-teal-500/20' : 'bg-teal-100 border-teal-200', desc: '放空 / 惬意', glowColor: 'rgba(45, 212, 191, 0.4)' },
    { id: 'emo', label: 'Emo', icon: CloudRain, color: 'text-indigo-400', bg: theme === 'dark' ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-100 border-indigo-200', desc: '低落 / 抑郁', glowColor: 'rgba(99, 102, 241, 0.4)' },
  ];
  const cardClass = theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light';
  const textMain = theme === 'dark' ? 'text-slate-200' : 'text-slate-800';
  const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="flex-1 relative flex flex-col h-full overflow-y-auto no-scrollbar pb-4">
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-10" style={{ minHeight: '600px' }}>
        <div className="mb-8 text-center">
            <h1 className={`text-2xl font-light mb-2 tracking-[0.2em] ${textMain}`}>FREQUENCY</h1>
            <p className={`text-xs uppercase tracking-widest ${textSub}`}>Select your vibe</p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full aspect-square mb-8" style={{ maxWidth: '320px' }}>
          {moods.map((m) => (
            <button 
                key={m.id} 
                onClick={() => onSignalMatch(m.id)} 
                className={`relative rounded-3xl flex flex-col items-center justify-center gap-3 border transition-all duration-500 hover:scale-105 active:scale-95 ${m.bg}`} 
                style={{ boxShadow: `0 0 30px -10px ${m.glowColor}` }}
            >
                <m.icon size={32} className={`${m.color}`} style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                <div className="text-center">
                    <div className={`text-lg font-medium ${m.color}`}>{m.label}</div>
                    <div className={`mt-1 font-light text-[10px] ${textSub}`}>{m.desc}</div>
                </div>
            </button>
          ))}
          <button onClick={onOpenSimilar} className={`relative rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-500 hover:scale-105 active:scale-95 hover:bg-white/10 group ${cardClass}`}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Fingerprint size={28} className="text-white" />
              </div>
              <div className="text-center">
                <div className={`text-lg font-medium ${textMain}`}>Similar</div>
                <div className={`mt-1 font-light text-[10px] ${textSub}`}>我的相似频率</div>
              </div>
              <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]"></div>
          </button>
        </div>
        <div className="w-full animate-slide-up flex justify-center" style={{ maxWidth: '320px' }}>
             <button 
                onClick={onOpenEmit}
                className={`w-full h-24 rounded-[32px] flex items-center justify-between px-8 group transition-all relative overflow-hidden ${theme === 'dark' ? 'bg-slate-800/80 border-white/10 hover:bg-slate-800' : 'bg-white/80 border-white/40 hover:bg-white'} backdrop-blur-md border`}
                style={{ boxShadow: '0 10px 40px -10px rgba(99, 102, 241, 0.3)' }}
             >
                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="flex flex-col items-start relative z-10">
                     <span className={`text-xl font-bold tracking-wide transition-colors ${theme === 'dark' ? 'text-white group-hover:text-indigo-200' : 'text-slate-800 group-hover:text-indigo-600'}`}>发射我的频率</span>
                     <span className={`text-xs mt-1 ${textSub}`}>Broadcast Signal...</span>
                 </div>
                 <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform group-hover:shadow-indigo-500/50 relative z-10">
                     <Activity size={28} className="text-white" />
                 </div>
             </button>
        </div>
      </div>
    </div>
  );
};

// --- 页面 2: 密语列表 ---
const WhisperPage = ({ conversations, onChatSelect, onOpenSystemNotify, onDeleteConversation }) => {
    const { theme } = useTheme();
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [longPressId, setLongPressId] = useState(null);
    const timerRef = useRef(null);

    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    const itemBg = theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white/50 border-slate-100 shadow-sm';
    const menuBg = theme === 'dark' ? 'bg-[#1A1E2E] border-white/10' : 'bg-white/90 border-slate-200 shadow-xl backdrop-blur-lg';

    const handleTouchStart = (id) => { timerRef.current = setTimeout(() => { setLongPressId(id); }, 600); };
    const handleTouchEnd = () => { if (timerRef.current) clearTimeout(timerRef.current); };
    const toggleSelection = (id) => { if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(sid => sid !== id)); else setSelectedIds([...selectedIds, id]); };
    const handleDeleteSelected = () => { selectedIds.forEach(id => onDeleteConversation(id)); setIsSelectionMode(false); setSelectedIds([]); };
    const handleDeleteSingle = (id) => { onDeleteConversation(id); setLongPressId(null); };
    const handlePin = (id) => { setLongPressId(null); };

    return (
        <div className="flex-1 flex flex-col h-full">
            <StatusBar />
            <div className="pt-12 px-6 pb-4 flex items-center justify-between relative z-20 flex-shrink-0">
                <h1 className={`text-xl font-light tracking-wider ${textMain}`}>{isSelectionMode ? `已选择 ${selectedIds.length}` : '密语列表'}</h1>
                <div className="relative">
                    {isSelectionMode ? (
                        <button onClick={() => { setIsSelectionMode(false); setSelectedIds([]); }} className={`${textSub} text-sm`}>取消</button>
                    ) : (
                        <button onClick={() => setShowMenu(!showMenu)} className={`p-2 rounded-full hover:bg-white/10 transition-colors ${textSub}`}><MoreHorizontal size={20}/></button>
                    )}
                    {showMenu && (
                        <div className={`absolute right-0 top-10 w-36 rounded-xl overflow-hidden animate-zoom-in z-50 border ${menuBg}`}>
                            <button onClick={() => { onOpenSystemNotify(); setShowMenu(false); }} className={`w-full px-4 py-3 text-left text-xs ${textSub} hover:bg-indigo-500/10 hover:text-indigo-500 flex items-center gap-2`}><Bell size={14} /> 系统通知</button>
                            <button onClick={() => { setIsSelectionMode(true); setShowMenu(false); }} className={`w-full px-4 py-3 text-left text-xs ${textSub} hover:bg-indigo-500/10 hover:text-indigo-500 flex items-center gap-2`}><CheckCircle size={14} /> 批量管理</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="space-y-3 overflow-y-auto flex-1 px-6 pb-20 no-scrollbar relative" onClick={() => setShowMenu(false)}>
                {conversations.length === 0 && (
                    <div className={`flex flex-col items-center justify-center h-64 ${textSub}`}>
                        <Ghost size={48} className="mb-2 opacity-30"/>
                        <span className="text-xs">暂无密语，快去寻找共鸣吧</span>
                    </div>
                )}
                {conversations.map(conv => (
                    <div key={conv.id} className={`relative group p-4 rounded-2xl flex items-center gap-4 border transition-all overflow-hidden ${itemBg} ${conv.pinned ? (theme==='dark'?'bg-indigo-900/10 border-indigo-500/30':'bg-indigo-50 border-indigo-200') : ''} ${isSelectionMode ? 'pl-2' : ''}`} onClick={() => { if (isSelectionMode) toggleSelection(conv.id); else onChatSelect(conv); }} onTouchStart={() => !isSelectionMode && handleTouchStart(conv.id)} onTouchEnd={handleTouchEnd} onMouseDown={() => !isSelectionMode && handleTouchStart(conv.id)} onMouseUp={handleTouchEnd}>
                        {isSelectionMode && (<div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedIds.includes(conv.id) ? 'bg-indigo-500 border-indigo-500' : 'border-slate-400'}`}>{selectedIds.includes(conv.id) && <CheckCircle size={12} className="text-white"/>}</div>)}
                        <div className={`w-12 h-12 rounded-full ${conv.avatarColor} flex items-center justify-center text-xs font-bold shadow-md relative shrink-0 text-white`}>{conv.user.substring(0, 2)}</div>
                        <div className="flex-1 min-w-0"><div className="flex justify-between items-center mb-1"><span className={`font-medium text-sm ${textMain}`}>{conv.user}</span><span className={`text-[10px] ${textSub}`}>{conv.time}</span></div><p className={`text-xs truncate ${textSub}`}>{conv.pinned && <Pin size={10} className="inline mr-1 text-indigo-400 rotate-45"/>}{conv.lastMsg}</p></div>
                        {longPressId === conv.id && !isSelectionMode && (
                            <div className="absolute inset-0 bg-black/80 z-10 flex items-center justify-around px-8 animate-zoom-in backdrop-blur-sm rounded-2xl" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => handlePin(conv.id)} className="flex flex-col items-center gap-1 text-white"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Pin size={18}/></div><span className="text-[10px]">置顶</span></button>
                                <button onClick={() => setLongPressId(null)} className="flex flex-col items-center gap-1 text-slate-300"><div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><X size={18}/></div><span className="text-[10px]">取消</span></button>
                                <button onClick={() => handleDeleteSingle(conv.id)} className="flex flex-col items-center gap-1 text-red-400"><div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center"><Trash2 size={18}/></div><span className="text-[10px]">删除</span></button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {isSelectionMode && (<div className="absolute bottom-6 left-0 w-full flex justify-center z-30 animate-slide-up"><button onClick={handleDeleteSelected} disabled={selectedIds.length === 0} className="w-14 h-14 rounded-full bg-red-500 text-white shadow-lg flex items-center justify-center disabled:opacity-50 disabled:scale-90 transition-all active:scale-95"><Trash2 size={24} /></button></div>)}
        </div>
    )
}

// --- 页面 3: 个人主页 ---
const ProfilePage = ({ onViewResonance, onOpenFriendsList, onOpenSettings }) => {
    const { theme } = useTheme();
    const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
    const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
    const cardBg = theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white/50 border-slate-100 shadow-sm';
    // 个人主页底部区域也改为半透明玻璃
    const sectionBg = theme === 'dark' ? 'bg-[#121623]/80 backdrop-blur-xl' : 'bg-slate-50/70 backdrop-blur-xl';
    const mySignals = [
        { id: 1, date: '10分钟前', mood: 'bg-indigo-500', content: '加班后的便利店关门了...', isPrivate: false, views: 12, matchCount: 3 },
        { id: 2, date: '昨天 23:00', mood: 'bg-teal-400', content: '今天的天空是粉紫色的。', isPrivate: true, views: 0, matchCount: 0 },
        { id: 3, date: '11月02日', mood: 'bg-slate-600', content: '好累，想变成石头。', isPrivate: false, views: 45, matchCount: 8 },
        { id: 4, date: '10月31日', mood: 'bg-orange-500', content: '万圣节快乐！在街上看到了很多可爱的鬼怪。', isPrivate: false, views: 88, matchCount: 12 },
    ];

    return (
        <div className="flex-1 relative flex flex-col h-full">
            <StatusBar />
            <div className="flex-1 overflow-y-auto no-scrollbar relative w-full h-full">
                <div className="pt-16 px-6 mb-8">
                    <div className="flex items-center justify-end mb-6"><button onClick={onOpenSettings} className={`p-2 rounded-full transition-colors ${textSub} hover:bg-white/10`}><Settings size={24} /></button></div>
                     <div className="flex flex-col items-center"><div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 flex items-center justify-center mb-4 shadow-2xl relative"><span className="text-2xl font-light text-slate-400">Me</span></div><h2 className={`text-xl font-medium mb-6 ${textMain}`}>User_8848</h2><div className={`flex w-full justify-between px-8 py-4 rounded-2xl border ${cardBg}`}><button onClick={onOpenFriendsList} className="text-center group transition-transform active:scale-95"><div className="text-lg font-bold text-indigo-500">3</div><div className={`text-xs ${textSub}`}>已同频</div></button><div className="text-center"><div className={`text-lg font-bold ${textMain}`}>12</div><div className={`text-xs ${textSub}`}>发射总数</div></div><div className="text-center"><div className={`text-lg font-bold ${textMain}`}>22h</div><div className={`text-xs ${textSub}`}>共存时间</div></div></div></div>
                </div>
                <div className={`w-full rounded-t-[40px] p-6 min-h-[500px] ${sectionBg}`}>
                    <h3 className={`text-sm font-medium mb-6 flex items-center gap-2 ${textSub}`}><Activity size={14} className="text-indigo-500"/> 我的频率日志</h3>
                    <div className="space-y-6 relative border-l border-slate-500/20 ml-2 pl-6 pb-20">
                        {mySignals.map(signal => (
                            <div key={signal.id} className="relative group">
                                <div className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full ${signal.mood} border-2 ${theme === 'dark' ? 'border-[#121623]' : 'border-slate-50'}`}></div>
                                <div className="flex justify-between items-start mb-2"><span className={`text-xs font-mono ${textSub}`}>{signal.date}</span></div>
                                <p className={`text-sm leading-relaxed mb-3 ${textMain}`}>{signal.content}</p>
                                {!signal.isPrivate && signal.matchCount > 0 && (<button onClick={() => onViewResonance(signal)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors border ${theme === 'dark' ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white/50 border-slate-200 shadow-sm'}`}><div className="flex items-center gap-2"><div className="flex -space-x-2">{[...Array(Math.min(3, signal.matchCount))].map((_,i) => (<div key={i} className={`w-5 h-5 rounded-full border ${i%2===0 ? 'bg-indigo-500' : 'bg-teal-500'} ${theme === 'dark' ? 'border-[#121623]' : 'border-slate-50'}`}></div>))}</div><span className={`text-[10px] ${textSub}`}>收到 {signal.matchCount} 条共鸣留言</span></div><ChevronRight size={14} className={textSub}/></button>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ==========================================
// 6. 主控制器 (App) - 放在最后
// ==========================================
const App = () => {
  const [theme, setTheme] = useState('dark'); 
  const [activeTab, setActiveTab] = useState('resonance'); 
  const [modalView, setModalView] = useState(null); 
  const [selectedSignal, setSelectedSignal] = useState(null); 
  const [selectedFreq, setSelectedFreq] = useState(null); 
  const [conversations, setConversations] = useState([
      { id: 1, user: 'USER_9527', avatarColor: 'bg-teal-500', lastMsg: '你也喜欢在雨天听爵士吗？', time: '12:30', unread: true, pinned: false },
      { id: 2, user: 'Radio_Head', avatarColor: 'bg-indigo-600', lastMsg: '[分享了一首歌曲]', time: '04:15', unread: false, pinned: true },
  ]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const handleSendMessage = (text, type) => { if (type === 'full') setModalView('chat'); else setModalView(null); };
  const addConversation = (name, msg) => { setConversations([{ id: Date.now(), user: name, avatarColor: 'bg-orange-500', lastMsg: msg, time: '刚刚', unread: false, pinned: false }, ...conversations]); };
  const deleteConversation = (id) => { setConversations(conversations.filter(c => c.id !== id)); };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AppContainer>
        <div className="flex-1 relative flex flex-col overflow-hidden">
            {activeTab === 'resonance' && <ResonancePage onSignalMatch={(type) => setModalView('card')} onOpenEmit={() => setModalView('emit')} onOpenSimilar={() => setModalView('my-frequencies')} />}
            {activeTab === 'whisper' && <WhisperPage conversations={conversations} onChatSelect={() => setModalView('chat')} onOpenSystemNotify={() => setModalView('system-notify')} onDeleteConversation={deleteConversation} />}
            {activeTab === 'profile' && <ProfilePage onViewResonance={(signal) => { setSelectedSignal(signal); setModalView('resonance-list'); }} onOpenFriendsList={() => setModalView('friends-list')} onOpenSettings={() => setModalView('settings')} />}
        </div>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {modalView === 'card' && <RandomSignalCard type="random" onClose={() => setModalView(null)} onConnect={() => setModalView('chat')} />}
        {modalView === 'my-frequencies' && <MyFrequencyList onBack={() => setModalView(null)} onSelectFrequency={(item) => { setSelectedFreq(item); setModalView('similar-detail'); }} />}
        {modalView === 'similar-detail' && <SimilarDetailView onClose={() => setModalView('my-frequencies')} onConnect={() => { addConversation('Similar_Soul', 'Resonance Matched'); setModalView('chat'); }} />}
        {modalView === 'emit' && <EmissionModal onClose={() => setModalView(null)} />}
        {modalView === 'friends-list' && <FriendsListPage onBack={() => setModalView(null)} onChatStart={() => setModalView('chat')} />}
        {modalView === 'chat' && <ChatRoom onClose={() => setModalView(null)} />}
        {modalView === 'resonance-list' && selectedSignal && <ResonanceListPage signal={selectedSignal} onBack={() => setModalView(null)} onChatStart={() => setModalView('chat')} />}
        {modalView === 'system-notify' && <SystemNotifyPage onBack={() => setModalView(null)} />}
        {modalView === 'settings' && <SettingsPage onBack={() => setModalView(null)} onNavigate={(view) => setModalView(view)} />}
        {modalView === 'profile-settings' && <ProfileSettingsPage onBack={() => setModalView('settings')} />}
        {modalView === 'account-security' && <AccountSecurityPage onBack={() => setModalView('settings')} />}
        {modalView === 'notification-settings' && <NotificationSettingsPage onBack={() => setModalView('settings')} />}
        {modalView === 'privacy-settings' && <PrivacySettingsPage onBack={() => setModalView('settings')} />}
        {modalView === 'display-settings' && <DisplaySettingsPage onBack={() => setModalView('settings')} />}
        {modalView === 'donation' && <DonationPage onBack={() => setModalView('settings')} />}
        {modalView === 'chat-init-one-off' && <ChatInitiateModal type="one-off" onClose={() => setModalView(null)} onSend={(t) => handleSendMessage(t, 'one-off')} />}
        {modalView === 'chat-init-full' && <ChatInitiateModal type="full" onClose={() => setModalView(null)} onSend={(t) => handleSendMessage(t, 'full')} />}
      </AppContainer>
    </ThemeContext.Provider>
  );
};

export default App;