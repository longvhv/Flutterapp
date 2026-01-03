import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Smartphone, Monitor, Tablet, MapPin, Chrome, CheckCircle, X } from 'lucide-react';
import { devicesApi } from '../services/api';

interface Device {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export const Devices = () => {
  const { t } = useLanguage();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
      const response = await devicesApi.getDevices();
      if (response.success && response.data) {
        setDevices(response.data);
      }
    } catch (error) {
      console.error('Failed to load devices', error);
    } finally {
      setLoading(false);
    }
  };

  const revokeDevice = async (deviceId: string) => {
    await devicesApi.revokeDevice(deviceId);
    setDevices(prev => prev.filter(d => d.id !== deviceId));
  };

  const revokeAllOtherDevices = async () => {
    await devicesApi.revokeAllDevices();
    setDevices(prev => prev.filter(d => d.current));
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  const getDeviceColor = (type: string) => {
    switch (type) {
      case 'mobile': return 'from-blue-500 to-blue-600';
      case 'tablet': return 'from-purple-500 to-purple-600';
      default: return 'from-green-500 to-green-600';
    }
  };

  const formatLastActive = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const otherDevicesCount = devices.filter(d => !d.current).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title={t.activeDevices} showBack />

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Revoke All Button */}
        {otherDevicesCount > 0 && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={revokeAllOtherDevices}
            className="w-full bg-red-50 text-red-600 rounded-xl px-4 py-3 mb-4 hover:bg-red-100 transition-colors text-sm"
            whileTap={{ scale: 0.98 }}
          >
            {t.revokeAll} ({otherDevicesCount})
          </motion.button>
        )}

        {/* Devices List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-14 h-14 bg-gray-200 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-1" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {devices.map((device, index) => {
              const Icon = getDeviceIcon(device.type);
              const colorClass = getDeviceColor(device.type);

              return (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white rounded-2xl p-4 shadow-sm ${
                    device.current ? 'border-2 border-green-200' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-14 h-14 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm text-gray-900">{device.name}</h3>
                        {device.current && (
                          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            {t.currentDevice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                        <Chrome className="w-3 h-3" />
                        <span>{device.browser}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{device.location}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {t.lastActive}: {formatLastActive(device.lastActive)}
                      </p>
                    </div>
                    {!device.current && (
                      <motion.button
                        onClick={() => revokeDevice(device.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors flex-shrink-0"
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
