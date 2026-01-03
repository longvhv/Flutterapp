import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack = false, rightAction }) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
      <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <motion.button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          )}
          <h1 className="text-xl">{title}</h1>
        </div>
        {rightAction && <div>{rightAction}</div>}
      </div>
    </div>
  );
};
