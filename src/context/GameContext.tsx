import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateCleaningOutput, calculateAutomaticSale } from '../utils/cleaningUtils';

interface Resources {
  rawData: number;
  cleanData: number;
  models: number;
  dataPerClick: number;
  dataPerSecond: number;
  cleaningPerSecond: number;
  dataQuality: number;
  connectors: number;
  ingestedPerSecond: number;
  dashboards: Record<string, number>;
  revenue: number;
  timeRemaining: number;
  gameOver: boolean;
  hasWon: boolean;
  securityBonusCollected: boolean;
  employees: Record<string, boolean>;
  businessUnits: Record<string, boolean>;
  bitcoinBalance: number;
  bitcoinPrice: number;
  autoSaleEnabled: boolean;
  showDailyMeeting: boolean;
}

interface Tool {
  name: string;
  type: 'quality' | 'cleaning' | 'automation';
  cost: number;
  effect: number;
  purchased: boolean;
}

interface Upgrade {
  name: string;
  cost: number;
  effect: number;
  purchased: boolean;
}

interface Model {
  name: string;
  cost: number;
  effect: number;
}

interface Connector {
  name: string;
  cost: number;
  throughput: number;
}

interface GovernancePolicy {
  id: string;
  name: string;
  description: string;
  cost: number;
  monthlyFee: number;
  reputationBonus: number;
  riskReduction: number;
  active: boolean;
}

interface GameContextType {
  resources: Resources;
  tools: Tool[];
  connectors: Connector[];
  models: Model[];
  upgrades: Upgrade[];
  governancePolicies: GovernancePolicy[];
  collectData: () => void;
  cleanData: () => void;
  trainModel: (index: number) => void;
  purchaseUpgrade: (index: number) => void;
  purchaseTool: (index: number) => void;
  buildConnector: (index: number) => void;
  togglePolicy: (id: string) => void;
  createDashboard: (id: string, revenue: number) => void;
  sellData: (type: string) => void;
  buyCleanData: (id: string) => void;
  restartGame: () => void;
  hireEmployee: (id: string) => void;
  activateBusinessUnit: (id: string) => void;
  tradeBitcoin: (action: 'buy' | 'sell', amount: number) => void;
  attendDailyMeeting: () => void;
  skipDailyMeeting: () => void;
}

const initialTools: Tool[] = [
  {
    name: "Great Expectations",
    type: "quality",
    cost: 500,
    effect: 0.2,
    purchased: false,
  },
  {
    name: "DBT Cloud",
    type: "cleaning",
    cost: 1000,
    effect: 2,
    purchased: false,
  },
  {
    name: "Airflow",
    type: "automation",
    cost: 2000,
    effect: 0.5,
    purchased: false,
  },
  {
    name: "Fivetran",
    type: "cleaning",
    cost: 3000,
    effect: 5,
    purchased: false,
  },
  {
    name: "Monte Carlo",
    type: "quality",
    cost: 5000,
    effect: 0.3,
    purchased: false,
  },
];

const initialUpgrades: Upgrade[] = [
  { name: "Excel", cost: 100, effect: 1, purchased: false },
  { name: "HubSpot", cost: 500, effect: 5, purchased: false },
  { name: "Google Analytics", cost: 2000, effect: 20, purchased: false },
  { name: "SalesForce", cost: 10000, effect: 100, purchased: false },
];

const initialModels: Model[] = [
  { name: "Linear Regression", cost: 50, effect: 1 },
  { name: "Mini Rocket", cost: 200, effect: 5 },
  { name: "Keras", cost: 1000, effect: 25 },
  { name: "PyCaret", cost: 5000, effect: 100 },
];

const initialConnectors: Connector[] = [
  { name: "API Rest", cost: 100, throughput: 1 },
  { name: "Mage", cost: 500, throughput: 5 },
  { name: "Firebase", cost: 2000, throughput: 25 },
  { name: "ClickHouse", cost: 10000, throughput: 100 },
];

