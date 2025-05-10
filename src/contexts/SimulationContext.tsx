
import React, { createContext, useContext, useState, ReactNode } from "react";

type Task = {
  id: number;
  length: number;
  vm: number | null;
  startTime: number | null;
  endTime: number | null;
};

type VM = {
  id: number;
  processingPower: number;
  tasks: number[];
  busyUntil: number;
};

interface SimulationContextType {
  tasks: Task[];
  vms: VM[];
  setTasks: (tasks: Task[]) => void;
  setVMs: (vms: VM[]) => void;
  algorithmParams: Record<string, Record<string, string>>;
  setAlgorithmParams: (params: Record<string, Record<string, string>>) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, length: 40, vm: null, startTime: null, endTime: null },
    { id: 2, length: 60, vm: null, startTime: null, endTime: null },
    { id: 3, length: 30, vm: null, startTime: null, endTime: null },
    { id: 4, length: 80, vm: null, startTime: null, endTime: null },
    { id: 5, length: 50, vm: null, startTime: null, endTime: null },
    { id: 6, length: 70, vm: null, startTime: null, endTime: null },
  ]);
  
  const [vms, setVMs] = useState<VM[]>([
    { id: 1, processingPower: 10, tasks: [], busyUntil: 0 },
    { id: 2, processingPower: 15, tasks: [], busyUntil: 0 },
    { id: 3, processingPower: 8, tasks: [], busyUntil: 0 },
  ]);

  const [algorithmParams, setAlgorithmParams] = useState<Record<string, Record<string, string>>>({
    gpso: {},
    hsga: {},
    hybrid: {}
  });

  return (
    <SimulationContext.Provider 
      value={{ 
        tasks, 
        setTasks, 
        vms, 
        setVMs, 
        algorithmParams, 
        setAlgorithmParams 
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = (): SimulationContextType => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
};
