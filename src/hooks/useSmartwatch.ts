
import { useState, useEffect } from 'react';

export interface SmartwatchDevice {
  id: string;
  type: 'apple_watch' | 'galaxy_watch' | 'fitbit';
  name: string;
  isConnected: boolean;
  lastSync?: Date;
  batteryLevel?: number;
}

export interface HeartRateData {
  heartRate: number;
  timestamp: Date;
  stressLevel: 'low' | 'medium' | 'high';
}

export interface SleepData {
  duration: number;
  quality: 'good' | 'average' | 'poor';
  bedtime: string;
  wakeTime: string;
  deepSleep: number;
  lightSleep: number;
  remSleep: number;
  date: Date;
}

export const useSmartwatch = () => {
  const [devices, setDevices] = useState<SmartwatchDevice[]>([]);
  const [heartRateData, setHeartRateData] = useState<HeartRateData[]>([]);
  const [sleepData, setSleepData] = useState<SleepData[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  // Simulate device connection
  const connectDevice = async (deviceType: SmartwatchDevice['type']) => {
    setIsConnecting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newDevice: SmartwatchDevice = {
      id: Date.now().toString(),
      type: deviceType,
      name: getDeviceName(deviceType),
      isConnected: true,
      lastSync: new Date(),
      batteryLevel: Math.floor(Math.random() * 40) + 60
    };
    
    setDevices(prev => [...prev, newDevice]);
    setIsConnecting(false);
    
    // Start syncing data for the new device
    startDataSync(newDevice.id);
    
    return newDevice;
  };

  const disconnectDevice = (deviceId: string) => {
    setDevices(prev => prev.filter(device => device.id !== deviceId));
  };

  const getDeviceName = (type: SmartwatchDevice['type']) => {
    switch (type) {
      case 'apple_watch': return 'Apple Watch';
      case 'galaxy_watch': return 'Galaxy Watch';
      case 'fitbit': return 'Fitbit';
      default: return 'Unknown Device';
    }
  };

  // Simulate data syncing
  const startDataSync = (deviceId: string) => {
    // Generate mock heart rate data
    const generateHeartRateData = () => {
      const baseHeartRate = 70;
      const variation = Math.floor(Math.random() * 30) - 15;
      const heartRate = baseHeartRate + variation;
      
      let stressLevel: HeartRateData['stressLevel'] = 'low';
      if (heartRate > 90) stressLevel = 'high';
      else if (heartRate > 80) stressLevel = 'medium';
      
      return {
        heartRate,
        timestamp: new Date(),
        stressLevel
      };
    };

    // Generate mock sleep data
    const generateSleepData = () => {
      const qualities: SleepData['quality'][] = ['good', 'average', 'poor'];
      const quality = qualities[Math.floor(Math.random() * qualities.length)];
      
      return {
        duration: 6.5 + Math.random() * 2.5, // 6.5-9 hours
        quality,
        bedtime: '23:' + (Math.floor(Math.random() * 60)).toString().padStart(2, '0'),
        wakeTime: '07:' + (Math.floor(Math.random() * 60)).toString().padStart(2, '0'),
        deepSleep: Math.floor(Math.random() * 20) + 15, // 15-35%
        lightSleep: Math.floor(Math.random() * 20) + 50, // 50-70%
        remSleep: Math.floor(Math.random() * 15) + 10, // 10-25%
        date: new Date()
      };
    };

    // Simulate real-time heart rate updates
    const heartRateInterval = setInterval(() => {
      const newHeartRateData = generateHeartRateData();
      setHeartRateData(prev => [...prev.slice(-99), newHeartRateData]); // Keep last 100 readings
    }, 30000); // Every 30 seconds

    // Simulate daily sleep data
    const sleepInterval = setInterval(() => {
      const newSleepData = generateSleepData();
      setSleepData(prev => [...prev.slice(-6), newSleepData]); // Keep last 7 days
    }, 86400000); // Every 24 hours

    return () => {
      clearInterval(heartRateInterval);
      clearInterval(sleepInterval);
    };
  };

  // Get latest heart rate data
  const getLatestHeartRate = (): HeartRateData | null => {
    return heartRateData.length > 0 ? heartRateData[heartRateData.length - 1] : null;
  };

  // Get latest sleep data
  const getLatestSleep = (): SleepData | null => {
    return sleepData.length > 0 ? sleepData[sleepData.length - 1] : null;
  };

  // Check if any device is connected
  const hasConnectedDevice = devices.some(device => device.isConnected);

  // Send notification to smartwatch
  const sendNotification = async (title: string, message: string, type: 'stress' | 'meditation' | 'sleep') => {
    // In a real implementation, this would send to the actual smartwatch APIs
    console.log('Sending smartwatch notification:', { title, message, type });
    
    // Simulate notification being sent
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  return {
    devices,
    heartRateData,
    sleepData,
    isConnecting,
    connectDevice,
    disconnectDevice,
    getLatestHeartRate,
    getLatestSleep,
    hasConnectedDevice,
    sendNotification
  };
};
