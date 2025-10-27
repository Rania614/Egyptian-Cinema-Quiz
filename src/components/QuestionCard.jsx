import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Check, X } from 'lucide-react';

export default function QuestionCard({ question, questionNumber, totalQuestions, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (index) => {
    if (isAnswered) return;

    setSelectedAnswer(index);
    setIsAnswered(true);

    setTimeout(() => {
      onAnswer(index === question.correct);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }, 1000);
  };

  const getButtonClass = (index) => {
    if (!isAnswered) {
      return 'bg-gradient-to-br from-gray-800 to-gray-900 hover:from-amber-900 hover:to-amber-800 border-amber-700 hover:border-amber-500 hover:shadow-amber-500/50';
    }
    if (index === question.correct) {
      return 'bg-gradient-to-br from-green-600 to-green-700 border-green-400 shadow-green-500/50';
    }
    if (index === selectedAnswer) {
      return 'bg-gradient-to-br from-red-600 to-red-700 border-red-400 shadow-red-500/50';
    }
    return 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 opacity-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl"
    >
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-8 shadow-2xl border-2 border-amber-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-amber-400">
            <Film className="w-6 h-6" />
            <span className="text-lg font-bold">سؤال {questionNumber} من {totalQuestions}</span>
          </div>
          <div className="text-amber-300 text-sm font-semibold">
            السينما المصرية
          </div>
        </div>

        <motion.h2
          className="text-2xl md:text-3xl font-bold text-white mb-8 text-center leading-relaxed"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {question.question}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!isAnswered ? { scale: 1.05 } : {}}
                whileTap={!isAnswered ? { scale: 0.95 } : {}}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswered}
                className={`p-4 rounded-xl border-2 font-semibold text-lg transition-all duration-300 shadow-lg ${getButtonClass(index)}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white">{option}</span>
                  {isAnswered && index === question.correct && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      <Check className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                  {isAnswered && index === selectedAnswer && index !== question.correct && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      <X className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
