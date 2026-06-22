import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Terminal, Award, RotateCcw, Cpu, 
  CheckCircle2, AlertTriangle, Play, ArrowRight, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Web Audio API Sound Synthesizer
const playSynthSound = (type: 'click' | 'success' | 'error' | 'win') => {
  if (typeof window === 'undefined') return;
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  try {
    const ctx = new AudioContext();
    
    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'success') {
      // Ascending C-E-G-C chord
      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
      });
    } else if (type === 'error') {
      // Harsh buzzer sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'win') {
      // Arpeggio triumph chord
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.45);
      });
    }
  } catch (e) {
    console.error("Synthesizer error:", e);
  }
};

// Canvas-based Matrix rain for the success screen
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    
    // Set size
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789MARXLENIN';
    const alphabet = katakana.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 15, 20, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#10b981'; // emerald green
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-20" />;
};

interface PhilosophyGameProps {
  isOpen: boolean;
  onClose: () => void;
}

type GameStage = 'welcome' | 'stage1' | 'stage2' | 'stage3' | 'success' | 'gameover';

// Level 1: Dialectical Materialism Category Cards
interface CardItem {
  id: number;
  text: string;
  category: 'matter' | 'consciousness'; // matter: Vật chất quyết định, consciousness: Ý thức tác động
}

const level1Cards: CardItem[] = [
  { 
    id: 1, 
    text: "Thế giới khách quan tồn tại thực tế và độc lập với ý thức con người.", 
    category: 'matter' 
  },
  { 
    id: 2, 
    text: "Mọi suy nghĩ, tư duy đều phải dựa trên hoạt động vật chất của não bộ.", 
    category: 'matter' 
  },
  { 
    id: 3, 
    text: "Hoạt động thực tiễn (lao động, sản xuất) quyết định sự phát triển xã hội.", 
    category: 'matter' 
  },
  { 
    id: 4, 
    text: "Tri thức khoa học đúng đắn giúp con người cải tạo thế giới hiệu quả hơn.", 
    category: 'consciousness' 
  },
  { 
    id: 5, 
    text: "Quy hoạch kinh tế phù hợp tạo động lực to lớn cho sự phát triển của đất nước.", 
    category: 'consciousness' 
  },
  { 
    id: 6, 
    text: "Nghị lực và niềm tin của tập thể thúc đẩy vượt qua các rào cản địa hình khó khăn.", 
    category: 'consciousness' 
  }
];

// Level 2: Laws Matching
interface MatchPair {
  id: string;
  law: string;
  role: string;
  roleId: string;
}

const level2Pairs: MatchPair[] = [
  {
    id: 'l1',
    law: 'Quy luật chuyển hóa lượng - chất',
    role: 'Cách thức vận động, phát triển của sự vật hiện tượng',
    roleId: 'r1'
  },
  {
    id: 'l2',
    law: 'Quy luật thống nhất & đấu tranh của các mặt đối lập',
    role: 'Nguồn gốc, động lực bên trong của sự phát triển',
    roleId: 'r2'
  },
  {
    id: 'l3',
    law: 'Quy luật phủ định của phủ định',
    role: 'Khuynh hướng, chu kỳ xoáy ốc của sự phát triển',
    roleId: 'r3'
  }
];

// Level 3: Multiple Choice Questions
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

const level3Questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Một công ty công nghệ có thời gian lao động tất yếu để bù đắp lương (v) là 4 giờ, thời gian lao động thặng dư (m) là 4 giờ. Tính tỷ suất giá trị thặng dư (m') của công ty này?",
    options: [
      "50% - Tỷ suất bóc lột trung bình thấp",
      "100% - Tỷ suất tương ứng với m' = (4/4) * 100%",
      "200% - Tỷ suất bóc lột ở cường độ cao",
      "150% - Tỷ suất m' = (6/4) * 100%"
    ],
    correctAnswer: 1,
    hint: "Công thức tính tỷ suất giá trị thặng dư là: m' = (m / v) * 100%."
  },
  {
    id: 2,
    question: "Trong phương thức sản xuất của xã hội, yếu tố nào thường xuyên biến đổi, phát triển nhanh nhất và mang tính cách mạng nhất?",
    options: [
      "Quan hệ sản xuất (Ownership, distribution...)",
      "Lực lượng sản xuất (Workers, tools, technology...)",
      "Cơ sở hạ tầng (Economic foundation)",
      "Kiến trúc thượng tầng (State, laws, philosophy)"
    ],
    correctAnswer: 1,
    hint: "Yếu tố trực tiếp tác động vào tự nhiên và công cụ lao động là động lực cải tiến sản xuất đầu tiên."
  },
  {
    id: 3,
    question: "Phát biểu nào sau đây diễn tả chính xác mối quan hệ biện chứng giữa Cơ sở hạ tầng (CSHT) và Kiến trúc thượng tầng (KTTT)?",
    options: [
      "KTTT hoàn toàn thụ động trước sự biến đổi của CSHT.",
      "CSHT quyết định KTTT, đồng thời KTTT tác động tích cực hoặc tiêu cực trở lại CSHT.",
      "KTTT quyết định CSHT trong mọi thời đại và nền sản xuất.",
      "CSHT và KTTT song song độc lập, không ảnh hưởng qua lại."
    ],
    correctAnswer: 1,
    hint: "Kinh tế quyết định chính trị, nhưng chính trị có tác động định hướng lại hoặc kìm hãm phát triển kinh tế."
  }
];

