import React from 'react';
import { useGameState } from '../context/GameContext';
import { Database, Brain, Clock, DollarSign, Filter } from 'lucide-react';

export default function Header() {
  const { resources, restartGame } = useGameState();
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ada - Understanding a Modern Data Stack
          </h1>
          
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Database size={18} className="text-blue-400" />
              <span className="font-mono">{resources.rawData.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-purple-400" />
              <span className="font-mono">{resources.cleanData.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-pink-400" />
              <span className="font-mono">{resources.models.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-emerald-400" />
              <span className="font-mono">{resources.revenue.toLocaleString()} €</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className={resources.timeRemaining < 60 ? "text-red-400" : "text-yellow-400"} />
              <span className="font-mono">{formatTime(resources.timeRemaining)}</span>
            </div>
          </div>
        </div>

        {resources.gameOver && (
          <div className="mt-4 text-center">
            <div className={`text-xl font-bold mb-2 ${resources.hasWon ? 'text-green-400' : 'text-red-400'}`}>
              {resources.hasWon ? 'Good Job ! 🎉' : 'You can do better 😢'}
            </div>
            <p className="text-gray-300 mb-4">
              {resources.hasWon 
                ? "Well done, you understood how a Modern Data Stack works by making the right choices! If you want to go further and learn to master this stack you can train on ada-study.com and take advantage of the HEY20 code"
                : "Oops... you were almost there! Deploying a Modern Data Stack requires making the right choices, at the risk of losing money, slowing down production and losing control! But if you want to train, you can train on ada-study.com and take advantage of the code HEY20"}
            </p>
            <button
              onClick={restartGame}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm"
            >
              Start again
            </button>
          </div>
        )}
      </div>
    </header>
  );
}