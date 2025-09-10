import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSimulationStore } from '@/stores/simulationStore';

interface SimulationControlsProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onConfigure: () => void;
}

export const SimulationControls = ({
  onStart,
  onStop,
  onReset,
  onConfigure
}: SimulationControlsProps) => {
  const { isRunning, isComplete } = useSimulationStore();

  return (
    <Card className="p-6 bg-gradient-card border-border/50 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Simulation Controls</h3>
      <div className="flex gap-3 flex-wrap">
        <Button
          onClick={isRunning ? onStop : onStart}
          disabled={isComplete && !isRunning}
          className="bg-gradient-primary hover:opacity-90 transition-opacity"
          size="lg"
        >
          {isRunning ? (
            <>
              <Pause className="mr-2 h-5 w-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              Start
            </>
          )}
        </Button>
        
        <Button
          onClick={onReset}
          variant="secondary"
          size="lg"
          className="hover:bg-secondary/80"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Reset
        </Button>
        
        <Button
          onClick={onConfigure}
          variant="outline"
          size="lg"
          className="border-primary/30 hover:bg-primary/10"
        >
          <Settings className="mr-2 h-5 w-5" />
          Configure
        </Button>
      </div>
    </Card>
  );
};