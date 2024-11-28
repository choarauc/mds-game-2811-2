import React, { useState } from 'react';
import { useGameState } from '../context/GameContext';
import { TrendingUp, TrendingDown, Bitcoin } from 'lucide-react';

export default function Trading() {
  const { resources, tradeBitcoin } = useGameState();
  const [amount, setAmount] = useState(0.1);

  if (!resources.businessUnits.finance) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-amber-500/30 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
          <Bitcoin className="text-amber-400" />
          Trading
        </h3>
        <span className="font-mono text-sm">
          {resources.bitcoinPrice.toLocaleString()} €
        </span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-400">Portfolio</p>
            <p className="font-mono text-lg text-amber-400">
              {resources.bitcoinBalance?.toFixed(3) || 0} BTC
            </p>
          </div>
          <div>
            <p className="text-gray-400">Valeur</p>
            <p className="font-mono text-lg text-amber-400">
              {((resources.bitcoinBalance || 0) * resources.bitcoinPrice).toLocaleString()} €
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-400">
            {amount} BTC = {(amount * resources.bitcoinPrice).toLocaleString()} €
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => tradeBitcoin('buy', amount)}
              disabled={resources.revenue < amount * resources.bitcoinPrice}
              className="flex items-center justify-center gap-2 bg-green-900/30 border border-green-500 p-2 rounded-lg hover:bg-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TrendingUp size={16} className="text-green-400" />
              <span>Acheter</span>
            </button>
            <button
              onClick={() => tradeBitcoin('sell', amount)}
              disabled={(resources.bitcoinBalance || 0) < amount}
              className="flex items-center justify-center gap-2 bg-red-900/30 border border-red-500 p-2 rounded-lg hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TrendingDown size={16} className="text-red-400" />
              <span>Vendre</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}