const initialGovernancePolicies: GovernancePolicy[] = [
  {
    id: "gdpr",
    name: "GDPR Compliance",
    description: "Compliance with European laws",
    cost: 5000,
    monthlyFee: 1000,
    reputationBonus: 10,
    riskReduction: 0.3,
    active: false,
  },
  {
    id: "rbac",
    name: "RBAC Advanced",
    description: "Fine access management",
    cost: 2000,
    monthlyFee: 500,
    reputationBonus: 5,
    riskReduction: 0.2,
    active: false,
  },
  {
    id: "audit",
    name: "Audit Trail",
    description: "Lineage & Data Catalog",
    cost: 3000,
    monthlyFee: 750,
    reputationBonus: 7,
    riskReduction: 0.25,
    active: false,
  },
];

const initialResources: Resources = {
  rawData: 0,
  cleanData: 0,
  models: 0,
  dataPerClick: 1,
  dataPerSecond: 0,
  cleaningPerSecond: 0,
  dataQuality: 0.1,
  connectors: 0,
  ingestedPerSecond: 0,
  dashboards: {},
  revenue: 5000,
  timeRemaining: 30 * 60,
  gameOver: false,
  hasWon: false,
  securityBonusCollected: false,
  employees: {},
  businessUnits: {},
  bitcoinBalance: 0,
  bitcoinPrice: 30000,
  autoSaleEnabled: false,
  showDailyMeeting: false,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = useState<Resources>(initialResources);
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(initialUpgrades);
  const [governancePolicies, setGovernancePolicies] = useState<GovernancePolicy[]>(initialGovernancePolicies);

  const collectData = () => {
    if (!resources.gameOver) {
      const multiplier = resources.employees.lead ? 2 : 1;
      setResources(prev => ({
        ...prev,
        rawData: prev.rawData + (prev.dataPerClick * multiplier),
      }));
    }
  };

  const cleanData = () => {
    if (!resources.gameOver) {
      const cleaningRatio = resources.employees.engineer ? 1 : Math.max(2, Math.floor(10 * (1 - resources.dataQuality)));
      if (resources.rawData >= cleaningRatio) {
        const outputRatio = resources.employees.engineer ? 1 : Math.ceil(10 / cleaningRatio);
        setResources(prev => ({
          ...prev,
          rawData: prev.rawData - cleaningRatio,
          cleanData: prev.cleanData + outputRatio,
        }));
      }
    }
  };

  const trainModel = (index: number) => {
    if (!resources.gameOver) {
      const model = initialModels[index];
      if (resources.cleanData >= model.cost) {
        setResources(prev => ({
          ...prev,
          cleanData: prev.cleanData - model.cost,
          models: prev.models + 1,
          dataPerSecond: prev.dataPerSecond + model.effect,
        }));
      }
    }
  };

  const purchaseUpgrade = (index: number) => {
    if (!resources.gameOver) {
      const upgrade = upgrades[index];
      if (resources.rawData >= upgrade.cost && !upgrade.purchased) {
        setResources(prev => ({
          ...prev,
          rawData: prev.rawData - upgrade.cost,
          dataPerClick: prev.dataPerClick + upgrade.effect,
        }));
        setUpgrades(prev => prev.map((u, i) => 
          i === index ? { ...u, purchased: true } : u
        ));
      }
    }
  };

  const purchaseTool = (index: number) => {
    if (!resources.gameOver) {
      const tool = tools[index];
      if (resources.revenue >= tool.cost && !tool.purchased) {
        setResources(prev => {
          let newResources = {
            ...prev,
            revenue: prev.revenue - tool.cost,
          };

          switch (tool.type) {
            case 'quality':
              newResources.dataQuality = Math.min(1, prev.dataQuality + tool.effect);
              break;
            case 'cleaning':
              newResources.cleaningPerSecond = prev.cleaningPerSecond + tool.effect;
              break;
            case 'automation':
              newResources.autoSaleEnabled = true;
              break;
          }

          return newResources;
        });
        
        setTools(prev => prev.map((t, i) => 
          i === index ? { ...t, purchased: true } : t
        ));
      }
    }
  };

  const buildConnector = (index: number) => {
    if (!resources.gameOver) {
      const connector = initialConnectors[index];
      if (resources.rawData >= connector.cost) {
        setResources(prev => ({
          ...prev,
          rawData: prev.rawData - connector.cost,
          connectors: prev.connectors + 1,
          ingestedPerSecond: prev.ingestedPerSecond + connector.throughput,
        }));
      }
    }
  };

  const togglePolicy = (id: string) => {
    if (!resources.gameOver) {
      setGovernancePolicies(prev => prev.map(policy => {
        if (policy.id === id) {
          if (!policy.active && resources.revenue >= policy.cost) {
            setResources(prev => ({
              ...prev,
              revenue: prev.revenue - policy.cost,
            }));
            return { ...policy, active: true };
          }
          return { ...policy, active: false };
        }
        return policy;
      }));
    }
  };

  const createDashboard = (id: string, revenue: number) => {
    if (!resources.gameOver && !resources.dashboards[id]) {
      const cost = {
        basic: 5,
        advanced: 25,
        predictive: 100,
        enterprise: 500,
      }[id] || 0;

      if (resources.models >= cost) {
        setResources(prev => ({
          ...prev,
          models: prev.models - cost,
          revenue: prev.revenue - cost * 50,
          dashboards: { ...prev.dashboards, [id]: revenue * (resources.employees.analyst ? 1.1 : 1) },
        }));
      }
    }
  };

  const sellData = (type: string) => {
    if (!resources.gameOver) {
      if (type === 'raw_data' && resources.rawData >= 10000) {
        setResources(prev => ({
          ...prev,
          rawData: prev.rawData - 10000,
          revenue: prev.revenue + 10,
        }));
      } else if (type === 'clean_data' && resources.cleanData >= 100) {
        setResources(prev => ({
          ...prev,
          cleanData: prev.cleanData - 100,
          revenue: prev.revenue + 10,
        }));
      }
    }
  };

  const buyCleanData = (id: string) => {
    if (!resources.gameOver) {
      if (id === 'buy_clean_10' && resources.revenue >= 10) {
        setResources(prev => ({
          ...prev,
          revenue: prev.revenue - 10,
          cleanData: prev.cleanData + 10,
        }));
      } else if (id === 'buy_clean_100' && resources.rawData >= 100000) {
        setResources(prev => ({
          ...prev,
          rawData: prev.rawData - 100000,
          cleanData: prev.cleanData + 100,
        }));
      }
    }
  };

  const hireEmployee = (id: string) => {
    if (!resources.gameOver && !resources.employees[id]) {
      const costs = {
        analyst: 5000,
        engineer: 7000,
        lead: 9000,
        head: 12000,
      };

      const cost = costs[id as keyof typeof costs];
      if (resources.revenue >= cost) {
        setResources(prev => ({
          ...prev,
          revenue: prev.revenue - cost,
          employees: { ...prev.employees, [id]: true },
        }));
      }
    }
  };

  const activateBusinessUnit = (id: string) => {
    if (!resources.gameOver && !resources.businessUnits[id] && resources.employees.head) {
      setResources(prev => {
        const newResources = {
          ...prev,
          businessUnits: { ...prev.businessUnits, [id]: true },
        };

        if (id === 'marketing') {
          newResources.timeRemaining += 30 * 60; // Add 30 minutes
        }

        return newResources;
      });
    }
  };

  const tradeBitcoin = (action: 'buy' | 'sell', amount: number) => {
    if (!resources.gameOver && resources.businessUnits.finance) {
      const value = amount * resources.bitcoinPrice;

      if (action === 'buy' && resources.revenue >= value) {
        setResources(prev => ({
          ...prev,
          revenue: prev.revenue - value,
          bitcoinBalance: (prev.bitcoinBalance || 0) + amount,
        }));
      } else if (action === 'sell' && resources.bitcoinBalance >= amount) {
        setResources(prev => ({
          ...prev,
          revenue: prev.revenue + value,
          bitcoinBalance: prev.bitcoinBalance - amount,
        }));
      }
    }
  };

  const attendDailyMeeting = () => {
    window.open('http://www.ada-study.com/?utm_source=linkedin&utm_medium=social&utm_campaign=profile_game&utm_content=visit_website/', '_blank');
    setResources(prev => ({
      ...prev,
      revenue: prev.revenue + 500,
      showDailyMeeting: false,
    }));
  };

  const skipDailyMeeting = () => {
    setResources(prev => ({
      ...prev,
      showDailyMeeting: false,
    }));
  };

  const restartGame = () => {
    setResources(initialResources);
    setTools(initialTools);
    setUpgrades(initialUpgrades);
    setGovernancePolicies(initialGovernancePolicies);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!resources.gameOver) {
        setResources(prev => {
          const activePolicies = governancePolicies.filter(p => p.active).length;
          const shouldAwardBonus = activePolicies === 3 && !prev.securityBonusCollected;

          const totalCleaningPerSecond = prev.cleaningPerSecond;
          const availableRawData = prev.rawData;
          
          const cleanedData = availableRawData > 0 ? calculateCleaningOutput(availableRawData, totalCleaningPerSecond, prev.dataQuality) : 0;

          const { amountToSell, revenue } = prev.autoSaleEnabled 
            ? calculateAutomaticSale(prev.rawData)
            : { amountToSell: 0, revenue: 0 };

          const dashboardRevenue = Object.values(prev.dashboards).reduce((total, revenue) => total + revenue, 0);

          const governanceCosts = governancePolicies
            .filter(p => p.active)
            .reduce((total, policy) => total + policy.monthlyFee / 30, 0);

          const rawStorageCost = Math.floor(prev.rawData / 10000) * 0.01;
          const cleanStorageCost = Math.floor(prev.cleanData / 100) * 0.02;
          const totalStorageCost = rawStorageCost + cleanStorageCost;

          const priceChange = (Math.random() - 0.5) * 1000;
          const newBitcoinPrice = Math.max(1000, prev.bitcoinPrice + priceChange);

          const newTimeRemaining = prev.timeRemaining - 1;
          const gameOver = newTimeRemaining <= 0;
          const hasWon = gameOver && prev.revenue >= 15000;

          const showDailyMeeting = newTimeRemaining === (25 * 60);

          return {
            ...prev,
            rawData: Math.max(0, prev.rawData + prev.dataPerSecond + prev.ingestedPerSecond - cleanedData - amountToSell),
            cleanData: prev.cleanData + cleanedData,
            revenue: prev.revenue + dashboardRevenue - governanceCosts + revenue - totalStorageCost + (shouldAwardBonus ? 15000 : 0),
            timeRemaining: newTimeRemaining,
            gameOver,
            hasWon,
            securityBonusCollected: shouldAwardBonus ? true : prev.securityBonusCollected,
            bitcoinPrice: newBitcoinPrice,
            showDailyMeeting: showDailyMeeting || prev.showDailyMeeting,
          };
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [resources.gameOver, governancePolicies]);

  return (
    <GameContext.Provider
      value={{
        resources,
        tools,
        connectors: initialConnectors,
        models: initialModels,
        upgrades,
        governancePolicies,
        collectData,
        cleanData,
        trainModel,
        purchaseUpgrade,
        purchaseTool,
        buildConnector,
        togglePolicy,
        createDashboard,
        sellData,
        buyCleanData,
        restartGame,
        hireEmployee,
        activateBusinessUnit,
        tradeBitcoin,
        attendDailyMeeting,
        skipDailyMeeting,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}