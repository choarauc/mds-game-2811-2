import React from 'react';
import { useGameState } from '../context/GameContext';
import { Brain, Zap } from 'lucide-react';

export default function TrainingCenter() {
  const { resources, models, trainModel } = useGameState();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-400">Active models</p>
          <p className="font-mono text-lg text-pink-400">
            {resources.models.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Production/s</p>
          <p className="font-mono text-lg text-pink-400">
            {resources.dataPerSecond.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {models.map((model, index) => (
          <button
            key={index}
            onClick={() => trainModel(index)}
            disabled={resources.cleanData < model.cost}
            className={`w-full p-2 rounded-lg flex items-center justify-between text-sm ${
              resources.cleanData >= model.cost
                ? 'bg-pink-600/20 border border-pink-500 hover:bg-pink-600/30'
                : 'bg-gray-700/20 border border-gray-700 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-2">
              <Brain size={16} className="text-pink-400" />
              <div className="flex flex-col items-start">
                <span>{model.name}</span>
                <span className="text-xs text-pink-300">
                  +{model.effect} data/s
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={12} className="text-yellow-400" />
              <span className="font-mono text-xs">
                {model.cost.toLocaleString()}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-2">
        Train models to automate data production and feed dashboards.
      </div>
    </div>
  );
}