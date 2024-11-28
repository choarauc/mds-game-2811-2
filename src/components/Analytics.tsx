import React from 'react';
import { useGameState } from '../context/GameContext';
import { BarChart, LineChart, PieChart, Table } from 'lucide-react';

const DASHBOARD_TYPES = [
  {
    id: "basic",
    name: "Streamlit",
    icon: Table,
    cost: 5,
    revenuePerSecond: 1,
  },
  {
    id: "advanced",
    name: "Looker",
    icon: BarChart,
    cost: 25,
    revenuePerSecond: 5,
  },
  {
    id: "predictive",
    name: "Metabase",
    icon: LineChart,
    cost: 100,
    revenuePerSecond: 25,
  },
  {
    id: "enterprise",
    name: "Tableau",
    icon: PieChart,
    cost: 500,
    revenuePerSecond: 250,
  },
] as const;

export default function Analytics() {
  const { resources, createDashboard } = useGameState();

  const calculateTotalRevenue = () => {
    return Object.values(resources.dashboards).reduce((total, revenue) => total + revenue, 0);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-400">Dashboards</p>
          <p className="font-mono text-lg text-yellow-400">
            {Object.keys(resources.dashboards).length}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Income</p>
          <p className="font-mono text-lg text-yellow-400">
            {calculateTotalRevenue().toFixed(1)} €
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {DASHBOARD_TYPES.map((dashboard) => {
          const Icon = dashboard.icon;
          const isOwned = resources.dashboards[dashboard.id] !== undefined;

          return (
            <button
              key={dashboard.id}
              onClick={() => createDashboard(dashboard.id, dashboard.revenuePerSecond)}
              disabled={resources.models < dashboard.cost || isOwned}
              className={`w-full p-2 rounded-lg flex items-center justify-between text-sm ${
                isOwned
                  ? 'bg-green-900/30 border border-green-500'
                  : resources.models >= dashboard.cost
                  ? 'bg-yellow-600/20 border border-yellow-500 hover:bg-yellow-600/30'
                  : 'bg-gray-700/20 border border-gray-700 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon size={16} className="text-yellow-400" />
                <div className="flex flex-col items-start">
                  <span>{dashboard.name}</span>
                  <span className="text-xs text-yellow-300">
                    +{dashboard.revenuePerSecond} €/s
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end text-xs">
                {isOwned ? (
                  <span className="text-green-400">Active</span>
                ) : (
                  <>
                    <span className="text-gray-400">Cost: {dashboard.cost} models</span>
                    <span className="text-red-400">-{dashboard.cost * 50} € initial</span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-2">
        Create dashboards to generate revenue based on informed decisions.
      </div>
    </div>
  );
}