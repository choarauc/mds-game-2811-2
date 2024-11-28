import React from 'react';
import { useGameState } from '../context/GameContext';
import { Users, Brain, Star, Briefcase } from 'lucide-react';

const EMPLOYEES = [
  {
    id: 'analyst',
    name: 'Data Analyst',
    icon: Brain,
    cost: 5000,
    description: '+10% revenue per dashboard ',
  },
  {
    id: 'engineer',
    name: 'Data Engineer',
    icon: Star,
    cost: 7000,
    description: 'Transformation ratio 1:1',
  },
  {
    id: 'lead',
    name: 'Team Lead',
    icon: Users,
    cost: 9000,
    description: 'x2 on data collection',
  },
  {
    id: 'head',
    name: 'Head of Data',
    icon: Briefcase,
    cost: 12000,
    description: 'Unlock Business Units',
  },
];

export default function Recruitment() {
  const { resources, hireEmployee } = useGameState();

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-400">Budget</p>
          <p className="font-mono text-lg text-violet-400">
            {resources.revenue.toLocaleString()} €
          </p>
        </div>
        <div>
          <p className="text-gray-400">Team</p>
          <p className="font-mono text-lg text-violet-400">
            {Object.keys(resources.employees).length}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {EMPLOYEES.map((employee) => {
          const Icon = employee.icon;
          const isHired = resources.employees[employee.id];

          return (
            <button
              key={employee.id}
              onClick={() => hireEmployee(employee.id)}
              disabled={resources.revenue < employee.cost || isHired}
              className={`w-full p-2 rounded-lg flex items-center justify-between text-sm ${
                isHired
                  ? 'bg-green-900/30 border border-green-500'
                  : resources.revenue >= employee.cost
                  ? 'bg-violet-600/20 border border-violet-500 hover:bg-violet-600/30'
                  : 'bg-gray-700/20 border border-gray-700 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon size={16} className="text-violet-400" />
                <div className="flex flex-col items-start">
                  <span>{employee.name}</span>
                  <span className="text-xs text-violet-300">
                    {employee.description}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end text-xs">
                {isHired ? (
                  <span className="text-green-400">Recruited</span>
                ) : (
                  <span className="font-mono">{employee.cost.toLocaleString()} €</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-2">
        Recruit employees to scale your business.
      </div>
    </div>
  );
}