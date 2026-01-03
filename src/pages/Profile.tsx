import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { motion } from 'motion/react';
import { Camera, Mail, Phone, User, FileText, Save } from 'lucide-react';
import { userApi } from '../services/api';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.bio || '',
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const response = await userApi.uploadAvatar(file);
        if (response.success && response.data) {
          updateProfile({ avatar: response.data.avatarUrl });
        }
      } catch (error) {
        console.error('Failed to upload avatar', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userApi.updateProfile(formData);
      if (response.success) {
        updateProfile(formData);
        setEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title={t.profile} showBack />

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm p-8 mb-6"
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  user?.fullName?.charAt(0) || 'U'
                )}
              </div>
              <motion.label
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer"
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </motion.label>
            </div>
            <h2 className="text-xl text-gray-900 mt-4">{user?.fullName}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg text-gray-900">{t.editProfile}</h3>
            {!editing && (
              <motion.button
                onClick={() => setEditing(true)}
                className="text-sm text-blue-600 hover:text-blue-700"
                whileTap={{ scale: 0.95 }}
              >
                {t.edit}
              </motion.button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                {t.fullName}
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                {t.email}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                {t.phoneNumber}
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                {t.bio}
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!editing}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all resize-none"
              />
            </div>

            {/* Action Buttons */}
            {editing && (
              <div className="flex gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      fullName: user?.fullName || '',
                      email: user?.email || '',
                      phoneNumber: user?.phoneNumber || '',
                      bio: user?.bio || '',
                    });
                  }}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  {t.cancel}
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Saving...' : t.saveChanges}
                </motion.button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};
