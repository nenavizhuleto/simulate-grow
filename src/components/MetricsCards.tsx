import { TrendingUp, TrendingDown, Users, UserPlus, UserCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { StepMetrics } from '@/types/simulation';

interface MetricsCardsProps {
  metrics: StepMetrics[];
}

export const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  const latestMetric = metrics[metrics.length - 1];
  const previousMetric = metrics[metrics.length - 2];

  const calculateTotal = (key: keyof StepMetrics) => {
    return metrics.reduce((sum, m) => sum + (m[key] as number), 0);
  };

  const calculateChange = (key: keyof StepMetrics) => {
    if (!latestMetric || !previousMetric) return 0;
    const current = latestMetric[key] as number;
    const previous = previousMetric[key] as number;
    return previous === 0 ? 0 : ((current - previous) / previous) * 100;
  };

  const cards = [
    {
      title: 'Total Organic',
      value: calculateTotal('OrganicClientsCount'),
      change: calculateChange('OrganicClientsCount'),
      icon: Users,
      color: 'metric-organic',
      gradient: 'from-metric-organic/20 to-metric-organic/5'
    },
    {
      title: 'Total Attracted',
      value: calculateTotal('AttractedClientsCount'),
      change: calculateChange('AttractedClientsCount'),
      icon: UserPlus,
      color: 'metric-attracted',
      gradient: 'from-metric-attracted/20 to-metric-attracted/5'
    },
    {
      title: 'Total Returned',
      value: calculateTotal('ReturnedClientsCount'),
      change: calculateChange('ReturnedClientsCount'),
      icon: UserCheck,
      color: 'metric-returned',
      gradient: 'from-metric-returned/20 to-metric-returned/5'
    },
    {
      title: 'Total Churned',
      value: calculateTotal('ChurnClientsCount'),
      change: calculateChange('ChurnClientsCount'),
      icon: TrendingDown,
      color: 'metric-churn',
      gradient: 'from-metric-churn/20 to-metric-churn/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card 
            key={card.title}
            className={`p-6 bg-gradient-to-br ${card.gradient} border-border/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <Icon className={`h-8 w-8 text-${card.color}`} />
              {card.change !== 0 && (
                <div className="flex items-center gap-1">
                  {card.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-metric-growth" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-metric-churn" />
                  )}
                  <span className={`text-sm font-medium ${
                    card.change > 0 ? 'text-metric-growth' : 'text-metric-churn'
                  }`}>
                    {Math.abs(card.change).toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {card.title}
            </h3>
            <p className="text-3xl font-bold text-foreground">
              {card.value.toLocaleString()}
            </p>
          </Card>
        );
      })}
    </div>
  );
};