interface LeaderboardEntry {
  id: string;
  codename: string;
  score: number;
  time: number;
  date: string;
  isPlayer?: boolean;
}

const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'd1', codename: 'Agent_Marx', score: 9200, time: 38.5, date: '2026-06-20' },
  { id: 'd2', codename: 'Agent_Lenin', score: 8950, time: 42.1, date: '2026-06-21' },
  { id: 'd3', codename: 'Light_AI_Buster', score: 8100, time: 55.0, date: '2026-06-22' },
  { id: 'd4', codename: 'Neo_Materialist', score: 7250, time: 68.4, date: '2026-06-22' },
  { id: 'd5', codename: 'PhilosophyGeek', score: 6100, time: 85.2, date: '2026-06-22' }
];

const getLeaderboardData = (): LeaderboardEntry[] => {
  if (typeof window === 'undefined') return DEFAULT_LEADERBOARD;
  const stored = localStorage.getItem('philosophy_leaderboard');
  if (!stored) {
    localStorage.setItem('philosophy_leaderboard', JSON.stringify(DEFAULT_LEADERBOARD));
    return DEFAULT_LEADERBOARD;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_LEADERBOARD;
  }
};

const saveLeaderboardData = (data: LeaderboardEntry[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('philosophy_leaderboard', JSON.stringify(data));
};

export function PhilosophyGame({ isOpen, onClose }: PhilosophyGameProps) {
  const [stage, setStage] = useState<GameStage>('welcome');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  
  // Game state variables
  // Stage 1
  const [s1ActiveCard, setS1ActiveCard] = useState<CardItem | null>(null);
  const [s1SortedMatter, setS1SortedMatter] = useState<CardItem[]>([]);
  const [s1SortedConscious, setS1SortedConscious] = useState<CardItem[]>([]);
  const [s1Remaining, setS1Remaining] = useState<CardItem[]>(level1Cards);
  const [s1ErrorMsg, setS1ErrorMsg] = useState<string>('');

  // Stage 2
  const [s2SelectedLaw, setS2SelectedLaw] = useState<string | null>(null);
  const [s2SelectedRole, setS2SelectedRole] = useState<string | null>(null);
  const [s2MatchedPairs, setS2MatchedPairs] = useState<string[]>([]); // list of law ids matched
  const [s2Error, setS2Error] = useState<boolean>(false);

  // Stage 3
  const [s3QuestionIndex, setS3QuestionIndex] = useState<number>(0);
  const [s3SelectedOption, setS3SelectedOption] = useState<number | null>(null);
  const [s3ShowResult, setS3ShowResult] = useState<boolean>(false);
  const [s3Attempts, setS3Attempts] = useState<number>(3); // health

  // Scoring and Leaderboard State variables
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [playerCodename, setPlayerCodename] = useState<string>('');
  const [isScoreSubmitted, setIsScoreSubmitted] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);
  const [finalTime, setFinalTime] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const logsEndRef = useRef<HTMLDivElement | null>(null);

  // Log messages handler
  const addLog = (message: string) => {
    setConsoleLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  // Timer ticking effect
  useEffect(() => {
    let interval: any;
    if (stage === 'stage1' || stage === 'stage2' || stage === 'stage3') {
      if (!startTime) {
        setStartTime(Date.now());
      }
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 0.1);
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stage, startTime]);

  useEffect(() => {
    if (isOpen) {
      setStage('welcome');
      setConsoleLogs([]);
      addLog("Hệ thống Mật Mã Biện Chứng khởi động...");
      addLog("Đang kiểm tra bảo mật của Trí tuệ Nhân tạo Light AI...");
      addLog("CẢNH BÁO: Lõi Logic của Light AI đang bị quá tải do mâu thuẫn nhận thức.");
      addLog("Yêu cầu Đặc vụ kết nối bộ lọc Triết học Mác - Lênin để gỡ lỗi!");
      
      // Reset variables
      setS1Remaining(level1Cards);
      setS1SortedMatter([]);
      setS1SortedConscious([]);
      setS1ActiveCard(null);

      setS2MatchedPairs([]);
      setS2SelectedLaw(null);
      setS2SelectedRole(null);

      setS3QuestionIndex(0);
      setS3SelectedOption(null);
      setS3ShowResult(false);
      setS3Attempts(3);

      // Reset leaderboard & timer variables
      setStartTime(null);
      setElapsedTime(0);
      setErrorCount(0);
      setPlayerCodename('');
      setIsScoreSubmitted(false);
      setShowLeaderboard(false);
      setFinalScore(0);
      setFinalTime(0);
      setLeaderboard(getLeaderboardData());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartGame = () => {
    playSynthSound('click');
    setStage('stage1');
    addLog("=== BẮT ĐẦU CỔNG DỮ LIỆU PHÂN TÍCH: DIỆT BIỆN CHỨNG ===");
    addLog("Thử thách 1: Phân loại cơ sở Vật chất & Ý thức. Hãy sắp xếp các mệnh đề sau.");
  };

  // STAGE 1: CARD SORTING HANDLER
  const handleSelectCardS1 = (card: CardItem) => {
    playSynthSound('click');
    setS1ActiveCard(card);
    setS1ErrorMsg('');
  };

  const handleSortS1 = (targetCategory: 'matter' | 'consciousness') => {
    if (!s1ActiveCard) {
      setS1ErrorMsg('Vui lòng chọn 1 mệnh đề trước!');
      playSynthSound('error');
      return;
    }

    if (s1ActiveCard.category === targetCategory) {
      playSynthSound('success');
      if (targetCategory === 'matter') {
        setS1SortedMatter((prev) => [...prev, s1ActiveCard]);
      } else {
        setS1SortedConscious((prev) => [...prev, s1ActiveCard]);
      }
      setS1Remaining((prev) => prev.filter(c => c.id !== s1ActiveCard.id));
      addLog(`Chính xác: Mệnh đề "${s1ActiveCard.text.slice(0, 25)}..." đã xếp đúng danh mục.`);
      
      // Check win stage 1
      if (s1Remaining.length === 1) {
        // Since s1Remaining will become empty after state update
        addLog("Thử thách 1 hoàn tất! Tải lõi triết học Quy luật Biện chứng...");
        setTimeout(() => {
          playSynthSound('win');
          setStage('stage2');
          addLog("=== BẮT ĐẦU CỔNG DỮ LIỆU PHÂN TÍCH: BA QUY LUẬT ===");
          addLog("Thử thách 2: Ghép nối 3 Quy luật cốt lõi với Vai trò/Cách thức phát triển.");
        }, 1200);
      }
    } else {
      playSynthSound('error');
      setErrorCount((prev) => prev + 1);
      setS1ErrorMsg(`Phân tích lỗi: Mệnh đề không thuộc nhóm ${targetCategory === 'matter' ? 'Vật chất quyết định' : 'Ý thức tác động ngược lại'}. Thử lại!`);
      addLog(`Thất bại: Mệnh đề "${s1ActiveCard.text.slice(0, 20)}..." xếp sai danh mục.`);
    }
    setS1ActiveCard(null);
  };

  // STAGE 2: MATCHING HANDLER
  const handleSelectLawS2 = (lawId: string) => {
    if (s2MatchedPairs.includes(lawId)) return;
    playSynthSound('click');
    setS2SelectedLaw(lawId);
    setS2Error(false);
    
    // Auto evaluate if role is already selected
    if (s2SelectedRole) {
      evaluateMatchS2(lawId, s2SelectedRole);
    }
  };

  const handleSelectRoleS2 = (roleId: string) => {
    // Check if roleId is already matched
    const isMatched = level2Pairs.some(p => p.roleId === roleId && s2MatchedPairs.includes(p.id));
    if (isMatched) return;
    
    playSynthSound('click');
    setS2SelectedRole(roleId);
    setS2Error(false);

    // Auto evaluate if law is already selected
    if (s2SelectedLaw) {
      evaluateMatchS2(s2SelectedLaw, roleId);
    }
  };

  const evaluateMatchS2 = (lawId: string, roleId: string) => {
    const correctPair = level2Pairs.find(p => p.id === lawId && p.roleId === roleId);
    if (correctPair) {
      playSynthSound('success');
      setS2MatchedPairs((prev) => [...prev, lawId]);
      addLog(`Ghép nối thành công: ${correctPair.law} -> ${correctPair.role.slice(0, 25)}...`);
      
      // Clear selections
      setS2SelectedLaw(null);
      setS2SelectedRole(null);

      // Check win stage 2
      if (s2MatchedPairs.length + 1 === level2Pairs.length) {
        addLog("Thử thách 2 hoàn tất! Đang kết nối tường lửa logic cuối cùng...");
        setTimeout(() => {
          playSynthSound('win');
          setStage('stage3');
          addLog("=== BẮT ĐẦU CỔNG DỮ LIỆU PHÂN TÍCH: DUY VẬT LỊCH SỬ & KINH TẾ ===");
          addLog("Thử thách 3: Trả lời 3 câu hỏi trắc nghiệm để giải mã hệ thống.");
        }, 1200);
      }
    } else {
      playSynthSound('error');
      setErrorCount((prev) => prev + 1);
      setS2Error(true);
      addLog(`Khớp lệnh sai: Khối logic bị từ chối kết nối.`);
      setTimeout(() => {
        setS2SelectedLaw(null);
        setS2SelectedRole(null);
        setS2Error(false);
      }, 1000);
    }
  };

  // STAGE 3: MULTIPLE CHOICE HANDLER
  const handleSelectOptionS3 = (idx: number) => {
    if (s3ShowResult) return;
    playSynthSound('click');
    setS3SelectedOption(idx);
  };

  const handleNextS3 = () => {
    playSynthSound('click');
    const currentQ = level3Questions[s3QuestionIndex];
    if (s3SelectedOption === null) return;

    if (s3SelectedOption === currentQ.correctAnswer) {
      playSynthSound('success');
      addLog(`Câu hỏi ${s3QuestionIndex + 1}: Chấp nhận đáp án. Mở khóa 33% tường lửa.`);
      
      if (s3QuestionIndex + 1 < level3Questions.length) {
        setS3QuestionIndex(prev => prev + 1);
        setS3SelectedOption(null);
      } else {
        // WIN GAME!
        const totalTime = Number(elapsedTime.toFixed(1));
        setFinalTime(totalTime);
        const computedScore = Math.max(0, 10000 - Math.floor(totalTime * 20) - (errorCount * 250) + (s3Attempts * 500));
        setFinalScore(computedScore);

        addLog("QUÁ TRÌNH GỠ LỖI HOÀN TẤT 100%!");
        addLog(`Kết quả: Thời gian ${totalTime}s, Lỗi: ${errorCount}, Mạng: ${s3Attempts}`);
        addLog(`Điểm số đạt được: ${computedScore} ĐIỂM.`);
        addLog("Lõi Logic Light AI được khôi phục thành công.");
        setTimeout(() => {
          playSynthSound('win');
          setStage('success');
        }, 1000);
      }
    } else {
      playSynthSound('error');
      setErrorCount((prev) => prev + 1);
      const newAttempts = s3Attempts - 1;
      setS3Attempts(newAttempts);
      addLog(`Câu hỏi ${s3QuestionIndex + 1}: Sai lệch dữ liệu! Lõi AI quá tải.`);

      if (newAttempts <= 0) {
        setStage('gameover');
        addLog("LỖI HỆ THỐNG: Lõi Logic sụp đổ! Kết nối thất bại.");
      } else {
        setS3ShowResult(true);
      }
    }
  };

  const handleRetryQuestionS3 = () => {
    playSynthSound('click');
    setS3SelectedOption(null);
    setS3ShowResult(false);
  };

  const handleRestartAll = () => {
    playSynthSound('click');
    setStage('welcome');
  };

  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerCodename.trim()) return;

    playSynthSound('success');
    const newEntry: LeaderboardEntry = {
      id: `player_${Date.now()}`,
      codename: playerCodename.trim(),
      score: finalScore,
      time: finalTime,
      date: new Date().toISOString().split('T')[0],
      isPlayer: true
    };

    const currentLeaderboard = getLeaderboardData();
    const sanitizedLeaderboard = currentLeaderboard.map(item => ({ ...item, isPlayer: false }));
    const updated = [...sanitizedLeaderboard, newEntry].sort((a, b) => b.score - a.score || a.time - b.time);
    
    saveLeaderboardData(updated);
    setLeaderboard(updated);
    setIsScoreSubmitted(true);
    setShowLeaderboard(true);
    addLog(`Đã gửi điểm đặc vụ thành công: ${playerCodename.trim()} - ${finalScore} điểm.`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 md:p-6 overflow-hidden">
      {/* Sound synthesized hum - simulated using CSS scanline background for CRT look */}
      <div className="absolute inset-0 pointer-events-none z-[110] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] animate-pulse" />

      {/* Main Terminal Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl h-[95vh] md:h-[85vh] rounded-lg border flex flex-col overflow-hidden text-emerald-400 font-mono shadow-[0_0_50px_rgba(16,185,129,0.15)] bg-[#0d141c]"
        style={{ borderColor: 'var(--steam-border)' }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111923] border-b shrink-0" style={{ borderColor: 'var(--steam-border)' }}>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400 animate-spin-slow" />
            <span className="text-sm font-semibold tracking-wider uppercase text-emerald-400/90">
              Cổng Giải Mã Triết Học Mác - Lênin // AI-Lobby-V0.8
            </span>
          </div>
          <button 
            onClick={() => { playSynthSound('click'); onClose(); }}
            className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout Split: Left console logs / Right gameplay area */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          
          {/* Left Console Logs Sidebar */}
          <div className="w-full md:w-80 bg-[#080d13] border-b md:border-b-0 md:border-r flex flex-col p-4 shrink-0" style={{ borderColor: 'var(--steam-border)' }}>
            <div className="flex items-center gap-1.5 mb-2 text-xs text-emerald-500 font-bold border-b border-emerald-500/20 pb-1 uppercase">
              <Terminal className="w-3.5 h-3.5" />
              <span>Nhật ký Lõi Logic (System Logs)</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 text-[11px] leading-relaxed scrollbar-thin scrollbar-thumb-emerald-500/20 max-h-[140px] md:max-h-none">
              {consoleLogs.map((log, index) => (
                <div key={index} className="opacity-80">
                  <span className="text-emerald-600">✓</span> {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
            {stage !== 'welcome' && stage !== 'success' && stage !== 'gameover' && (
              <div className="mt-3 pt-2 border-t border-emerald-500/20 text-xs space-y-2 text-emerald-500/80">
                <div className="flex justify-between items-center">
                  <span>Trạng thái: </span>
                  <span className="font-bold text-emerald-400 uppercase">
                    {stage === 'stage1' ? 'Vật chất & Ý thức' : stage === 'stage2' ? 'Ghép Quy luật' : 'Câu hỏi Tối hậu'}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-emerald-500/10 pt-1.5">
                  <span>Thời gian:</span>
                  <span className="font-mono text-white font-bold text-sm tracking-wide animate-pulse">
                    {elapsedTime.toFixed(1)}s
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-emerald-500/10 pt-1.5">
                  <span>Lỗi phân tích:</span>
                  <span className={`font-mono font-bold text-xs ${errorCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {errorCount}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Play Area */}
          <div className="flex-1 relative flex flex-col bg-[#0b1016] p-4 md:p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              
              {/* WELCOME STATE */}
              {stage === 'welcome' && (
                <motion.div 
                  key="welcome"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center text-center h-full max-w-xl mx-auto space-y-6"
                >
                  {showLeaderboard ? (
                    <div className="w-full bg-[#080d12]/95 border border-emerald-500/30 rounded p-4 text-emerald-400 space-y-4 shadow-[0_0_20px_rgba(16,185,129,0.1)] relative z-10 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/20">
                      <div className="text-xs border-b border-emerald-500/20 pb-2 font-bold uppercase tracking-wider text-center text-white">
                        BẢNG XẾP HẠNG ĐẶC VỤ GIẢI MÃ
                      </div>
                      
                      <table className="w-full text-xs text-left font-mono">
                        <thead>
                          <tr className="border-b border-emerald-500/20 text-emerald-500">
                            <th className="py-1 px-1 text-center">HẠNG</th>
                            <th className="py-1 px-2">MẬT DANH</th>
                            <th className="py-1 px-2 text-right">THỜI GIAN</th>
                            <th className="py-1 px-2 text-right">ĐIỂM SỐ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboard.slice(0, 10).map((entry, idx) => (
                            <tr key={entry.id} className="border-b border-emerald-500/10 last:border-0 hover:bg-emerald-500/5 text-emerald-400/90">
                              <td className="py-1.5 px-1 text-center font-bold">
                                {idx === 0 ? '🏆 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : idx + 1}
                              </td>
                              <td className="py-1.5 px-2 truncate max-w-[120px] text-emerald-300">
                                {entry.codename}
                              </td>
                              <td className="py-1.5 px-2 text-right">{entry.time.toFixed(1)}s</td>
                              <td className="py-1.5 px-2 text-right text-yellow-400 font-bold">
                                {entry.score.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      <button
                        onClick={() => { playSynthSound('click'); setShowLeaderboard(false); }}
                        className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded text-xs font-bold uppercase transition-colors"
                      >
                        Quay lại Trình Welcome
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-pulse">
                        <Cpu className="w-10 h-10 text-emerald-400" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-white">MẬT MÃ BIỆN CHỨNG: CHỐNG CHỈ ĐỊNH LOGIC</h2>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          Lõi xử lý của siêu máy tính Light AI đang bị ngập trong các vòng lặp nghịch lý logic. Để khởi động lại hệ thống, bạn cần vượt qua 3 tường lửa xác thực đại diện cho các nguyên lý tối cao của **Triết học Mác - Lênin**.
                        </p>
                      </div>

                      <div className="w-full text-left bg-emerald-950/20 border border-emerald-500/20 rounded p-4 text-xs text-emerald-400/90 space-y-1">
                        <div className="font-semibold text-white mb-1 uppercase">Các giao diện gỡ lỗi cần vượt qua:</div>
                        <div>1. Phân định lưỡng cực: Vật chất quyết định hay Ý thức phản hồi.</div>
                        <div>2. Ma trận kết nối: Ghép Quy luật Biện chứng với hình thức vận động.</div>
                        <div>3. Bẻ khóa Kinh tế chính trị: Tính toán Giá trị thặng dư & Quy luật CSHT/KTTT.</div>
                      </div>

                      <div className="flex gap-3 w-full">
                        <button
                          onClick={handleStartGame}
                          className="flex-1 px-6 py-3 rounded text-base font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        >
                          <Play className="w-5 h-5 fill-current" />
                          <span>Nạp Tác Vụ</span>
                        </button>
                        <button
                          onClick={() => { playSynthSound('click'); setShowLeaderboard(true); }}
                          className="flex-1 px-4 py-3 rounded text-xs font-bold border border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.02]"
                        >
                          <Award className="w-4 h-4" />
                          <span>Bảng Xếp Hạng</span>
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* STAGE 1: MATTER VS CONSCIOUSNESS SORTING */}
              {stage === 'stage1' && (
                <motion.div 
                  key="stage1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full space-y-4"
                >
                  <div className="border border-emerald-500/20 bg-emerald-950/10 p-3 rounded text-xs leading-relaxed text-emerald-400">
                    <span className="font-bold uppercase text-white block mb-1">Thử thách 1: Phân định vật chất và ý thức</span>
                    Chọn các mệnh đề triết học phía dưới, sau đó xếp chúng vào cột <span className="font-bold text-white">Vật chất quyết định</span> hoặc cột <span className="font-bold text-white">Ý thức tác động ngược</span>. Xếp đúng tất cả 6 mệnh đề để mở khóa tiếp.
                  </div>

                  {s1ErrorMsg && (
                    <div className="bg-red-950/20 border border-red-500/30 text-red-400 text-xs p-2.5 rounded flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{s1ErrorMsg}</span>
                    </div>
                  )}

                  {/* Core Sorting Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    
                    {/* Left Column: Matter */}
                    <div className="rounded border border-emerald-500/20 bg-[#080d12] p-3 flex flex-col">
                      <div className="text-center font-bold text-xs uppercase tracking-wider text-white border-b border-emerald-500/20 pb-2 mb-3">
                        VẬT CHẤT QUYẾT ĐỊNH
                      </div>
                      <div className="flex-1 space-y-2 overflow-y-auto max-h-[140px] md:max-h-none">
                        {s1SortedMatter.map((card) => (
                          <div key={card.id} className="p-2.5 rounded border border-emerald-500/30 bg-emerald-500/5 text-xs">
                            {card.text}
                          </div>
                        ))}
                        {s1SortedMatter.length === 0 && (
                          <div className="h-full flex items-center justify-center text-xs text-gray-500 italic py-6">
                            Chưa có dữ liệu...
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleSortS1('matter')}
                        disabled={!s1ActiveCard}
                        className="mt-3 w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 disabled:opacity-30 border border-emerald-500/30 rounded text-xs font-bold uppercase transition-colors"
                      >
                        Đưa vào Cột Vật chất
                      </button>
                    </div>

                    {/* Right Column: Consciousness */}
                    <div className="rounded border border-cyan-500/20 bg-[#080d12] p-3 flex flex-col">
                      <div className="text-center font-bold text-xs uppercase tracking-wider text-white border-b border-cyan-500/20 pb-2 mb-3">
                        Ý THỨC TÁC ĐỘNG NGƯỢC
                      </div>
                      <div className="flex-1 space-y-2 overflow-y-auto max-h-[140px] md:max-h-none">
                        {s1SortedConscious.map((card) => (
                          <div key={card.id} className="p-2.5 rounded border border-cyan-500/30 bg-cyan-500/5 text-xs text-cyan-400">
                            {card.text}
                          </div>
                        ))}
                        {s1SortedConscious.length === 0 && (
                          <div className="h-full flex items-center justify-center text-xs text-gray-500 italic py-6">
                            Chưa có dữ liệu...
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleSortS1('consciousness')}
                        disabled={!s1ActiveCard}
                        className="mt-3 w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 disabled:opacity-30 border border-cyan-500/30 rounded text-xs font-bold uppercase text-cyan-400 transition-colors"
                      >
                        Đưa vào Cột Ý thức
                      </button>
                    </div>

                  </div>

                  {/* Remaining cards pool */}
                  <div className="bg-[#080d12] border border-emerald-500/20 rounded p-3 shrink-0">
                    <div className="text-xs text-gray-400 font-bold mb-2 uppercase">Mệnh đề cần phân tích ({s1Remaining.length}):</div>
                    <div className="flex flex-wrap gap-2">
                      {s1Remaining.map((card) => (
                        <button
                          key={card.id}
                          onClick={() => handleSelectCardS1(card)}
                          className={`p-2.5 rounded border text-xs text-left max-w-sm transition-all ${
                            s1ActiveCard?.id === card.id 
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
                            : 'bg-emerald-950/10 border-emerald-500/20 text-emerald-400/90 hover:border-emerald-500/50 hover:bg-emerald-500/5'
                          }`}
                        >
                          {card.text}
                        </button>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}

              {/* STAGE 2: LAW MATCHING */}
              {stage === 'stage2' && (
                <motion.div 
                  key="stage2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full space-y-4"
                >
                  <div className="border border-emerald-500/20 bg-emerald-950/10 p-3 rounded text-xs leading-relaxed text-emerald-400">
                    <span className="font-bold uppercase text-white block mb-1">Thử thách 2: Thiết lập kết nối các quy luật</span>
                    Ghép nối 3 Quy luật biện chứng (bên trái) với đúng bản chất/vị trí phát triển của chúng (bên phải). Click chọn một Quy luật bên trái, sau đó chọn một Bản chất bên phải.
                  </div>

                  {/* Grid layout for matching */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 items-center">
                    
                    {/* Left Column: Laws */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">QUY LUẬT BIỆN CHỨNG</div>
                      {level2Pairs.map((pair) => {
                        const isMatched = s2MatchedPairs.includes(pair.id);
                        const isSelected = s2SelectedLaw === pair.id;
                        return (
                          <button
                            key={pair.id}
                            disabled={isMatched}
                            onClick={() => handleSelectLawS2(pair.id)}
                            className={`w-full p-4 rounded text-left text-xs border transition-all flex items-center justify-between ${
                              isMatched 
                              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 opacity-70' 
                              : isSelected
                              ? 'bg-emerald-500/10 border-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                              : s2Error && s2SelectedLaw === pair.id
                              ? 'bg-red-950/20 border-red-500 text-red-400 animate-shake'
                              : 'bg-[#080d12] border-emerald-500/20 text-emerald-400 hover:border-emerald-500/50'
                            }`}
                          >
                            <span className="font-semibold">{pair.law}</span>
                            {isMatched ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border border-emerald-500/40" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Column: Roles */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">BẢN CHẤT / VAI TRÒ</div>
                      {level2Pairs.map((pair) => {
                        // Check if role is matched
                        const isMatched = s2MatchedPairs.includes(pair.id);
                        const isSelected = s2SelectedRole === pair.roleId;
                        return (
                          <button
                            key={pair.roleId}
                            disabled={isMatched}
                            onClick={() => handleSelectRoleS2(pair.roleId)}
                            className={`w-full p-4 rounded text-left text-xs border transition-all flex items-center justify-between ${
                              isMatched 
                              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 opacity-70' 
                              : isSelected
                              ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                              : s2Error && s2SelectedRole === pair.roleId
                              ? 'bg-red-950/20 border-red-500 text-red-400 animate-shake'
                              : 'bg-[#080d12] border-cyan-500/20 text-cyan-400 hover:border-cyan-500/50'
                            }`}
                          >
                            <span>{pair.role}</span>
                            {isMatched ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border border-cyan-500/40" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                  </div>

                  {s2Error && (
                    <div className="bg-red-950/20 border border-red-500/30 text-red-400 text-xs p-2.5 rounded text-center animate-pulse">
                      Xung đột logic! Các liên kết không tương thích. Vui lòng liên kết lại.
                    </div>
                  )}

                </motion.div>
              )}

              {/* STAGE 3: MULTIPLE CHOICE */}
              {stage === 'stage3' && (
                <motion.div 
                  key="stage3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full space-y-4"
                >
                  {/* Status Indicator */}
                  <div className="flex justify-between items-center border border-emerald-500/20 bg-emerald-950/10 p-3 rounded text-xs">
                    <span className="text-emerald-400">
                      Tường lửa cuối cùng: <span className="font-bold text-white">Bẻ khóa Logic Hệ thống ({s3QuestionIndex + 1}/3)</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <span>Cơ năng Lõi: </span>
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2.5 h-2.5 rounded-full ${
                            idx < s3Attempts ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]' : 'bg-red-950 border border-red-500/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question box */}
                  <div className="bg-[#080d12] border border-emerald-500/20 rounded p-5 space-y-4 flex-1 justify-center flex flex-col">
                    <div className="text-sm font-semibold leading-relaxed text-white">
                      {level3Questions[s3QuestionIndex].question}
                    </div>

                    {/* Options list */}
                    <div className="space-y-2">
                      {level3Questions[s3QuestionIndex].options.map((opt, idx) => {
                        const isSelected = s3SelectedOption === idx;
                        return (
                          <button
                            key={idx}
                            disabled={s3ShowResult}
                            onClick={() => handleSelectOptionS3(idx)}
                            className={`w-full p-3 rounded text-left text-xs border transition-all flex items-center gap-3 ${
                              isSelected
                              ? 'bg-emerald-500/10 border-emerald-400 text-white shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                              : 'bg-emerald-950/5 border-emerald-500/10 text-emerald-400/90 hover:bg-emerald-500/5 hover:border-emerald-500/30'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full border border-emerald-500/30 flex items-center justify-center shrink-0 text-[10px]">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Answer response alerts */}
                  {s3ShowResult ? (
                    <div className="bg-red-950/30 border border-red-500/30 text-red-400 text-xs p-3 rounded space-y-2">
                      <div className="font-bold flex items-center gap-2 text-white">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span>Kích hoạt tự vệ hệ thống: Lỗi logic</span>
                      </div>
                      <p>Bạn đã đưa ra đáp án không chuẩn xác. Hãy lưu ý gợi ý sau để nạp lại:</p>
                      <p className="italic text-gray-300">"{level3Questions[s3QuestionIndex].hint}"</p>
                      <button
                        onClick={handleRetryQuestionS3}
                        className="px-4 py-1.5 bg-red-950 border border-red-500 text-red-400 hover:bg-red-900/40 rounded text-xs font-bold uppercase transition-colors"
                      >
                        Chạy lại đoạn mã gợi ý
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleNextS3}
                      disabled={s3SelectedOption === null}
                      className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-black font-bold uppercase tracking-wider rounded text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Xác minh Logic Mệnh đề</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                </motion.div>
              )}

              {/* SUCCESS STATE */}
              {stage === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex flex-col items-center justify-center text-center h-full max-w-xl mx-auto space-y-6"
                >
                  <MatrixRain />

                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse">
                    <Award className="w-10 h-10 text-emerald-400" />
                  </div>

                  <div className="space-y-2 z-10">
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase text-emerald-400">GIẢI MÃ THÀNH CÔNG!</h2>
                    <p className="text-xs text-gray-400">
                      Tất cả các tường lửa triết học biện chứng đã hoạt động tốt. Hệ điều hành chính đã được khôi phục về trạng thái cân bằng.
                    </p>
                  </div>

                  {/* Conditional: Certificate vs Leaderboard */}
                  {!showLeaderboard ? (
                    <div className="w-full bg-[#080d12]/95 border border-emerald-500/30 rounded p-6 text-emerald-400 space-y-4 shadow-[0_0_20px_rgba(16,185,129,0.1)] relative z-10">
                      <div className="text-xs border-b border-emerald-500/20 pb-2 font-bold uppercase tracking-wider text-center text-white">
                        CHỨNG CHỈ XÁC THỰC LOGIC TRIẾT HỌC MÁC-LÊNIN
                      </div>
                      
                      <div className="text-xs space-y-2 text-left">
                        <div className="flex justify-between">
                          <span className="text-emerald-600">ĐẶC VỤ GIẢI MÃ:</span>
                          <span className="text-white font-bold uppercase">{playerCodename.trim() || "AI DECRYPTION AGENT"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-emerald-600">PHƯƠNG PHÁP LUẬN:</span>
                          <span className="text-white">Duy vật Biện chứng & Lịch sử</span>
                        </div>
                        <div className="flex justify-between border-t border-emerald-500/10 pt-2">
                          <span className="text-emerald-600">THỜI GIAN HOÀN THÀNH:</span>
                          <span className="text-white font-bold">{finalTime.toFixed(1)} giây</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-emerald-600">SỐ LỖI PHÂN TÍCH:</span>
                          <span className={`font-bold ${errorCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{errorCount} lần</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-emerald-600">ĐIỂM HIỆU SUẤT LÕI:</span>
                          <span className="text-yellow-400 font-bold">{finalScore.toLocaleString()} ĐIỂM</span>
                        </div>
                        <div className="flex justify-between border-t border-emerald-500/10 pt-2">
                          <span className="text-emerald-600">MÃ KHÓA KÍCH HOẠT:</span>
                          <span className="text-yellow-400 font-bold bg-yellow-950/20 px-2 py-0.5 rounded border border-yellow-500/20 uppercase">
                            ML_DECRYPT_{finalScore}_{Math.floor(finalTime)}S
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] text-emerald-500/80 text-center leading-relaxed">
                        "Ý thức không chỉ phản ánh thế giới khách quan, mà còn sáng tạo ra thế giới khách quan thông qua hoạt động thực tiễn cải tạo cách mạng."
                      </div>
                    </div>
                  ) : (
                    <div className="w-full bg-[#080d12]/95 border border-emerald-500/30 rounded p-4 text-emerald-400 space-y-3 shadow-[0_0_20px_rgba(16,185,129,0.1)] relative z-10 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/20">
                      <div className="text-xs border-b border-emerald-500/20 pb-2 font-bold uppercase tracking-wider text-center text-white">
                        BẢNG XẾP HẠNG ĐẶC VỤ GIẢI MÃ
                      </div>
                      
                      <table className="w-full text-xs text-left font-mono">
                        <thead>
                          <tr className="border-b border-emerald-500/20 text-emerald-500">
                            <th className="py-1 px-1 text-center">HẠNG</th>
                            <th className="py-1 px-2">MẬT DANH</th>
                            <th className="py-1 px-2 text-right">THỜI GIAN</th>
                            <th className="py-1 px-2 text-right">ĐIỂM SỐ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboard.slice(0, 10).map((entry, idx) => {
                            const isSelf = entry.isPlayer || (isScoreSubmitted && entry.codename === playerCodename.trim() && entry.score === finalScore);
                            return (
                              <tr 
                                key={entry.id} 
                                className={`border-b border-emerald-500/10 last:border-0 ${
                                  isSelf 
                                  ? 'bg-emerald-500/15 text-white font-bold' 
                                  : 'hover:bg-emerald-500/5 text-emerald-400/90'
                                }`}
                              >
                                <td className="py-1.5 px-1 text-center font-bold">
                                  {idx === 0 ? '🏆 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : idx + 1}
                                </td>
                                <td className="py-1.5 px-2 flex items-center gap-1.5 truncate max-w-[120px]">
                                  <span className={isSelf ? 'text-white' : 'text-emerald-300'}>
                                    {entry.codename}
                                  </span>
                                  {isSelf && <span className="text-[9px] bg-emerald-500 text-black px-1 rounded font-sans uppercase">Bạn</span>}
                                </td>
                                <td className="py-1.5 px-2 text-right">{entry.time.toFixed(1)}s</td>
                                <td className={`py-1.5 px-2 text-right ${isSelf ? 'text-yellow-300' : 'text-yellow-400 font-bold'}`}>
                                  {entry.score.toLocaleString()}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      
                      <div className="text-[9px] text-emerald-500/60 text-center italic border-t border-emerald-500/10 pt-1">
                        Cập nhật thời gian thực trên bộ nhớ cục bộ.
                      </div>
                    </div>
                  )}

                  {/* Highscore entry form (only if not submitted and showing certificate) */}
                  {!isScoreSubmitted && !showLeaderboard && (
                    <div className="w-full bg-[#080d12]/95 border border-emerald-500/30 rounded p-4 text-emerald-400 space-y-3 shadow-[0_0_20px_rgba(16,185,129,0.1)] relative z-10">
                      <div className="text-xs font-bold uppercase tracking-wider text-center text-white">
                        GHI DANH VÀO BẢNG XẾP HẠNG ĐẶC VỤ
                      </div>
                      <form onSubmit={handleScoreSubmit} className="flex gap-2">
                        <input
                          type="text"
                          required
                          maxLength={15}
                          value={playerCodename}
                          onChange={(e) => setPlayerCodename(e.target.value)}
                          placeholder="NHẬP MẬT DANH ĐẶC VỤ..."
                          className="flex-1 bg-[#0b1016] border border-emerald-500/40 rounded px-3 py-2 text-xs font-mono text-emerald-400 placeholder-emerald-700/60 focus:outline-none focus:border-emerald-400"
                        />
                        <button
                          type="submit"
                          className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-4 py-2 rounded font-mono transition-all duration-200"
                        >
                          GỬI ĐIỂM
                        </button>
                      </form>
                    </div>
                  )}

                  <div className="flex gap-3 w-full z-10">
                    <button
                      onClick={() => { playSynthSound('click'); setShowLeaderboard(!showLeaderboard); }}
                      className="flex-1 py-2.5 rounded text-xs font-bold border border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Award className="w-4 h-4" />
                      <span>{showLeaderboard ? "Xem Chứng Chỉ" : "Bảng Xếp Hạng"}</span>
                    </button>
                    <button
                      onClick={handleRestartAll}
                      className="flex-1 py-2.5 rounded text-xs font-bold border border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Chơi lại</span>
                    </button>
                    <button
                      onClick={() => { playSynthSound('click'); onClose(); }}
                      className="flex-1 py-2.5 rounded text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                      <span>Trở lại Trang Store</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* GAMEOVER STATE */}
              {stage === 'gameover' && (
                <motion.div 
                  key="gameover"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center h-full max-w-xl mx-auto space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-red-500 uppercase">HỆ THỐNG SỤP ĐỔ!</h2>
                    <p className="text-xs text-gray-400">
                      Lõi logic của Light AI bị gián đoạn hoạt động hoàn toàn do các đáp án mâu thuẫn chồng chéo nhau. Kết nối giải mã bị ngắt.
                    </p>
                  </div>

                  <button
                    onClick={handleRestartAll}
                    className="w-full max-w-xs py-3 rounded text-sm font-bold bg-red-950 border border-red-500 text-red-400 hover:bg-red-900/40 flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-4.5 h-4.5" />
                    <span>Nạp lại Trình Giải mã</span>
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
