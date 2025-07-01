'use client';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import type { ActivityChartData } from '@/lib/types';

interface MatchingActivityChartProps {
  data: ActivityChartData[];
}

export function MatchingActivityChart({ data }: MatchingActivityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="time"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
          }}
        />
        <Legend wrapperStyle={{fontSize: "12px"}}/>
        <Line type="monotone" dataKey="participantLogin" name="Participant Login" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="meeting" name="Meeting" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false}/>
        <Line type="monotone" dataKey="anotherLine" name="Other Activity" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={false}/>
      </LineChart>
    </ResponsiveContainer>
  );
}
