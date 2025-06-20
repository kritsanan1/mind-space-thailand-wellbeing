
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Smartphone, 
  Watch, 
  Wifi, 
  WifiOff, 
  Heart, 
  Moon,
  Bell,
  BellOff
} from 'lucide-react';
import { toast } from 'sonner';

interface ConnectedDevice {
  id: string;
  type: 'apple_watch' | 'galaxy_watch' | 'fitbit';
  name: string;
  isConnected: boolean;
  lastSync?: Date;
  batteryLevel?: number;
}

const DeviceSettings = () => {
  const { t, language } = useLanguage();
  const [connectedDevices, setConnectedDevices] = useState<ConnectedDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const deviceTypes = [
    { 
      type: 'apple_watch' as const, 
      name: 'Apple Watch', 
      icon: '⌚', 
      available: true 
    },
    { 
      type: 'galaxy_watch' as const, 
      name: 'Galaxy Watch', 
      icon: '⌚', 
      available: true 
    },
    { 
      type: 'fitbit' as const, 
      name: 'Fitbit', 
      icon: '⌚', 
      available: true 
    }
  ];

  useEffect(() => {
    // Simulate loading connected devices
    const mockDevices: ConnectedDevice[] = [
      {
        id: '1',
        type: 'apple_watch',
        name: 'Apple Watch Series 8',
        isConnected: true,
        lastSync: new Date(),
        batteryLevel: 85
      }
    ];
    setConnectedDevices(mockDevices);
  }, []);

  const handleConnectDevice = async (deviceType: string) => {
    setIsScanning(true);
    
    // Simulate device connection process
    setTimeout(() => {
      const newDevice: ConnectedDevice = {
        id: Date.now().toString(),
        type: deviceType as ConnectedDevice['type'],
        name: deviceTypes.find(d => d.type === deviceType)?.name || 'Unknown Device',
        isConnected: true,
        lastSync: new Date(),
        batteryLevel: Math.floor(Math.random() * 40) + 60
      };
      
      setConnectedDevices(prev => [...prev, newDevice]);
      setIsScanning(false);
      
      toast.success(
        language === 'th' 
          ? 'เชื่อมต่ออุปกรณ์สำเร็จ' 
          : 'Device connected successfully'
      );
    }, 2000);
  };

  const handleDisconnectDevice = (deviceId: string) => {
    setConnectedDevices(prev => prev.filter(device => device.id !== deviceId));
    toast.success(
      language === 'th' 
        ? 'ยกเลิกการเชื่อมต่อแล้ว' 
        : 'Device disconnected'
    );
  };

  const getDeviceIcon = (type: ConnectedDevice['type']) => {
    return <Watch className="w-5 h-5 text-mind-green-500" />;
  };

  const formatLastSync = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) {
      return language === 'th' ? 'เมื่อสักครู่' : 'Just now';
    } else if (diffMinutes < 60) {
      return language === 'th' ? `${diffMinutes} นาทีที่แล้ว` : `${diffMinutes} minutes ago`;
    } else {
      const diffHours = Math.floor(diffMinutes / 60);
      return language === 'th' ? `${diffHours} ชั่วโมงที่แล้ว` : `${diffHours} hours ago`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Connected Devices */}
      <Card className="p-6 bg-mind-blue-50">
        <div className="flex items-center space-x-2 mb-4">
          <Smartphone className="w-5 h-5 text-mind-green-500" />
          <h3 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
            {language === 'th' ? 'อุปกรณ์ที่เชื่อมต่อ' : 'Connected Devices'}
          </h3>
        </div>

        {connectedDevices.length === 0 ? (
          <div className="text-center py-8">
            <Watch className="w-12 h-12 text-mind-neutral-300 mx-auto mb-4" />
            <p className={`text-mind-neutral-600 mb-4 ${language === 'th' ? 'thai' : ''}`}>
              {language === 'th' 
                ? 'ยังไม่มีอุปกรณ์ที่เชื่อมต่อ' 
                : 'No devices connected yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {connectedDevices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 bg-white rounded-xl">
                <div className="flex items-center space-x-3">
                  {getDeviceIcon(device.type)}
                  <div>
                    <h4 className={`font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                      {device.name}
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-mind-neutral-600">
                      {device.isConnected ? (
                        <Wifi className="w-4 h-4 text-green-500" />
                      ) : (
                        <WifiOff className="w-4 h-4 text-red-500" />
                      )}
                      <span>
                        {device.lastSync && formatLastSync(device.lastSync)}
                      </span>
                      {device.batteryLevel && (
                        <span>• {device.batteryLevel}%</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDisconnectDevice(device.id)}
                  className="text-red-500 border-red-200 hover:bg-red-50"
                >
                  {language === 'th' ? 'ยกเลิก' : 'Disconnect'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Add New Device */}
      <Card className="p-6">
        <h3 className={`text-lg font-semibold text-mind-neutral-800 mb-4 ${language === 'th' ? 'thai' : ''}`}>
          {language === 'th' ? 'เพิ่มอุปกรณ์ใหม่' : 'Add New Device'}
        </h3>
        
        <div className="space-y-3">
          {deviceTypes.map((deviceType) => (
            <div key={deviceType.type} className="flex items-center justify-between p-4 border border-mind-neutral-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{deviceType.icon}</span>
                <div>
                  <h4 className={`font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                    {deviceType.name}
                  </h4>
                  <p className={`text-sm text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                    {language === 'th' 
                      ? 'ตรวจสอบอัตราการเต้นของหัวใจและการนอนหลับ' 
                      : 'Monitor heart rate and sleep patterns'}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleConnectDevice(deviceType.type)}
                disabled={isScanning || connectedDevices.some(d => d.type === deviceType.type)}
                className={`bg-mind-green-500 hover:bg-mind-green-600 text-white transition-all duration-300 ${language === 'th' ? 'thai' : ''}`}
              >
                {isScanning 
                  ? (language === 'th' ? 'กำลังค้นหา...' : 'Connecting...') 
                  : connectedDevices.some(d => d.type === deviceType.type)
                  ? (language === 'th' ? 'เชื่อมต่อแล้ว' : 'Connected')
                  : (language === 'th' ? 'เชื่อมต่อ' : 'Connect')
                }
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Health Data Permissions */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Heart className="w-5 h-5 text-red-500" />
          <h3 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
            {language === 'th' ? 'การอนุญาตข้อมูลสุขภาพ' : 'Health Data Permissions'}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="w-4 h-4 text-red-500" />
              <span className={`text-mind-neutral-700 ${language === 'th' ? 'thai' : ''}`}>
                {language === 'th' ? 'อัตราการเต้นของหัวใจ' : 'Heart Rate Data'}
              </span>
            </div>
            <Switch checked={true} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="w-4 h-4 text-blue-500" />
              <span className={`text-mind-neutral-700 ${language === 'th' ? 'thai' : ''}`}>
                {language === 'th' ? 'ข้อมูลการนอนหลับ' : 'Sleep Data'}
              </span>
            </div>
            <Switch checked={true} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {notificationsEnabled ? <Bell className="w-4 h-4 text-green-500" /> : <BellOff className="w-4 h-4 text-gray-500" />}
              <span className={`text-mind-neutral-700 ${language === 'th' ? 'thai' : ''}`}>
                {language === 'th' ? 'การแจ้งเตือนสมาร์ทวอทช์' : 'Smartwatch Notifications'}
              </span>
            </div>
            <Switch 
              checked={notificationsEnabled} 
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-mind-blue-50 rounded-xl">
          <p className={`text-sm text-mind-neutral-600 leading-relaxed ${language === 'th' ? 'thai' : ''}`}>
            {language === 'th' 
              ? 'ข้อมูลสุขภาพของคุณจะถูกเข้ารหัสและจัดเก็บอย่างปลอดภัย เราปฏิบัติตามมาตรฐาน PDPA และ GDPR' 
              : 'Your health data is encrypted and stored securely. We comply with PDPA and GDPR standards.'}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DeviceSettings;
