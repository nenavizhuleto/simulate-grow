import { create } from 'zustand';
import { Simulation, StepMetrics, Environment } from '@/types/simulation';

interface SimulationState {
  simulation: Simulation | null;
  environment: Environment;
  metrics: StepMetrics[];
  isRunning: boolean;
  isComplete: boolean;
  
  setSimulation: (simulation: Simulation) => void;
  setEnvironment: (environment: Environment) => void;
  addMetric: (metric: StepMetrics) => void;
  setIsRunning: (isRunning: boolean) => void;
  setIsComplete: (isComplete: boolean) => void;
  reset: () => void;
}

const defaultEnvironment: Environment = {
  throughput: {
    volume: 5,
    interest: 0.5,
    maleRate: 0.5,
    femaleRate: 0.5,
    minAge: 10,
    maxAge: 60,
  },
  churnRate: 0.1,
};

export const useSimulationStore = create<SimulationState>((set) => ({
  simulation: null,
  environment: defaultEnvironment,
  metrics: [],
  isRunning: false,
  isComplete: false,
  
  setSimulation: (simulation) => set({ simulation }),
  setEnvironment: (environment) => set({ environment }),
  addMetric: (metric) => set((state) => ({ 
    metrics: [...state.metrics, metric] 
  })),
  setIsRunning: (isRunning) => set({ isRunning }),
  setIsComplete: (isComplete) => set({ isComplete }),
  reset: () => set({ 
    metrics: [], 
    isRunning: false, 
    isComplete: false 
  }),
}));