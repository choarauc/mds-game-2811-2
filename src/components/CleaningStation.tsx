import React from 'react';
import { useGameState } from '../context/GameContext';
import { ArrowRight, Zap, Database } from 'lucide-react';

export default function CleaningStation() {
  const { resources, cleanData } = useGameState();

  // Calculate cleaning ratio based on data quality and Data Engineer
  const cleaningRatio = resources.employees?.engineer ? 1 : Math.max(2, Math.floor(10 * (1 - resources.dataQuality)));
  const outputRatio = resources.employees?.engineer ? 1 : Math.ceil(10 / cleaningRatio);

  // Calculate storage costs
  const rawStorageCost = Math.floor(resources.rawData / 10000) * 0.10;
  const cleanStorageCost = Math.floor(resources.cleanData / 100) * 0.20;
  const totalStorageCost = rawStorageCost + cleanStorageCost;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <button
          onClick={cleanData}
          disabled={resources.rawData < cleaningRatio}
          className="relative group mb-4"
        >
          <div className="absolute inset-0 bg-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className={`relative bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-full cursor-pointer transform hover:scale-105 transition-transform ${
            resources.rawData < cleaningRatio ? 'opacity-50 cursor-not-allowed' : ''
          }`}>
            <span className="text-2xl font-bold">{cleaningRatio}:{outputRatio}</span>
          </div>
        </button>
        
        <div className="grid grid-cols-2 gap-4 items-center text-sm">
          <div>
            <p className="text-gray-400">Raw data</p>
            <p className="font-mono text-lg text-blue-400">
              {resources.rawData.toLocaleString()}
            </p>
          </div>
          <ArrowRight className="text-gray-400 col-span-2" />
          <div>
            <p className="text-gray-400">Cleaned data</p>
            <p className="font-mono text-lg text-purple-400">
              {resources.cleanData.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black/20 rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Zap className="text-yellow-400" size={14} />
          <span>Auto-cleaning: {resources.cleaningPerSecond.toFixed(1)}/s</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Zap className="text-green-400" size={14} />
          <span>Quality: {(resources.dataQuality * 100).toFixed(0)}%</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Zap className="text-purple-400" size={14} />
          <span>Ratio: {cleaningRatio}:{outputRatio}</span>
        </div>
      </div>

      <div className="bg-blue-900/20 rounded-lg p-3 space-y-2 border border-blue-500/30">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Database size={14} className="text-blue-400" />
            <span className="text-gray-400">Raw Storage</span>
          </div>
          <span className="font-mono text-blue-400">-{rawStorageCost.toFixed(2)} €/s</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Database size={14} className="text-purple-400" />
            <span className="text-gray-400">Clean Storage</span>
          </div>
          <span className="font-mono text-purple-400">-{cleanStorageCost.toFixed(2)} €/s</span>
        </div>
        <div className="flex items-center justify-between text-xs font-semibold border-t border-blue-500/30 pt-2">
          <span className="text-gray-400">Total cost</span>
          <span className="font-mono text-red-400">-{totalStorageCost.toFixed(2)} €/s</span>
        </div>
      </div>
    </div>
  );
}