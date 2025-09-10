import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Simulation, Service, Environment } from '@/types/simulation';
import { useSimulationStore } from '@/stores/simulationStore';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2 } from 'lucide-react';

interface SimulationConfigProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export const SimulationConfig = ({ open, onOpenChange, onSave }: SimulationConfigProps) => {
  const { simulation, environment, setSimulation, setEnvironment } = useSimulationStore();
  const [localSim, setLocalSim] = useState<Simulation | null>(null);
  const [localEnv, setLocalEnv] = useState<Environment>(environment);

  // Initialize local state when dialog opens
  React.useEffect(() => {
    if (open && simulation) {
      setLocalSim(simulation);
      setLocalEnv(environment);
    }
  }, [open, simulation, environment]);

  const handleSave = () => {
    if (localSim) {
      setSimulation(localSim);
      setEnvironment(localEnv);
      onSave();
      onOpenChange(false);
    }
  };

  const updateService = (index: number, updates: Partial<Service>) => {
    if (!localSim) return;
    const newServices = [...localSim.business.services];
    newServices[index] = { ...newServices[index], ...updates };
    setLocalSim({
      ...localSim,
      business: { ...localSim.business, services: newServices }
    });
  };

  const addService = () => {
    if (!localSim) return;
    const newService: Service = {
      id: localSim.business.services.length,
      name: 'New Service',
      price: 100,
      cost: 50,
      satisfactionRate: 0.7,
      targetAudience: {
        name: 'general',
        minAge: 18,
        maxAge: 60,
        maleInterest: 0.5,
        femaleInterest: 0.5
      }
    };
    setLocalSim({
      ...localSim,
      business: {
        ...localSim.business,
        services: [...localSim.business.services, newService]
      }
    });
  };

  const removeService = (index: number) => {
    if (!localSim) return;
    const newServices = localSim.business.services.filter((_, i) => i !== index);
    setLocalSim({
      ...localSim,
      business: { ...localSim.business, services: newServices }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle>Simulation Configuration</DialogTitle>
          <DialogDescription>
            Configure your business simulation parameters
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sim-name">Simulation Name</Label>
              <Input
                id="sim-name"
                value={localSim?.name || ''}
                onChange={(e) => localSim && setLocalSim({ ...localSim, name: e.target.value })}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total-days">Total Days</Label>
              <Input
                id="total-days"
                type="number"
                value={localSim?.totalDays || 30}
                onChange={(e) => localSim && setLocalSim({ 
                  ...localSim, 
                  totalDays: parseInt(e.target.value) || 30 
                })}
                className="bg-secondary border-border"
              />
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Services Configuration</h3>
              <Button 
                onClick={addService}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Service
              </Button>
            </div>
            {localSim?.business.services.map((service, index) => (
              <Card key={index} className="p-4 bg-secondary border-border">
                <div className="flex justify-between items-start mb-3">
                  <Input
                    value={service.name}
                    onChange={(e) => updateService(index, { name: e.target.value })}
                    className="font-semibold bg-background border-border max-w-[200px]"
                  />
                  <Button
                    onClick={() => removeService(index)}
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={service.price}
                      onChange={(e) => updateService(index, { 
                        price: parseInt(e.target.value) || 0 
                      })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cost</Label>
                    <Input
                      type="number"
                      value={service.cost}
                      onChange={(e) => updateService(index, { 
                        cost: parseInt(e.target.value) || 0 
                      })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Satisfaction Rate: {(service.satisfactionRate * 100).toFixed(0)}%</Label>
                    <Slider
                      value={[service.satisfactionRate * 100]}
                      onValueChange={(value) => updateService(index, { 
                        satisfactionRate: value[0] / 100 
                      })}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            ))}
            {(!localSim?.business.services || localSim.business.services.length === 0) && (
              <Card className="p-8 bg-secondary/50 border-border text-center">
                <p className="text-muted-foreground mb-4">No services configured yet</p>
                <Button onClick={addService} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Service
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="environment" className="space-y-4">
            <Card className="p-4 bg-secondary border-border">
              <h4 className="font-semibold mb-3">Throughput Settings</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Daily Volume: {localEnv.throughput.volume}</Label>
                  <Slider
                    value={[localEnv.throughput.volume]}
                    onValueChange={(value) => setLocalEnv({
                      ...localEnv,
                      throughput: { ...localEnv.throughput, volume: value[0] }
                    })}
                    max={50}
                    min={1}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Interest Rate: {(localEnv.throughput.interest * 100).toFixed(0)}%</Label>
                  <Slider
                    value={[localEnv.throughput.interest * 100]}
                    onValueChange={(value) => setLocalEnv({
                      ...localEnv,
                      throughput: { ...localEnv.throughput, interest: value[0] / 100 }
                    })}
                    max={100}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Churn Rate: {(localEnv.churnRate * 100).toFixed(0)}%</Label>
                  <Slider
                    value={[localEnv.churnRate * 100]}
                    onValueChange={(value) => setLocalEnv({
                      ...localEnv,
                      churnRate: value[0] / 100
                    })}
                    max={50}
                    step={1}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-primary/30"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-primary hover:opacity-90"
          >
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};