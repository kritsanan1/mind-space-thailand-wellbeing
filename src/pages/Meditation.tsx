
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Play, 
  Pause, 
  Square, 
  ArrowLeft, 
  Volume2,
  VolumeX,
  RotateCcw
} from "lucide-react";
import { toast } from "sonner";

const Meditation = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  const sessionData = {
    'mindfulness-5': {
      title: language === 'th' ? 'สติในปัจจุบัน' : 'Mindful Awareness',
      duration: 300, // 5 minutes in seconds
      background: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
      instructions: language === 'th' 
        ? ['นั่งสบาย ๆ', 'หลับตาเบา ๆ', 'สังเกตลมหายใจ', 'ปล่อยวางความคิด']
        : ['Sit comfortably', 'Close your eyes gently', 'Notice your breath', 'Let thoughts pass']
    },
    'stress-relief-10': {
      title: language === 'th' ? 'บรรเทาความเครียด' : 'Stress Relief',
      duration: 600, // 10 minutes
      background: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800',
      instructions: language === 'th'
        ? ['หายใจลึก ๆ', 'ผ่อนคลายกล้ามเนื้อ', 'ปล่อยความตึงเครียด', 'รู้สึกสงบสุข']
        : ['Breathe deeply', 'Relax your muscles', 'Release tension', 'Feel peaceful']
    },
    'box-breathing': {
      title: language === 'th' ? 'การหายใจแบบกล่อง' : 'Box Breathing',
      duration: 300, // 5 minutes
      background: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800',
      instructions: language === 'th'
        ? ['หายใจเข้า 4 จังหวะ', 'กลั้นหายใจ 4 จังหวะ', 'หายใจออก 4 จังหวะ', 'พัก 4 จังหวะ']
        : ['Inhale for 4 counts', 'Hold for 4 counts', 'Exhale for 4 counts', 'Hold for 4 counts']
    }
  };

  const session = sessionData[type as keyof typeof sessionData];
  const progress = (currentTime / session.duration) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentTime < session.duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev + 1 >= session.duration) {
            setIsPlaying(false);
            setSessionComplete(true);
            toast.success(language === 'th' ? 'เสร็จสิ้นการทำสมาธิ! 🎉' : 'Meditation complete! 🎉');
            return session.duration;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, session.duration, language]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setSessionComplete(false);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setSessionComplete(false);
    setIsPlaying(true);
  };

  const handleComplete = () => {
    // Save meditation session to user progress
    toast.success(language === 'th' ? 'บันทึกความก้าวหน้าแล้ว' : 'Progress saved');
    navigate('/home');
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-mind-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-mind-neutral-800 mb-2">Session not found</h2>
          <Button onClick={() => navigate('/content')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Content
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${session.background})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <Button
            onClick={() => navigate('/content')}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          
          <h1 className={`text-xl font-semibold text-white ${language === 'th' ? 'thai' : ''}`}>
            {session.title}
          </h1>
          
          <Button
            onClick={() => setIsMuted(!isMuted)}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
          {!sessionComplete ? (
            <>
              {/* Time Display */}
              <div className="text-center">
                <div className="text-6xl font-light text-white mb-2">
                  {formatTime(session.duration - currentTime)}
                </div>
                <div className="text-white/80 text-sm">
                  {formatTime(currentTime)} / {formatTime(session.duration)}
                </div>
              </div>

              {/* Progress Circle */}
              <div className="relative">
                <div className="w-48 h-48 rounded-full border-4 border-white/30 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/30 flex items-center justify-center breathe">
                      <div className="w-24 h-24 rounded-full bg-white/40" />
                    </div>
                  </div>
                </div>
                
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="90"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${progress * 5.65} 565`}
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>

              {/* Instructions */}
              <div className="text-center space-y-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  {session.instructions.map((instruction, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm text-white text-sm ${language === 'th' ? 'thai' : ''}`}
                    >
                      {instruction}
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-6">
                <Button
                  onClick={handleStop}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Square className="w-6 h-6" />
                </Button>
                
                <Button
                  onClick={handlePlayPause}
                  className="w-16 h-16 rounded-full bg-white/30 hover:bg-white/40 text-white"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>
                
                <Button
                  onClick={handleRestart}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <RotateCcw className="w-6 h-6" />
                </Button>
              </div>
            </>
          ) : (
            /* Session Complete */
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className={`text-3xl font-bold text-white mb-2 ${language === 'th' ? 'thai' : ''}`}>
                {language === 'th' ? 'ยอดเยี่ยม!' : 'Well Done!'}
              </h2>
              <p className={`text-white/80 text-lg mb-8 ${language === 'th' ? 'thai' : ''}`}>
                {language === 'th' 
                  ? 'คุณทำสมาธิครบ ' + Math.floor(session.duration / 60) + ' นาที'
                  : 'You completed a ' + Math.floor(session.duration / 60) + '-minute session'
                }
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={handleComplete}
                  className={`w-full bg-mind-green-500 hover:bg-mind-green-600 text-white py-4 rounded-2xl ${language === 'th' ? 'thai' : ''}`}
                >
                  {language === 'th' ? 'บันทึกความก้าวหน้า' : 'Save Progress'}
                </Button>
                
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  className={`w-full border-white text-white hover:bg-white/20 py-4 rounded-2xl ${language === 'th' ? 'thai' : ''}`}
                >
                  {language === 'th' ? 'ทำอีกครั้ง' : 'Do Again'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meditation;
