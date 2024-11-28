import React from 'react';
import { useGameState } from '../context/GameContext';
import { Target, TrendingUp, Users, LineChart } from 'lucide-react';

const BUSINESS_UNITS = [
  {
    id: 'marketing',
    name: 'Marketing',
    icon: Target,
    description: '+30 minutes of play',
    effect: 'time',
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: TrendingUp,
    description: 'Trading Bitcoin',
    effect: 'trading',
  },
  {
    id: 'hr',
    name: 'Human resources',
    icon: Users,
    description: 'Transfer of employees (+30%)',
    effect: 'employees',
  },
  {
    id: 'sales',
    name: 'Sales',
    icon: LineChart,
    description: 'Dashboard sale (x10)',
    effect: 'dashboards',
  },
];

export default function BusinessUnits() {
  const { resources, activateBusinessUnit } = useGameState();
  const headOfDataHired = resources.employees?.head;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-400">Business Units</p>
          <p className="font-mono text-lg text-amber-400">
            {Object.keys(resources.businessUnits).length}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Status</p>
          <p className="font-mono text-lg text-amber-400">
            {headOfDataHired ? 'Unlocked' : 'Locked'}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {BUSINESS_UNITS.map((unit) => {
          const Icon = unit.icon;
          const isActive = resources.businessUnits[unit.id];

          return (
            <button
              key={unit.id}
              onClick={() => activateBusinessUnit(unit.id)}
              disabled={!headOfDataHired || isActive}
              className={`w-full p-2 rounded-lg flex items-center justify-between text-sm ${
                isActive
                  ? 'bg-green-900/30 border border-green-500'
                  : headOfDataHired
                  ? 'bg-amber-600/20 border border-amber-500 hover:bg-amber-600/30'
                  : 'bg-gray-700/20 border border-gray-700 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon size={16} className="text-amber-400" />
                <div className="flex flex-col items-start">
                  <span>{unit.name}</span>
                  <span className="text-xs text-amber-300">
                    {unit.description}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end text-xs">
                {isActive ? (
                  <span className="text-green-400">Active</span>
                ) : !headOfDataHired ? (
                  <span className="text-gray-400">Locked</span>
                ) : (
                  <span className="text-amber-400">Disponible</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-2">
        {headOfDataHired
          ? 'Activate Business Units to unlock new features.'
          : 'Recruit a Head of Data to unlock Business Units.'}
      </div>
    </div>
  );
}