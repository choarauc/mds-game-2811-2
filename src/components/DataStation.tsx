import React from 'react';
import { useGameState } from '../context/GameContext';
import { Zap } from 'lucide-react';

export default function DataStation() {
  const { resources, collectData, upgrades, purchaseUpgrade } = useGameState();

  return (
    <div className="space-y-4">
      <div className="text-center">
        <button
          onClick={collectData}
          className="relative group mb-4"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-full cursor-pointer transform hover:scale-105 transition-transform">
            <span className="text-2xl font-bold">+{resources.dataPerClick}</span>
          </div>
        </button>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Raw data</p>
            <p className="font-mono text-lg text-blue-400">
              {resources.rawData.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Per second</p>
            <p className="font-mono text-lg text-blue-400">
              {resources.dataPerSecond.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {upgrades.map((upgrade, index) => (
          <button
            key={index}
            onClick={() => purchaseUpgrade(index)}
            disabled={resources.rawData < upgrade.cost || upgrade.purchased}
            className={`w-full p-2 rounded-lg flex items-center justify-between text-sm ${
              upgrade.purchased
                ? 'bg-green-600/20 border border-green-500'
                : resources.rawData >= upgrade.cost
                ? 'bg-indigo-600/20 border border-indigo-500 hover:bg-indigo-600/30'
                : 'bg-gray-700/20 border border-gray-700 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-2">
              <Zap size={16} className={upgrade.purchased ? "text-green-400" : "text-indigo-400"} />
              <div className="flex flex-col items-start">
                <span>{upgrade.name}</span>
                {upgrade.purchased ? (
                  <span className="text-xs text-green-300">Active</span>
                ) : (
                  <span className="text-xs text-gray-400">+{upgrade.effect} per click</span>
                )}
              </div>
            </div>
            {!upgrade.purchased && (
              <span className="font-mono text-xs">{upgrade.cost.toLocaleString()}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}