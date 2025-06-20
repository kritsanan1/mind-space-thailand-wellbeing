
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import BottomNavigation from "@/components/BottomNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  DollarSign,
  CheckCircle,
  CreditCard
} from "lucide-react";
import { toast } from "sonner";

const TherapistBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<'datetime' | 'payment' | 'confirmation'>('datetime');

  // Mock therapist data - in real app this would come from API
  const therapist = {
    id: '1',
    name: language === 'th' ? 'ดร. สุดา วิทยานันท์' : 'Dr. Suda Wityanan',
    hourlyRate: 1500,
    avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100'
  };

  const availableSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinueToPayment = () => {
    if (!selectedDate || !selectedTime) {
      toast.error(language === 'th' ? 'กรุณาเลือกวันและเวลา' : 'Please select date and time');
      return;
    }
    setStep('payment');
  };

  const handlePayment = () => {
    // Simulate payment processing
    toast.success(language === 'th' ? 'กำลังดำเนินการชำระเงิน...' : 'Processing payment...');
    setTimeout(() => {
      setStep('confirmation');
      toast.success(language === 'th' ? 'จองสำเร็จ!' : 'Booking confirmed!');
    }, 2000);
  };

  const handleFinish = () => {
    navigate('/therapist');
  };

  return (
    <div className="min-h-screen bg-mind-blue-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6 border-b border-mind-neutral-200">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => step === 'datetime' ? navigate('/therapist') : setStep('datetime')}
            variant="ghost"
            size="icon"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          
          <div className="flex-1">
            <h1 className={`text-xl font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
              {step === 'datetime' && (language === 'th' ? 'เลือกวันและเวลา' : 'Select Date & Time')}
              {step === 'payment' && (language === 'th' ? 'ชำระเงิน' : 'Payment')}
              {step === 'confirmation' && (language === 'th' ? 'ยืนยันการจอง' : 'Booking Confirmed')}
            </h1>
            <p className={`text-sm text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
              {language === 'th' ? 'กับ ' : 'with '}{therapist.name}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Step 1: Date & Time Selection */}
        {step === 'datetime' && (
          <div className="space-y-6">
            {/* Therapist Info */}
            <Card className="p-4 card-shadow">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${therapist.avatar})` }}
                />
                <div>
                  <h3 className={`font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                    {therapist.name}
                  </h3>
                  <p className="text-mind-neutral-600">
                    ฿{therapist.hourlyRate.toLocaleString()}/{t('therapist.rate')}
                  </p>
                </div>
              </div>
            </Card>

            {/* Calendar */}
            <Card className="p-6 card-shadow">
              <div className="flex items-center space-x-2 mb-4">
                <CalendarIcon className="w-5 h-5 text-mind-green-500" />
                <h3 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                  {language === 'th' ? 'เลือกวันที่' : 'Select Date'}
                </h3>
              </div>
              
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  className="rounded-md border"
                />
              </div>
            </Card>

            {/* Time Slots */}
            {selectedDate && (
              <Card className="p-6 card-shadow">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-mind-blue-500" />
                  <h3 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                    {language === 'th' ? 'เลือกเวลา' : 'Select Time'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {availableSlots.map((time) => (
                    <Button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      className={`${selectedTime === time 
                        ? 'bg-mind-green-500 text-white' 
                        : 'border-mind-neutral-300 text-mind-neutral-600 hover:bg-mind-green-50'
                      } py-3`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </Card>
            )}

            {/* Continue Button */}
            <Button
              onClick={handleContinueToPayment}
              disabled={!selectedDate || !selectedTime}
              className={`w-full py-4 bg-mind-green-500 hover:bg-mind-green-600 disabled:bg-mind-neutral-300 text-white rounded-2xl ${language === 'th' ? 'thai' : ''}`}
            >
              {t('button.continue')}
            </Button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && (
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card className="p-6 card-shadow">
              <h3 className={`text-lg font-semibold text-mind-neutral-800 mb-4 ${language === 'th' ? 'thai' : ''}`}>
                {language === 'th' ? 'สรุปการจอง' : 'Booking Summary'}
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                    {language === 'th' ? 'นักจิตวิทยา' : 'Therapist'}
                  </span>
                  <span className={`font-medium ${language === 'th' ? 'thai' : ''}`}>
                    {therapist.name}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className={`text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                    {language === 'th' ? 'วันที่' : 'Date'}
                  </span>
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className={`text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                    {language === 'th' ? 'เวลา' : 'Time'}
                  </span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                
                <div className="border-t pt-3 flex justify-between">
                  <span className={`font-semibold ${language === 'th' ? 'thai' : ''}`}>
                    {language === 'th' ? 'ยอดรวม' : 'Total'}
                  </span>
                  <span className="font-bold text-mind-green-500">
                    ฿{therapist.hourlyRate.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6 card-shadow">
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="w-5 h-5 text-mind-blue-500" />
                <h3 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                  {language === 'th' ? 'วิธีการชำระเงิน' : 'Payment Method'}
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 border-2 border-mind-green-500 rounded-xl bg-mind-green-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-mind-green-500 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Credit Card</p>
                      <p className="text-sm text-mind-neutral-600">Visa, Mastercard, JCB</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pay Button */}
            <Button
              onClick={handlePayment}
              className={`w-full py-4 bg-mind-green-500 hover:bg-mind-green-600 text-white rounded-2xl ${language === 'th' ? 'thai' : ''}`}
            >
              <DollarSign className="w-5 h-5 mr-2" />
              {language === 'th' ? 'ชำระเงิน' : 'Pay Now'} ฿{therapist.hourlyRate.toLocaleString()}
            </Button>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirmation' && (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 mx-auto bg-mind-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-mind-green-500" />
            </div>
            
            <div>
              <h2 className={`text-2xl font-bold text-mind-neutral-800 mb-2 ${language === 'th' ? 'thai' : ''}`}>
                {language === 'th' ? 'จองสำเร็จ!' : 'Booking Confirmed!'}
              </h2>
              <p className={`text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                {language === 'th' 
                  ? 'คุณจะได้รับอีเมลยืนยันในอีกสักครู่' 
                  : 'You will receive a confirmation email shortly'
                }
              </p>
            </div>

            <Card className="p-6 card-shadow text-left">
              <h3 className={`text-lg font-semibold text-mind-neutral-800 mb-4 ${language === 'th' ? 'thai' : ''}`}>
                {language === 'th' ? 'รายละเอียดการนัดหมาย' : 'Appointment Details'}
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                    {language === 'th' ? 'นักจิตวิทยา' : 'Therapist'}
                  </span>
                  <span className={`font-medium ${language === 'th' ? 'thai' : ''}`}>
                    {therapist.name}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className={`text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                    {language === 'th' ? 'วันที่' : 'Date & Time'}
                  </span>
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString()} at {selectedTime}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className={`text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                    {language === 'th' ? 'ประเภท' : 'Session Type'}
                  </span>
                  <span className="font-medium">
                    {language === 'th' ? 'ปรึกษาออนไลน์' : 'Online Consultation'}
                  </span>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleFinish}
              className={`w-full py-4 bg-mind-green-500 hover:bg-mind-green-600 text-white rounded-2xl ${language === 'th' ? 'thai' : ''}`}
            >
              {language === 'th' ? 'กลับไปหน้าหลัก' : 'Back to Home'}
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TherapistBooking;
