import React from 'react';
import { useGameState } from '../context/GameContext';
import { ArrowRight, Database, Server } from 'lucide-react';

const initialConnectors = [
  { name: "API Rest", cost: 100, throughput: 1 },
  { name: "Mage", cost: 500, throughput: 5 },
  { name: "Firebase", cost: 2000, throughput: 25 },
  { name: "ClickHouse", cost: 10000, throughput: 100 },
];

export default function DataPipeline() {
  const { resources, connectors, buildConnector } = useGameState();

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-400">Active connectors</p>
          <p className="font-mono text-lg text-orange-400">
            {resources.connectors.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Flow/s</p>
          <p className="font-mono text-lg text-orange-400">
            {resources.ingestedPerSecond.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {initialConnectors.map((connector, index) => (
          <button
            key={index}
            onClick={() => buildConnector(index)}
            disabled={resources.rawData < connector.cost}
            className={`w-full p-2 rounded-lg flex items-center justify-between text-sm ${
              resources.rawData >= connector.cost
                ? 'bg-orange-600/20 border border-orange-500 hover:bg-orange-600/30'
                : 'bg-gray-700/20 border border-gray-700 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-2">
              <Database size={16} className="text-orange-400" />
              <div className="flex flex-col items-start">
                <span>{connector.name}</span>
                <span className="text-xs text-orange-300">
                  +{connector.throughput} data/s
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight size={12} className="text-gray-400" />
              <Server size={16} className="text-orange-400" />
              <span className="font-mono text-xs">
                {connector.cost.toLocaleString()}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-2">
        Connectors automate the ingestion of data from various sources.
      </div>
    </div>
  );
}