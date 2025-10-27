import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Play, Clock } from 'lucide-react';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';
import Timer from './components/Timer';
import { questions } from './data/questions';
import { getRandomQuestions } from './utils/shuffle';

type GameState = 'start' | 'playing' | 'finished';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameQuestions, setGameQuestions] = useState<typeof questions>([]);
  const [timerActive, setTimerActive] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const QUESTIONS_PER_GAME = 10;
  const TIME_PER_QUESTION = 30;

  useEffect(() => {
    const savedHighScore = localStorage.getItem('egyptianCinemaHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const startGame = () => {
    const randomQuestions = getRandomQuestions(questions, QUESTIONS_PER_GAME);
    setGameQuestions(randomQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState('playing');
    setTimerActive(true);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < gameQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setTimerActive(false);
      setTimeout(() => setTimerActive(true), 100);
    } else {
      finishGame();
    }
  };

  const handleTimeUp = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < gameQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setTimerActive(false);
      setTimeout(() => setTimerActive(true), 100);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setGameState('finished');
    setTimerActive(false);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('egyptianCinemaHighScore', score.toString());
    }
  };

  const playAgain = () => {
    startGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-red-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkJGMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoLTJ6bTAtNGgydjJoLTJ2LTJ6bS0yIDJoLTJ2LTJoMnYyem0wLTRoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem0tMiAwaDJ2Mmgtc3YtMnptLTItMmgydjJoLTJ2LTJ6bTAgMGgtMlYzMmgydjJ6bTAtNGgydjJoLTJ2LTJ6bTItMmgtMnYtMmgydjJ6bTAgMGgydjJoLTJ2LTJ6bTIgMmgydi0yaC0ydjJ6bTAgNGgydi0yaC0ydjJ6bTItMmgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl w-full relative z-10"
          >
            <motion.div
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="inline-block mb-8"
            >
              <div className="bg-gradient-to-br from-amber-500 to-red-600 p-8 rounded-full shadow-2xl">
                <Film className="w-24 h-24 text-white" />
              </div>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-red-500 bg-clip-text text-transparent"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              كويز السينما المصرية
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              اختبر معلوماتك عن الأفلام والنجوم المصريين
            </motion.p>

            <motion.div
              className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border-2 border-amber-700 mb-8 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-amber-400" />
                <h3 className="text-2xl font-bold text-amber-300">قواعد اللعبة</h3>
              </div>
              <ul className="text-gray-300 text-lg space-y-2">
                <li>• {QUESTIONS_PER_GAME} أسئلة عشوائية في كل لعبة</li>
                <li>• {TIME_PER_QUESTION} ثانية لكل سؤال</li>
                <li>• اختر الإجابة الصحيحة بسرعة</li>
                <li>• احصل على لقب بناءً على نتيجتك</li>
              </ul>
              {highScore > 0 && (
                <div className="mt-6 pt-6 border-t border-amber-800">
                  <p className="text-amber-300 text-lg">
                    أعلى رقم قياسي: <span className="font-bold text-2xl text-amber-400">{highScore}</span> / {QUESTIONS_PER_GAME}
                  </p>
                </div>
              )}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold py-5 px-12 rounded-xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 text-2xl mx-auto border-2 border-amber-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Play className="w-8 h-8" />
              ابدأ اللعبة
            </motion.button>
          </motion.div>
        )}

        {gameState === 'playing' && gameQuestions.length > 0 && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-3xl relative z-10"
          >
            <div className="mb-6 bg-gradient-to-r from-gray-900/80 to-black/80 p-6 rounded-xl border-2 border-amber-800">
              <div className="flex justify-between items-center mb-4">
                <div className="text-amber-300 text-lg font-bold">
                  النتيجة: <span className="text-2xl text-amber-400">{score}</span>
                </div>
                <div className="text-gray-400 text-sm">
                  أعلى رقم: <span className="text-amber-400 font-bold">{highScore}</span>
                </div>
              </div>
              <Timer
                duration={TIME_PER_QUESTION}
                onTimeUp={handleTimeUp}
                isActive={timerActive}
              />
            </div>
            <AnimatePresence mode="wait">
              <QuestionCard
                key={currentQuestionIndex}
                question={gameQuestions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={gameQuestions.length}
                onAnswer={handleAnswer}
              />
            </AnimatePresence>
          </motion.div>
        )}

        {gameState === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10"
          >
            <ResultCard
              score={score}
              totalQuestions={QUESTIONS_PER_GAME}
              onPlayAgain={playAgain}
              highScore={highScore}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
