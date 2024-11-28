import React from 'react';
import { useGameState } from '../context/GameContext';
import { Shield, AlertTriangle, TrendingUp, DollarSign, Users } from 'lucide-react';

export default function DataGovernance() {
  const { resources, governancePolicies, togglePolicy } = useGameState();

  const activePolicies = governancePolicies.filter(p => p.active).length;
  const allPoliciesActive = activePolicies === 3;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-400">Budget</p>
          <p className="font-mono text-lg text-emerald-400">
            {resources.revenue.toLocaleString()} €
          </p>
        </div>
        <div>
          <p className="text-gray-400">Security</p>
          <p className="font-mono text-lg text-emerald-400">
            {activePolicies}/3
          </p>
        </div>
      </div>

      {allPoliciesActive && (
        <div className="bg-emerald-900/30 border border-emerald-500 rounded-lg p-3 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-emerald-400" />
            <span className="text-emerald-400 font-semibold">Security Bonus Unlocked!</span>
          </div>
          <p className="text-gray-300 text-xs">
            +15,000 € for achieving full compliance
          </p>
        </div>
      )}

      <div className="space-y-2">
        {governancePolicies?.map((policy) => (
          <button
            key={policy.id}
            onClick={() => togglePolicy(policy.id)}
            disabled={!policy.active && resources.revenue < policy.cost}
            className={`w-full p-2 rounded-lg text-left ${
              policy.active
                ? 'bg-emerald-900/30 border border-emerald-500'
                : resources.revenue >= policy.cost
                ? 'bg-emerald-600/20 border border-emerald-500 hover:bg-emerald-600/30'
                : 'bg-gray-700/20 border border-gray-700 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {policy.id === 'rbac' ? (
                  <Users size={16} className="text-emerald-400" />
                ) : (
                  <Shield size={16} className="text-emerald-400" />
                )}
                <span className="font-medium">{policy.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {policy.active ? (
                  <span className="text-emerald-400">Active</span>
                ) : (
                  <span className="font-mono">{policy.cost.toLocaleString()} €</span>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-1">{policy.description}</p>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <DollarSign size={12} className="text-red-400" />
                <span className="text-gray-400">-{policy.monthlyFee}/month</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp size={12} className="text-emerald-400" />
                <span className="text-gray-400">+{policy.reputationBonus} rep</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertTriangle size={12} className="text-yellow-400" />
                <span className="text-gray-400">-{policy.riskReduction * 100}% risk</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-2">
        Invest in security and compliance to protect your data, and unlock your bonus!
      </div>
    </div>
  );
}