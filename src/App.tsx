import React, { useState } from 'react';
import { Brain, Database, Filter, DollarSign, PieChart, Workflow, Shield, Wrench, Users, Building } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import DataStation from './components/DataStation';
import CleaningStation from './components/CleaningStation';
import TrainingCenter from './components/TrainingCenter';
import TechTree from './components/TechTree';
import Tutorial from './components/Tutorial';
import DataPipeline from './components/DataPipeline';
import Analytics from './components/Analytics';
import DataGovernance from './components/DataGovernance';
import DataTools from './components/DataTools';
import Recruitment from './components/Recruitment';
import BusinessUnits from './components/BusinessUnits';
import Trading from './components/Trading';
import FinancialCharts from './components/FinancialCharts';
import DailyMeeting from './components/DailyMeeting';
import { GameProvider, useGameState } from './context/GameContext';

function AppContent() {
  const [showTutorial, setShowTutorial] = useState(true);
  const { resources, attendDailyMeeting, skipDailyMeeting } = useGameState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <Header />
      
      {showTutorial && <Tutorial onComplete={() => setShowTutorial(false)} />}
      
      <AnimatePresence>
        {resources.showDailyMeeting && (
          <DailyMeeting 
            onClose={skipDailyMeeting}
            onAttend={attendDailyMeeting}
          />
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Data Collection */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Database className="text-blue-400" />
              Sources
            </h2>
            <DataStation />
          </div>

          {/* Data Pipeline */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Workflow className="text-orange-400" />
              Pipeline
            </h2>
            <DataPipeline />
          </div>

          {/* Data Tools */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Wrench className="text-cyan-400" />
              Tools
            </h2>
            <DataTools />
          </div>

          {/* Data Cleaning */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Filter className="text-purple-400" />
              Transformation
            </h2>
            <CleaningStation />
          </div>

          {/* Model Training */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Brain className="text-pink-400" />
              Training
            </h2>
            <TrainingCenter />
          </div>

          {/* Analytics */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <PieChart className="text-yellow-400" />
              Analytics
            </h2>
            <Analytics />
          </div>

          {/* Data Governance */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Shield className="text-emerald-400" />
              Governance
            </h2>
            <DataGovernance />
          </div>

          {/* Sell Data */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <DollarSign className="text-green-400" />
              Marketplace
            </h2>
            <TechTree />
          </div>

          {/* Recruitment */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Users className="text-violet-400" />
              Recruitment
            </h2>
            <Recruitment />
          </div>

          {/* Business Units */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Building className="text-amber-400" />
              Business Units
            </h2>
            <BusinessUnits />
          </div>
        </div>
      </main>

      <Trading />
      <FinancialCharts />
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;