import React from 'react';
import { useGameState } from '../context/GameContext';
import { DollarSign, Database, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TechTree() {
  const { resources, sellData, buyCleanData } = useGameState();

  const sellOptions = [
    {
      id: 'raw_data',
      name: 'Sell raw data',
      description: '10000 data = 10€',
      cost: 10000,
      type: 'raw',
      revenue: 10,
    },
    {
      id: 'clean_data',
      name: 'Sell clean data',
      description: '100 data = 10€',
      cost: 100,
      type: 'clean',
      revenue: 10,
    },
  ];

  const buyOptions = [
    {
      id: 'buy_clean_10',
      name: 'Buy clean data (small)',
      description: '10 clean data = 10€',
      cost: 10,
      cleanAmount: 10,
    },
    {
      id: 'buy_clean_100',
      name: 'Buy clean data (bulk)',
      description: '100 clean data = 100k raw data',
      cost: 100000,
      cleanAmount: 100,
      costType: 'raw',
    },
  ];

  return (
    <div className="space-y-2">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
          <DollarSign size={16} className="text-green-400" />
          Sell Data
        </h3>
        <div className="space-y-2">
          {sellOptions.map((option) => {
            const canSell = option.type === 'raw' 
              ? resources.rawData >= option.cost 
              : resources.cleanData >= option.cost;

            return (
              <motion.button
                key={option.id}
                whileHover={canSell ? { scale: 1.02 } : {}}
                onClick={() => sellData(option.id)}
                disabled={!canSell}
                className={`w-full p-2 rounded-lg border text-left ${
                  canSell
                    ? 'bg-gray-900/30 border-gray-700 hover:border-gray-500'
                    : 'bg-gray-900/10 border-gray-800 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="relative flex items-center gap-3">
                  <div className={`p-1 rounded-lg ${canSell ? 'bg-green-900/50' : 'bg-gray-800'}`}>
                    <Database size={16} className="text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-sm font-semibold truncate">{option.name}</h3>
                      <span className="text-xs font-mono ml-2 shrink-0 text-green-400">
                        +{option.revenue}€
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      {option.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
          <ArrowRightLeft size={16} className="text-blue-400" />
          Buy Clean Data
        </h3>
        <div className="space-y-2">
          {buyOptions.map((option) => {
            const canBuy = option.costType === 'raw'
              ? resources.rawData >= option.cost
              : resources.revenue >= option.cost;

            return (
              <motion.button
                key={option.id}
                whileHover={canBuy ? { scale: 1.02 } : {}}
                onClick={() => buyCleanData(option.id)}
                disabled={!canBuy}
                className={`w-full p-2 rounded-lg border text-left ${
                  canBuy
                    ? 'bg-gray-900/30 border-gray-700 hover:border-gray-500'
                    : 'bg-gray-900/10 border-gray-800 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="relative flex items-center gap-3">
                  <div className={`p-1 rounded-lg ${canBuy ? 'bg-blue-900/50' : 'bg-gray-800'}`}>
                    <Database size={16} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-sm font-semibold truncate">{option.name}</h3>
                      <span className="text-xs font-mono ml-2 shrink-0 text-blue-400">
                        {option.costType === 'raw' ? `${option.cost} raw` : `${option.cost}€`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      {option.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-2">
        Buy or sell data to optimize your operations.
      </div>
    </div>
  );
}