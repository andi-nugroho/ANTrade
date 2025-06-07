"use client";

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
} from "recharts";
import { useState, useEffect } from "react";

interface MarketOverviewProps {
  timeframe: string;
}

export function MarketOverview({ timeframe }: MarketOverviewProps) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Generate mock data based on timeframe
    const points = timeframe === "24h" ? 24 : 
                  timeframe === "7d" ? 7 : 
                  timeframe === "30d" ? 30 : 12;
    
    const newData = [];
    const baseVolume = 100 + Math.random() * 50;
    const baseSales = 80 + Math.random() * 30;
    
    for (let i = 0; i < points; i++) {
      const name = timeframe === "24h" ? `${i}h` : 
                  timeframe === "7d" ? `Day ${i+1}` : 
                  timeframe === "30d" ? `Day ${i+1}` : `Month ${i+1}`;
      
      const randomVolume = Math.max(0, baseVolume + Math.random() * 50 - 25);
      const randomSales = Math.max(0, baseSales + Math.random() * 40 - 20);
      
      newData.push({
        name,
        volume: randomVolume.toFixed(1),
        sales: randomSales.toFixed(0),
      });
    }
    
    setData(newData);
  }, [timeframe]);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-effect p-2 rounded-md border border-border-medium">
          <p className="text-body-xs font-medium">{label}</p>
          <p className="text-body-xs text-primary-400">
            Volume: {payload[0].value} ETH
          </p>
          <p className="text-body-xs text-secondary-400">
            Sales: {payload[1].value}
          </p>
        </div>
      );
    }
  
    return null;
  };
  
  return (
    <div className="border border-border-medium rounded-lg bg-background-card p-4 h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 10, fill: 'var(--text-tertiary)' }}
            tickLine={{ stroke: 'var(--border-light)' }}
            axisLine={{ stroke: 'var(--border-light)' }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 10, fill: 'var(--text-tertiary)' }}
            tickLine={{ stroke: 'var(--border-light)' }}
            axisLine={{ stroke: 'var(--border-light)' }}
            tickFormatter={(value) => `${value} ETH`}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 10, fill: 'var(--text-tertiary)' }}
            tickLine={{ stroke: 'var(--border-light)' }}
            axisLine={{ stroke: 'var(--border-light)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="volume"
            name="Volume (ETH)"
            stroke="hsl(var(--chart-1))"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="sales"
            name="Sales"
            stroke="hsl(var(--chart-2))"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
