// Simulation types based on the WebSocket API schema

export interface TargetAudience {
  name: string;
  minAge: number;
  maxAge: number;
  maleInterest: number;
  femaleInterest: number;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  cost: number;
  targetAudience: TargetAudience;
  satisfactionRate: number;
}

export interface Business {
  id: number;
  name: string;
  services: Service[];
}

export interface Simulation {
  id: string;
  name: string;
  currentDay: number;
  totalDays: number;
  business: Business;
}

export interface Throughput {
  volume: number;
  interest: number;
  maleRate: number;
  femaleRate: number;
  minAge: number;
  maxAge: number;
}

export interface Environment {
  throughput: Throughput;
  churnRate: number;
}

export interface StepMetrics {
  Day: number;
  ChurnClientsCount: number;
  ReturnedClientsCount: number;
  OrganicClientsCount: number;
  AttractedClientsCount: number;
}

// WebSocket message types
export type Action = "default" | "init" | "start" | "stop";

export interface InputMessage {
  action: Action;
  data?: any;
}

export interface OutputMessage {
  type: string;
  message: string;
  data: any;
}

export interface StartActionData {
  simulationId: string;
  environment: Environment;
}

export interface StopActionData {
  simulationId: string;
}