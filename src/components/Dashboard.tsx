import { useState, useCallback, useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useSimulationStore } from '@/stores/simulationStore';
import { SimulationControls } from './SimulationControls';
import { MetricsChart } from './MetricsChart';
import { MetricsCards } from './MetricsCards';
import { SimulationConfig } from './SimulationConfig';
import { ConnectionStatus } from './ConnectionStatus';
import { OutputMessage, StepMetrics } from '@/types/simulation';
import { toast } from '@/hooks/use-toast';
import { Activity, BarChart3 } from 'lucide-react';

const WS_URL = 'ws://localhost:8080/api/simulation';

export const Dashboard = () => {
  const [configOpen, setConfigOpen] = useState(false);
  const {
    simulation,
    environment,
    metrics,
    isRunning,
    setSimulation,
    setIsRunning,
    setIsComplete,
    addMetric,
    reset,
  } = useSimulationStore();

  const handleMessage = useCallback((message: OutputMessage) => {
    console.log('WebSocket message:', message);

    switch (message.type) {
      case 'default':
        if (message.data) {
          setSimulation(message.data);
          toast({
            title: 'Default configuration loaded',
            description: 'Simulation is ready to start',
          });
        }
        break;

      case 'init':
        toast({
          title: 'Configuration saved',
          description: 'Simulation initialized successfully',
        });
        break;

      case 'simulation':
        if (message.message === 'start') {
          setIsRunning(true);
          toast({
            title: 'Simulation started',
            description: `Running ${simulation?.totalDays} days simulation`,
          });
        } else if (message.message === 'stop') {
          setIsRunning(false);
          toast({
            title: 'Simulation stopped',
          });
        } else if (message.message === 'complete') {
          setIsRunning(false);
          setIsComplete(true);
          toast({
            title: 'Simulation complete',
            description: 'All days have been simulated',
          });
        }
        break;

      case 'step':
        if (message.data) {
          addMetric(message.data as StepMetrics);
        }
        break;

      case 'error':
        toast({
          title: 'Error',
          description: message.message || 'An error occurred',
          variant: 'destructive',
        });
        break;
    }
  }, [simulation, setSimulation, setIsRunning, setIsComplete, addMetric]);

  const { isConnected, isConnecting, sendMessage } = useWebSocket({
    url: WS_URL,
    onMessage: handleMessage,
    onOpen: () => {
      // Request default configuration when connected
      sendMessage({ action: 'default' });
    },
  });

  const handleStart = useCallback(() => {
    if (!simulation) {
      toast({
        title: 'No simulation configured',
        description: 'Please configure the simulation first',
        variant: 'destructive',
      });
      return;
    }

    sendMessage({
      action: 'start',
      data: {
        simulationId: simulation.id,
        environment,
      },
    });
  }, [simulation, environment, sendMessage]);

  const handleStop = useCallback(() => {
    if (!simulation) return;

    sendMessage({
      action: 'stop',
      data: {
        simulationId: simulation.id,
      },
    });
  }, [simulation, sendMessage]);

  const handleReset = useCallback(() => {
    reset();
    if (simulation) {
      sendMessage({ action: 'default' });
    }
  }, [simulation, reset, sendMessage]);

  const handleConfigSave = useCallback(() => {
    if (!simulation) return;

    sendMessage({
      action: 'init',
      data: simulation,
    });
  }, [simulation, sendMessage]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Background gradient effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Business Growth Simulator
              </h1>
              <p className="text-muted-foreground">
                Visualize and analyze your audience growth over time
              </p>
            </div>
          </div>
          <ConnectionStatus isConnected={isConnected} isConnecting={isConnecting} />
        </div>

        {/* Simulation Info */}
        {simulation && (
          <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-card border border-border/50">
            <BarChart3 className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Current Simulation</p>
              <p className="font-semibold">{simulation.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="font-semibold">
                Day {metrics.length} / {simulation.totalDays}
              </p>
            </div>
          </div>
        )}

        {/* Metrics Cards */}
        {metrics.length > 0 && <MetricsCards metrics={metrics} />}

        {/* Controls */}
        <SimulationControls
          onStart={handleStart}
          onStop={handleStop}
          onReset={handleReset}
          onConfigure={() => setConfigOpen(true)}
        />

        {/* Chart */}
        {metrics.length > 0 && <MetricsChart metrics={metrics} />}

        {/* Configuration Dialog */}
        <SimulationConfig
          open={configOpen}
          onOpenChange={setConfigOpen}
          onSave={handleConfigSave}
        />
      </div>
    </div>
  );
};