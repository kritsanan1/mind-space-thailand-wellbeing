
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Heart, 
  BookOpen,
  Wind
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  mood?: 'happy' | 'neutral' | 'sad' | 'stressed';
}

const AIChat = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: language === 'th' 
        ? 'สวัสดีค่ะ! ฉันพร้อมรับฟังความรู้สึกของคุณวันนี้ 💚' 
        : "Hello! I'm here to listen and support you today 💚",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const analyzeMood = (message: string): 'happy' | 'neutral' | 'sad' | 'stressed' => {
    const happyWords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'amazing', 'ดีใจ', 'มีความสุข', 'ดี', 'เยี่ยม'];
    const sadWords = ['sad', 'depressed', 'down', 'awful', 'terrible', 'เศร้า', 'หดหู่', 'แย่', 'ไม่ดี'];
    const stressWords = ['stressed', 'anxious', 'worried', 'overwhelmed', 'เครียด', 'วิตกกังวล', 'กังวล', 'ท้อ'];
    
    const lowerMessage = message.toLowerCase();
    
    if (stressWords.some(word => lowerMessage.includes(word))) return 'stressed';
    if (sadWords.some(word => lowerMessage.includes(word))) return 'sad';
    if (happyWords.some(word => lowerMessage.includes(word))) return 'happy';
    return 'neutral';
  };

  const generateAIResponse = (userMessage: string, mood: string): string => {
    const responses = {
      en: {
        happy: [
          "That's wonderful to hear! 😊 Your positive energy is beautiful. Would you like to do a gratitude meditation to amplify these good feelings?",
          "I'm so glad you're feeling good! ✨ Happiness looks great on you. How about we do some breathing exercises to maintain this positive state?"
        ],
        neutral: [
          "Thank you for sharing with me. Sometimes neutral is exactly where we need to be. Would you like to explore what's on your mind?",
          "I appreciate your honesty. Neutral feelings are valid too. Shall we try a mindfulness exercise together?"
        ],
        sad: [
          "I hear you, and I want you to know that it's okay to feel this way. 💙 You're not alone. Would you like to try a gentle breathing exercise?",
          "Your feelings are valid, and I'm here with you. Sometimes sadness needs to be felt. Shall we do a compassionate meditation together?"
        ],
        stressed: [
          "You seem stressed. That sounds really challenging. 💚 Would you like to try a 5-minute breathing exercise to help calm your mind?",
          "I can sense the stress in your words. Let's take this one breath at a time. Shall we do a quick stress-relief meditation?"
        ]
      },
      th: {
        happy: [
          "ดีใจด้วยค่ะ! 😊 พลังงานบวกของคุณช่างงดงาม อยากลองทำสมาธิแห่งความกตัญญูเพื่อเพิ่มความรู้สึกดีๆ นี้ไหมคะ?",
          "ยินดีมากที่คุณรู้สึกดี! ✨ ความสุขเข้ากับคุณมาก ลองทำกิจกรรมหายใจเพื่อรักษาสภาวะบวกนี้ไว้ไหมคะ?"
        ],
        neutral: [
          "ขอบคุณที่แบ่งปันกับฉันค่ะ บางครั้งความรู้สึกเป็นกลางก็คือสิ่งที่เราต้องการ อยากสำรวจว่าอะไรอยู่ในใจคุณไหมคะ?",
          "ขอบคุณสำหรับความจริงใจ ความรู้สึกเป็นกลางก็มีค่าเช่นกัน ลองทำกิจกรรมสติด้วยกันไหมคะ?"
        ],
        sad: [
          "ฉันเข้าใจคุณ และอยากให้คุณรู้ว่าการรู้สึกแบบนี้เป็นเรื่องปกติ 💙 คุณไม่ได้อยู่คนเดียว อยากลองทำกิจกรรมหายใจเบาๆ ไหมคะ?",
          "ความรู้สึกของคุณมีค่า และฉันอยู่ที่นี่กับคุณ บางครั้งความเศร้าต้องให้มันผ่านไป ลองทำสมาธิเมตตาด้วยกันไหมคะ?"
        ],
        stressed: [
          "คุณดูเครียดนะคะ ฟังดูท้าทายมาก 💚 อยากลองกิจกรรมหายใจ 5 นาทีเพื่อช่วยทำใจให้สงบไหมคะ?",
          "ฉันรู้สึกได้ถึงความเครียดจากคำพูดของคุณ มาทำทีละลมหายใจกันเถอะ ลองทำสมาธิบรรเทาความเครียดไหมคะ?"
        ]
      }
    };

    const moodResponses = responses[language][mood] || responses[language].neutral;
    return moodResponses[Math.floor(Math.random() * moodResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Analyze mood
    const mood = analyzeMood(inputValue);
    
    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue, mood),
        timestamp: new Date(),
        mood
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success(language === 'th' ? "เริ่มบันทึกเสียง..." : "Recording started...");
    } else {
      toast.info(language === 'th' ? "หยุดบันทึกเสียง" : "Recording stopped");
    }
  };

  const handleSaveMood = () => {
    toast.success(language === 'th' ? "บันทึกอารมณ์แล้ว!" : "Mood saved!");
  };

  const getMoodIcon = (mood?: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'stressed': return '😰';
      default: return '😐';
    }
  };

  const getSuggestedAction = (mood?: string) => {
    switch (mood) {
      case 'stressed':
        return (
          <Button
            size="sm"
            className="bg-mind-blue-500 hover:bg-mind-blue-600 text-white rounded-full"
            onClick={() => window.open('/meditation/breathing', '_blank')}
          >
            <Wind className="w-4 h-4 mr-1" />
            {t('chat.try_breathing')}
          </Button>
        );
      case 'sad':
        return (
          <Button
            size="sm"
            className="bg-mind-green-500 hover:bg-mind-green-600 text-white rounded-full"
            onClick={() => window.open('/content', '_blank')}
          >
            <Heart className="w-4 h-4 mr-1" />
            Self-Care Content
          </Button>
        );
      case 'happy':
        return (
          <Button
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full"
            onClick={() => window.open('/meditation/gratitude', '_blank')}
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Gratitude Practice
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-mind-blue-50 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white p-6 border-b border-mind-neutral-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-mind-green-100 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-mind-green-500" />
          </div>
          <div>
            <h1 className={`text-xl font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
              {t('chat.title')}
            </h1>
            <p className={`text-sm text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
              Online • Secure & Private
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-mind-green-500' 
                    : 'bg-mind-blue-100'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-mind-blue-500" />
                  )}
                </div>
                
                <div className={`rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-mind-green-500 text-white'
                    : 'bg-white card-shadow'
                }`}>
                  <p className={`text-sm ${language === 'th' ? 'thai' : ''} ${
                    message.type === 'user' ? 'text-white' : 'text-mind-neutral-800'
                  }`}>
                    {message.content}
                  </p>
                  
                  {message.mood && message.type === 'ai' && (
                    <div className="mt-3 pt-3 border-t border-mind-neutral-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-mind-neutral-500">
                          Detected mood: {getMoodIcon(message.mood)}
                        </span>
                        {getSuggestedAction(message.mood)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-mind-blue-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-mind-blue-500" />
              </div>
              <div className="bg-white rounded-2xl p-4 card-shadow">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-mind-neutral-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-mind-neutral-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-mind-neutral-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Save Mood Button */}
      <div className="p-4 bg-white border-t border-mind-neutral-200">
        <Button
          onClick={handleSaveMood}
          variant="outline"
          className={`w-full border-mind-green-500 text-mind-green-500 hover:bg-mind-green-50 ${language === 'th' ? 'thai' : ''}`}
        >
          <Heart className="w-4 h-4 mr-2" />
          {t('chat.save_mood')}
        </Button>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-mind-neutral-200">
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleVoiceToggle}
            variant="outline"
            size="icon"
            className={`${isRecording ? 'bg-red-500 text-white border-red-500' : 'border-mind-neutral-300'}`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('chat.placeholder')}
            className={`flex-1 border-mind-neutral-300 rounded-xl ${language === 'th' ? 'thai' : ''}`}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-mind-green-500 hover:bg-mind-green-600 text-white rounded-xl"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AIChat;
