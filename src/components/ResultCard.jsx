import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Award, Star } from 'lucide-react';

export default function ResultCard({ score, totalQuestions, onPlayAgain, highScore }) {
  const percentage = (score / totalQuestions) * 100;

  const getTitle = () => {
    if (percentage === 100) return { text: 'أسطورة السينما المصرية', emoji: '🏆', color: 'text-yellow-400' };
    if (percentage >= 80) return { text: 'ناقد سينمائي محترف', emoji: '🎬', color: 'text-amber-400' };
    if (percentage >= 60) return { text: 'عاشق السينما', emoji: '🍿', color: 'text-orange-400' };
    if (percentage >= 40) return { text: 'هاوي أفلام', emoji: '🎥', color: 'text-blue-400' };
    if (percentage >= 20) return { text: 'بداية الطريق', emoji: '📺', color: 'text-gray-400' };
    return { text: 'محتاج تتفرج أكتر', emoji: '😅', color: 'text-red-400' };
  };

  const title = getTitle();
  const isNewHighScore = score > highScore;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="w-full max-w-2xl"
    >
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-10 shadow-2xl border-2 border-amber-800 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-red-500/10"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ backgroundSize: '200% 200%' }}
        />

        <div className="relative z-10">
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-6 rounded-full shadow-xl">
              <Trophy className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-white"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            انتهت اللعبة!
          </motion.h2>

          <motion.div
            className={`text-center mb-8 ${title.color}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <p className="text-3xl md:text-4xl font-bold mb-2">
              {title.text} {title.emoji}
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-amber-900/40 to-red-900/40 rounded-xl p-8 mb-8 border border-amber-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex justify-center items-center gap-4 mb-4">
              <Star className="w-8 h-8 text-amber-400" />
              <span className="text-6xl font-bold text-white">
                {score}
              </span>
              <span className="text-3xl text-amber-300">/ {totalQuestions}</span>
            </div>
            <p className="text-center text-amber-200 text-xl">
              نسبة النجاح: {percentage.toFixed(0)}%
            </p>
          </motion.div>

          {isNewHighScore && (
            <motion.div
              className="bg-gradient-to-r from-yellow-600/40 to-amber-600/40 rounded-xl p-4 mb-6 border border-yellow-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
            >
              <div className="flex items-center justify-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                <span className="text-yellow-300 font-bold text-lg">
                  رقم قياسي جديد!
                </span>
              </div>
            </motion.div>
          )}

          {!isNewHighScore && highScore > 0 && (
            <div className="text-center mb-6 text-gray-400">
              <p>أعلى رقم قياسي: {highScore} / {totalQuestions}</p>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-xl border-2 border-amber-400"
          >
            <RotateCcw className="w-6 h-6" />
            العب مرة تانية
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
