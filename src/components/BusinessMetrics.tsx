import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target,
  Activity,
  PieChart,
  BarChart3,
  Percent,
  Clock,
  ShoppingCart,
  UserCheck
} from 'lucide-react';
import { StepMetrics } from '@/types/simulation';
import { useSimulationStore } from '@/stores/simulationStore';

interface BusinessMetricsProps {
  metrics: StepMetrics[];
}

interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  color: string;
  gradient: string;
  description?: string;
  progress?: number;
  subtitle?: string;
}

export const BusinessMetrics = ({ metrics }: BusinessMetricsProps) => {
  const { simulation } = useSimulationStore();
  
  // Calculate total clients
  const totalClients = metrics.length > 0 
    ? metrics.reduce((sum, m) => sum + m.OrganicClientsCount + m.AttractedClientsCount, 0)
    : 0;
  
  // Calculate total revenue (placeholder calculation)
  const avgServicePrice = simulation?.business.services.reduce((sum, s) => sum + s.price, 0) ?? 0;
  const totalRevenue = totalClients * (avgServicePrice / (simulation?.business.services.length || 1));
  
  // Calculate total costs
  const avgServiceCost = simulation?.business.services.reduce((sum, s) => sum + s.cost, 0) ?? 0;
  const totalCosts = totalClients * (avgServiceCost / (simulation?.business.services.length || 1));
  
  // Calculate churn rate
  const totalChurned = metrics.reduce((sum, m) => sum + m.ChurnClientsCount, 0);
  const churnRate = totalClients > 0 ? (totalChurned / totalClients) * 100 : 0;
  
  // Customer Acquisition Cost (CAC) - placeholder
  const marketingCost = totalCosts * 0.3; // Assume 30% of costs are marketing
  const newCustomers = metrics.reduce((sum, m) => sum + m.AttractedClientsCount, 0);
  const cac = newCustomers > 0 ? marketingCost / newCustomers : 0;
  
  // Customer Lifetime Value (CLV) - placeholder
  const avgPurchaseValue = avgServicePrice / (simulation?.business.services.length || 1);
  const purchaseFrequency = 2; // Placeholder: assume 2 purchases per customer
  const customerLifespan = 12; // Placeholder: 12 months
  const clv = avgPurchaseValue * purchaseFrequency * customerLifespan;
  
  // ROI calculation
  const profit = totalRevenue - totalCosts;
  const roi = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;
  
  // ARPU (Average Revenue Per User)
  const arpu = totalClients > 0 ? totalRevenue / totalClients : 0;
  
  // Conversion Rate
  const totalVisitors = totalClients * 2; // Placeholder: assume 50% conversion
  const conversionRate = totalVisitors > 0 ? (totalClients / totalVisitors) * 100 : 0;
  
  // Monthly Recurring Revenue (MRR) - placeholder
  const mrr = totalRevenue / (metrics.length || 1) * 30;
  
  // Gross Margin
  const grossMargin = totalRevenue > 0 ? ((totalRevenue - totalCosts) / totalRevenue) * 100 : 0;

  const businessMetrics: MetricCard[] = [
    // Financial Metrics
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(0)}`,
      change: 15.3,
      icon: DollarSign,
      color: 'metric-growth',
      gradient: 'from-metric-growth/20 to-metric-growth/5',
      subtitle: 'All-time revenue'
    },
    {
      title: 'Customer Acquisition Cost',
      value: `$${cac.toFixed(0)}`,
      change: -8.2,
      icon: Target,
      color: 'metric-attracted',
      gradient: 'from-metric-attracted/20 to-metric-attracted/5',
      subtitle: 'Per customer',
      description: 'Cost to acquire new customer'
    },
    {
      title: 'Customer Lifetime Value',
      value: `$${clv.toFixed(0)}`,
      change: 12.5,
      icon: UserCheck,
      color: 'metric-returned',
      gradient: 'from-metric-returned/20 to-metric-returned/5',
      subtitle: 'CLV',
      description: 'Expected revenue per customer'
    },
    {
      title: 'Return on Investment',
      value: `${roi.toFixed(1)}%`,
      change: roi > 0 ? 5.4 : -5.4,
      icon: TrendingUp,
      color: roi > 0 ? 'metric-growth' : 'metric-churn',
      gradient: roi > 0 ? 'from-metric-growth/20 to-metric-growth/5' : 'from-metric-churn/20 to-metric-churn/5',
      progress: Math.min(Math.abs(roi), 100),
      description: 'ROI percentage'
    },
    
    // Customer Metrics
    {
      title: 'Average Revenue Per User',
      value: `$${arpu.toFixed(0)}`,
      change: 3.7,
      icon: Users,
      color: 'primary',
      gradient: 'from-primary/20 to-primary/5',
      subtitle: 'ARPU',
      description: 'Revenue per active user'
    },
    {
      title: 'Churn Rate',
      value: `${churnRate.toFixed(1)}%`,
      change: churnRate > 10 ? 2.1 : -2.1,
      icon: TrendingDown,
      color: 'metric-churn',
      gradient: 'from-metric-churn/20 to-metric-churn/5',
      progress: churnRate,
      description: 'Customer loss rate'
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate.toFixed(1)}%`,
      change: 4.2,
      icon: Activity,
      color: 'metric-organic',
      gradient: 'from-metric-organic/20 to-metric-organic/5',
      progress: conversionRate,
      description: 'Visitor to customer rate'
    },
    {
      title: 'Net Promoter Score',
      value: 72,
      change: 8,
      icon: BarChart3,
      color: 'accent',
      gradient: 'from-accent/20 to-accent/5',
      subtitle: 'NPS',
      progress: 72,
      description: 'Customer satisfaction score'
    },
    
    // Revenue Metrics
    {
      title: 'Monthly Recurring Revenue',
      value: `$${mrr.toFixed(0)}`,
      change: 18.3,
      icon: PieChart,
      color: 'primary',
      gradient: 'from-primary/20 to-primary/5',
      subtitle: 'MRR',
      description: 'Predictable monthly revenue'
    },
    {
      title: 'Gross Margin',
      value: `${grossMargin.toFixed(1)}%`,
      change: grossMargin > 50 ? 3.2 : -3.2,
      icon: Percent,
      color: grossMargin > 50 ? 'metric-growth' : 'metric-churn',
      gradient: grossMargin > 50 ? 'from-metric-growth/20 to-metric-growth/5' : 'from-metric-churn/20 to-metric-churn/5',
      progress: grossMargin,
      description: 'Profit margin percentage'
    },
    {
      title: 'Average Order Value',
      value: `$${avgPurchaseValue.toFixed(0)}`,
      change: 5.8,
      icon: ShoppingCart,
      color: 'secondary',
      gradient: 'from-secondary/20 to-secondary/5',
      subtitle: 'AOV',
      description: 'Average purchase amount'
    },
    {
      title: 'Payback Period',
      value: `${(cac / (arpu || 1)).toFixed(1)} mo`,
      change: -12.5,
      icon: Clock,
      color: 'muted',
      gradient: 'from-muted/20 to-muted/5',
      description: 'Time to recover CAC'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Business Metrics</h2>
        <p className="text-muted-foreground">
          Key performance indicators and business health metrics
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {businessMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card 
              key={metric.title}
              className={`p-4 bg-gradient-to-br ${metric.gradient} border-border/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-${metric.color}/10`}>
                  <Icon className={`h-5 w-5 text-${metric.color}`} />
                </div>
                {metric.change !== undefined && (
                  <div className="flex items-center gap-1">
                    {metric.change > 0 ? (
                      <TrendingUp className="h-3 w-3 text-metric-growth" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-metric-churn" />
                    )}
                    <span className={`text-xs font-medium ${
                      metric.change > 0 ? 'text-metric-growth' : 'text-metric-churn'
                    }`}>
                      {Math.abs(metric.change).toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xs font-medium text-muted-foreground">
                  {metric.title}
                </h3>
                <p className="text-2xl font-bold text-foreground">
                  {metric.value}
                </p>
                {metric.subtitle && (
                  <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                )}
              </div>
              
              {metric.progress !== undefined && (
                <div className="mt-3">
                  <Progress 
                    value={metric.progress} 
                    className="h-1.5"
                  />
                </div>
              )}
              
              {metric.description && (
                <p className="text-xs text-muted-foreground mt-2">
                  {metric.description}
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};