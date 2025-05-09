
import { useState } from "react";
import AlgorithmOverview from "./scheduling/AlgorithmOverview";
import TaskSimulation from "./scheduling/TaskSimulation";
import PerformanceComparison from "./scheduling/PerformanceComparison";
import AlgorithmSettings from "./scheduling/AlgorithmSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QuantumCryptoSimulator = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="container mx-auto py-8 px-4 text-white">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-cyan-300">Meta-Heuristic Algorithms for Task Scheduling</h1>
        <p className="text-lg max-w-2xl text-center">
          Compare GPSO, HSGA, and Hybrid(GA+PSO) algorithms for efficient task scheduling in cloud computing
        </p>
      </div>
      
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Algorithm Overview</TabsTrigger>
          <TabsTrigger value="simulation">Task Simulation</TabsTrigger>
          <TabsTrigger value="comparison">Performance Comparison</TabsTrigger>
          <TabsTrigger value="settings">Algorithm Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <AlgorithmOverview />
        </TabsContent>
        <TabsContent value="simulation">
          <TaskSimulation />
        </TabsContent>
        <TabsContent value="comparison">
          <PerformanceComparison />
        </TabsContent>
        <TabsContent value="settings">
          <AlgorithmSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuantumCryptoSimulator;
