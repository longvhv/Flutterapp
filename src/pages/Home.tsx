import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BottomNav } from '../components/BottomNav';
import { motion } from 'motion/react';
import { Users, Briefcase, DollarSign, TrendingUp, Activity, Shield, UserCheck } from 'lucide-react';
import { dashboardApi } from '../services/api';

export const Home = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getRecentActivity(),
      ]);
      
      if (statsRes.success) setStats(statsRes.data);
      if (activityRes.success) setActivities(activityRes.data);
    } catch (error) {
      console.error('Failed to load dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { icon: Users, label: t.totalUsers, value: stats?.totalUsers || '0', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
    { icon: Briefcase, label: t.activeProjects, value: stats?.activeProjects || '0', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' },
    { icon: DollarSign, label: t.revenue, value: stats?.revenue || '$0', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50' },
    { icon: TrendingUp, label: t.growth, value: stats?.growth || '0%', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return UserCheck;
      case 'update': return Activity;
      case 'security': return Shield;
      default: return Activity;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 pt-safe">
        <div className="max-w-lg mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <p className="text-blue-100 mb-1">{t.welcome}</p>
            <h1 className="text-2xl mb-6">{user?.fullName || 'User'}</h1>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-gray-900">{t.recentActivity}</h2>
        </div>

        <div className="space-y-3">
          {loading ? (
            // Skeleton loading
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            activities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Quick Features */}
        <div className="mt-8">
          <h2 className="text-lg text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Users, label: 'Users', color: 'from-blue-500 to-blue-600' },
              { icon: Briefcase, label: 'Projects', color: 'from-purple-500 to-purple-600' },
              { icon: Shield, label: 'Security', color: 'from-green-500 to-green-600' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.button
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center gap-2"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-700">{feature.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
