import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

const steps = [
  {
    title: "Welcome to your Data Hub !",
    content: "Your mission is to build a successful data company. Let’s start with the basics !",
  },
  {
    title: "Data Collection",
    content: "Click the collect button to get raw data. The more you have, the more you can train models, deploy dashboards and generate profit!",
  },
  {
    title: "Data Cleaning",
    content: "Raw data must be cleaned before use. Use the cleaning station to transform it into staging and then marts data.",
  },
  {
    title: "Model Training",
    content: "To win a game, you have to multiply your starting capital by 3. But here's the thing, in data there are not 50 ways to make money.. To win a game (which I limited to 30 minutes, for your health), you will have to think like a real data eng. 💡 Invest intelligently.📈 Optimize your pipelines to get a quick ROI. 🎯 Strategy and (a lot of) clicks. It's a bit addictive ... but there's a surprise at the end.",
  },
];

export default function Tutorial({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep === steps.length - 1) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-gradient-to-br from-gray-900 to-indigo-900 p-8 rounded-xl max-w-md w-full mx-4 shadow-2xl border border-white/10"
        >
          <button
            onClick={onComplete}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
            <p className="text-gray-300">{steps[currentStep].content}</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-indigo-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? "Start" : "Next"}
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}