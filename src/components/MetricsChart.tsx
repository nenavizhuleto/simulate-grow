import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StepMetrics } from '@/types/simulation';
import { Card } from '@/components/ui/card';

interface MetricsChartProps {
  metrics: StepMetrics[];
}

export const MetricsChart = ({ metrics }: MetricsChartProps) => {
  return (
    <Card className="p-6 bg-gradient-card border-border/50 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Growth Metrics</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={metrics} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="Day" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="OrganicClientsCount"
            stroke="hsl(var(--metric-organic))"
            strokeWidth={2}
            name="Organic Clients"
            dot={{ fill: 'hsl(var(--metric-organic))', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="AttractedClientsCount"
            stroke="hsl(var(--metric-attracted))"
            strokeWidth={2}
            name="Attracted Clients"
            dot={{ fill: 'hsl(var(--metric-attracted))', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="ReturnedClientsCount"
            stroke="hsl(var(--metric-returned))"
            strokeWidth={2}
            name="Returned Clients"
            dot={{ fill: 'hsl(var(--metric-returned))', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="ChurnClientsCount"
            stroke="hsl(var(--metric-churn))"
            strokeWidth={2}
            name="Churned Clients"
            dot={{ fill: 'hsl(var(--metric-churn))', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};