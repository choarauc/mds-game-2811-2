import React from 'react';
import { useGameState } from '../context/GameContext';
import { Wrench, Wand, CheckCircle } from 'lucide-react';

export default function DataTools() {
  const { resources, tools, purchaseTool } = useGameState();

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-400">Auto-cleaning/s</p>
          <p className="font-mono text-lg text-cyan-400">
            {resources.cleaningPerSecond.toFixed(1)}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Quality</p>
          <p className="font-mono text-lg text-cyan-400">
            {(resources.dataQuality * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {tools.map((tool, index) => (
          <button
            key={index}
            onClick={() => purchaseTool(index)}
            disabled={resources.revenue < tool.cost || tool.purchased}
            className={`w-full p-2 rounded-lg flex items-center justify-between text-sm ${
              tool.purchased
                ? 'bg-green-900/30 border border-green-500'
                : resources.revenue >= tool.cost
                ? 'bg-cyan-600/20 border border-cyan-500 hover:bg-cyan-600/30'
                : 'bg-gray-700/20 border border-gray-700 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-2">
              {tool.type === 'quality' && <CheckCircle size={16} className="text-cyan-400" />}
              {tool.type === 'cleaning' && <Wand size={16} className="text-cyan-400" />}
              {tool.type === 'automation' && <Wrench size={16} className="text-cyan-400" />}
              <div className="flex flex-col items-start">
                <span>{tool.name}</span>
                <span className="text-xs text-cyan-300">
                  {tool.type === 'quality' && `+${(tool.effect * 100).toFixed(0)}% quality`}
                  {tool.type === 'cleaning' && `+${tool.effect.toFixed(1)} cleaning/s`}
                  {tool.type === 'automation' && `Auto sale 20% if >100k raw data`}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end text-xs">
              {tool.purchased ? (
                <span className="text-green-400">Active</span>
              ) : (
                <span className="font-mono">{tool.cost.toLocaleString()} €</span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-2">
        Invest in tools to automate cleaning and improve data quality. Be careful, it is the need that defines the tool and not the other way around.
      </div>
    </div>
  );
}