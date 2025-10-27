import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Timer({ duration, onTimeUp, isActive }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) return;

    setTimeLeft(duration);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onTimeUp, isActive]);

  const percentage = (timeLeft / duration) * 100;
  const isLowTime = timeLeft <= 10;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-amber-400">الوقت المتبقي</span>
        <motion.span
          className={`text-lg font-bold ${isLowTime ? 'text-red-500' : 'text-amber-300'}`}
          animate={isLowTime ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
        >
          {timeLeft}s
        </motion.span>
      </div>
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border-2 border-amber-900">
        <motion.div
          className={`h-full ${isLowTime ? 'bg-red-500' : 'bg-gradient-to-r from-amber-500 to-yellow-400'}`}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
