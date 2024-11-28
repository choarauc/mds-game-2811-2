import React, { useState } from 'react';
import { useGameState } from '../context/GameContext';
import { BarChart as BarChartIcon, PieChart as PieChartIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

export default function FinancialCharts() {
  const { resources, governancePolicies } = useGameState();
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate revenue sources
  const dashboardRevenue = Object.values(resources.dashboards).reduce((total, revenue) => total + revenue, 0);
  const bitcoinValue = (resources.bitcoinBalance || 0) * resources.bitcoinPrice;
  const dataRevenue = Math.floor(resources.rawData / 10000) * 10;

  // Calculate expenses
  const governanceCosts = governancePolicies
    .filter(p => p.active)
    .reduce((total, policy) => total + policy.monthlyFee / 30, 0);
  const rawStorageCost = Math.floor(resources.rawData / 10000) * 0.01;
  const cleanStorageCost = Math.floor(resources.cleanData / 100) * 0.02;

  const revenueData = [
    { name: 'Dashboards', value: dashboardRevenue },
    { name: 'Bitcoin', value: bitcoinValue },
    { name: 'Data', value: dataRevenue },
  ];

  const expenseData = [
    { name: 'Governance', value: governanceCosts },
    { name: 'Raw Storage', value: rawStorageCost },
    { name: 'Clean Storage', value: cleanStorageCost },
  ];

  const COLORS = ['#60A5FA', '#F59E0B', '#34D399', '#EC4899'];

  return (
    <motion.div
      initial={{ x: -384 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-xl border border-blue-500/30"
    >
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
          <BarChartIcon className="text-blue-400" />
          P&L
        </h3>
        {isExpanded ? (
          <ChevronDown className="text-blue-400" />
        ) : (
          <ChevronUp className="text-blue-400" />
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 w-96 space-y-4">
              <div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Revenus', value: dashboardRevenue + bitcoinValue + dataRevenue },
                      { name: 'Charges', value: governanceCosts + rawStorageCost + cleanStorageCost }
                    ]}>
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                        labelStyle={{ color: '#9CA3AF' }}
                      />
                      <Bar dataKey="value" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 flex items-center gap-2 mb-2">
                    <PieChartIcon size={16} className="text-blue-400" />
                    Sources of income
                  </h4>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueData}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {revenueData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                          labelStyle={{ color: '#9CA3AF' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 flex items-center gap-2 mb-2">
                    <PieChartIcon size={16} className="text-red-400" />
                    Cost posts
                  </h4>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {expenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                          labelStyle={{ color: '#9CA3AF' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <h5 className="font-semibold text-gray-400 mb-1">Income</h5>
                  {revenueData.map((item, index) => (
                    <div key={item.name} className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        {item.name}
                      </span>
                      <span className="font-mono text-blue-400">{item.value.toFixed(2)} €/s</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h5 className="font-semibold text-gray-400 mb-1">Cost</h5>
                  {expenseData.map((item, index) => (
                    <div key={item.name} className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        {item.name}
                      </span>
                      <span className="font-mono text-red-400">-{item.value.toFixed(2)} €/s</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}