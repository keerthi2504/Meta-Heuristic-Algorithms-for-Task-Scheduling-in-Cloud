
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSimulation } from "@/contexts/SimulationContext";

const ALGORITHMS = ["GPSO", "HSGA", "Hybrid GA+PSO"];

const TaskSimulation = () => {
  const { tasks: importedTasks, vms: importedVMs, setTasks, setVMs } = useSimulation();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("GPSO");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [tasks, setLocalTasks] = useState(importedTasks);
  const [vms, setLocalVMs] = useState(importedVMs);

  const simulationData = [
    {
      name: "GPSO",
      "Execution Time": 65,
      "Resource Cost": 85,
      "Load Balance": 72,
    },
    {
      name: "HSGA",
      "Execution Time": 58,
      "Resource Cost": 79,
      "Load Balance": 78,
    },
    {
      name: "Hybrid GA+PSO",
      "Execution Time": 52,
      "Resource Cost": 75,
      "Load Balance": 85,
    },
  ];

  const runSimulation = () => {
    setIsRunning(true);
    // Reset simulation with the latest imported tasks and VMs
    const resetTasks = importedTasks.map(task => ({ ...task, vm: null, startTime: null, endTime: null }));
    const resetVMs = importedVMs.map(vm => ({ ...vm, tasks: [], busyUntil: 0 }));
    
    setLocalTasks(resetTasks);
    setLocalVMs(resetVMs);
    setSimulationStep(0);
    
    // Run simulation steps
    const intervalId = setInterval(() => {
      setSimulationStep(step => {
        if (step >= resetTasks.length) {
          clearInterval(intervalId);
          setIsRunning(false);
          return step;
        }
        
        // Simplified algorithm simulation - in reality would implement the actual algorithms
        const taskToAssign = { ...resetTasks[step] };
        let bestVM = 0;
        let earliestFinish = Infinity;
        
        // Simple greedy assignment based on earliest finish time
        resetVMs.forEach((vm, index) => {
          const startTime = vm.busyUntil;
          const processTime = taskToAssign.length / vm.processingPower;
          const finishTime = startTime + processTime;
          
          if (finishTime < earliestFinish) {
            earliestFinish = finishTime;
            bestVM = index;
          }
        });
        
        // Update task and VM
        const updatedTasks = [...resetTasks];
        const updatedVMs = [...resetVMs];
        
        const vmIndex = bestVM;
        const startTime = updatedVMs[vmIndex].busyUntil;
        const processTime = taskToAssign.length / updatedVMs[vmIndex].processingPower;
        const endTime = startTime + processTime;
        
        updatedTasks[step] = {
          ...updatedTasks[step],
          vm: updatedVMs[vmIndex].id,
          startTime: startTime,
          endTime: endTime
        };
        
        updatedVMs[vmIndex] = {
          ...updatedVMs[vmIndex],
          tasks: [...updatedVMs[vmIndex].tasks, taskToAssign.id],
          busyUntil: endTime
        };
        
        setLocalTasks(updatedTasks);
        setLocalVMs(updatedVMs);
        
        // Also update the context state
        setTasks(updatedTasks);
        setVMs(updatedVMs);
        
        return step + 1;
      });
    }, 1000);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setSimulationStep(0);
    const resetTasks = importedTasks.map(task => ({ ...task, vm: null, startTime: null, endTime: null }));
    const resetVMs = importedVMs.map(vm => ({ ...vm, tasks: [], busyUntil: 0 }));
    setLocalTasks(resetTasks);
    setLocalVMs(resetVMs);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 bg-white/10 backdrop-blur-sm text-white">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Algorithm Selection</h3>
            <ToggleGroup type="single" value={selectedAlgorithm} onValueChange={(value) => value && setSelectedAlgorithm(value)}>
              {ALGORITHMS.map(algo => (
                <ToggleGroupItem key={algo} value={algo} disabled={isRunning}>
                  {algo}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            
            <div className="mt-6 space-x-4">
              <Button 
                onClick={runSimulation}
                disabled={isRunning}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                Run Simulation
              </Button>
              <Button 
                onClick={resetSimulation}
                variant="outline"
                disabled={!simulationStep}
              >
                Reset
              </Button>
            </div>
            
            <div className="mt-6">
              <p>Current Step: {simulationStep} / {tasks.length}</p>
              <p>Algorithm: {selectedAlgorithm}</p>
              <p>Status: {isRunning ? "Running..." : simulationStep > 0 ? "Completed" : "Ready"}</p>
              <p className="mt-2 text-sm">Tasks Loaded: {importedTasks.length}</p>
              <p className="text-sm">VMs Loaded: {importedVMs.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1 bg-white/10 backdrop-blur-sm text-white">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Task Queue</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task ID</TableHead>
                  <TableHead>Length</TableHead>
                  <TableHead>Assigned VM</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>Task {task.id}</TableCell>
                    <TableCell>{task.length}</TableCell>
                    <TableCell>{task.vm !== null ? `VM ${task.vm}` : "Unassigned"}</TableCell>
                    <TableCell>{task.startTime !== null ? task.startTime.toFixed(1) : "-"}</TableCell>
                    <TableCell>{task.endTime !== null ? task.endTime.toFixed(1) : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-white/10 backdrop-blur-sm text-white">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">VM Utilization</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={vms.map(vm => ({
                  name: `VM ${vm.id}`,
                  tasks: vm.tasks.length,
                  utilization: vm.busyUntil > 0 ? (vm.busyUntil * vm.processingPower) : 0,
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tasks" name="Number of Tasks" fill="#8884d8" />
                <Bar dataKey="utilization" name="Utilization" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskSimulation;
