
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Rectangle, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const executionTimeData = [
  { name: "20 Tasks", GPSO: 24, HSGA: 20, "Hybrid GA+PSO": 18 },
  { name: "40 Tasks", GPSO: 42, HSGA: 38, "Hybrid GA+PSO": 35 },
  { name: "60 Tasks", GPSO: 65, HSGA: 58, "Hybrid GA+PSO": 52 },
  { name: "80 Tasks", GPSO: 87, HSGA: 78, "Hybrid GA+PSO": 71 },
  { name: "100 Tasks", GPSO: 110, HSGA: 98, "Hybrid GA+PSO": 88 },
];

const resourceUtilizationData = [
  { name: "GPSO", value: 72 },
  { name: "HSGA", value: 78 },
  { name: "Hybrid GA+PSO", value: 85 },
];

const qualityMetricsData = [
  {
    algorithm: "GPSO",
    "Execution Time": 65,
    "Resource Cost": 70,
    "Task Balance": 72,
    "Throughput": 68,
    "Failure Rate": 25,
  },
  {
    algorithm: "HSGA",
    "Execution Time": 58,
    "Resource Cost": 75,
    "Task Balance": 78,
    "Throughput": 74,
    "Failure Rate": 20,
  },
  {
    algorithm: "Hybrid GA+PSO",
    "Execution Time": 52,
    "Resource Cost": 82,
    "Task Balance": 85,
    "Throughput": 80,
    "Failure Rate": 12,
  },
];

const convergenceData = [
  { iteration: 1, GPSO: 120, HSGA: 115, "Hybrid GA+PSO": 110 },
  { iteration: 5, GPSO: 100, HSGA: 92, "Hybrid GA+PSO": 88 },
  { iteration: 10, GPSO: 85, HSGA: 78, "Hybrid GA+PSO": 72 },
  { iteration: 15, GPSO: 75, HSGA: 68, "Hybrid GA+PSO": 62 },
  { iteration: 20, GPSO: 68, HSGA: 60, "Hybrid GA+PSO": 54 },
  { iteration: 25, GPSO: 65, HSGA: 58, "Hybrid GA+PSO": 52 },
];

const chartConfig = {
  GPSO: { color: "#8884d8" },
  HSGA: { color: "#82ca9d" },
  "Hybrid GA+PSO": { color: "#ffc658" },
  "Execution Time": { color: "#8884d8" },
  "Resource Cost": { color: "#82ca9d" },
  "Task Balance": { color: "#ffc658" },
  "Throughput": { color: "#ff8042" },
  "Failure Rate": { color: "#ff0000" },
};

const PerformanceComparison = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/10 backdrop-blur-sm text-white">
        <CardHeader>
          <CardTitle>Execution Time Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={executionTimeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="GPSO" fill="#8884d8" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                <Bar dataKey="HSGA" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="green" />} />
                <Bar dataKey="Hybrid GA+PSO" fill="#ffc658" activeBar={<Rectangle fill="gold" stroke="orange" />} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm text-white">
        <CardHeader>
          <CardTitle>Algorithm Convergence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <LineChart
                data={convergenceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="iteration" label={{ value: 'Iterations', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Makespan', angle: -90, position: 'insideLeft' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="GPSO" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="HSGA" stroke="#82ca9d" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Hybrid GA+PSO" stroke="#ffc658" activeDot={{ r: 8 }} />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm text-white">
        <CardHeader>
          <CardTitle>Quality Metrics Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <RadarChart outerRadius={90} data={qualityMetricsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="algorithm" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Radar name="Execution Time" dataKey="Execution Time" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Resource Cost" dataKey="Resource Cost" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Radar name="Task Balance" dataKey="Task Balance" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                <Radar name="Throughput" dataKey="Throughput" stroke="#ff8042" fill="#ff8042" fillOpacity={0.6} />
                <Radar name="Failure Rate" dataKey="Failure Rate" stroke="#ff0000" fill="#ff0000" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm text-white">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">GPSO</h3>
              <ul className="list-disc pl-6">
                <li>Average execution time: 65.6 seconds</li>
                <li>Resource utilization: 72%</li>
                <li>Task balance index: 0.72</li>
                <li>Convergence speed: Moderate</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">HSGA</h3>
              <ul className="list-disc pl-6">
                <li>Average execution time: 58.4 seconds</li>
                <li>Resource utilization: 78%</li>
                <li>Task balance index: 0.78</li>
                <li>Convergence speed: Fast</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">Hybrid GA+PSO</h3>
              <ul className="list-disc pl-6">
                <li>Average execution time: 52.8 seconds</li>
                <li>Resource utilization: 85%</li>
                <li>Task balance index: 0.85</li>
                <li>Convergence speed: Very Fast</li>
              </ul>
            </div>
            
            <div className="pt-4 border-t border-white/20">
              <p className="font-semibold">Conclusion: </p>
              <p>The Hybrid GA+PSO algorithm consistently outperforms both GPSO and HSGA across all metrics, 
                with 15% faster execution time and 18% better resource utilization compared to GPSO.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceComparison;
