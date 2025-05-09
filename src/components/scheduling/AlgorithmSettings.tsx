
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface AlgorithmParam {
  name: string;
  gpsoValue: string;
  hsgaValue: string;
  hybridValue: string;
  description: string;
}

const AlgorithmSettings = () => {
  const { toast } = useToast();
  const [taskInput, setTaskInput] = useState<string>(
    "1,40\n2,60\n3,30\n4,80\n5,50\n6,70"
  );
  const [vmInput, setVMInput] = useState<string>(
    "1,10\n2,15\n3,8"
  );
  const [params, setParams] = useState<AlgorithmParam[]>([
    {
      name: "Population Size",
      gpsoValue: "50",
      hsgaValue: "100",
      hybridValue: "75",
      description: "Number of solutions in the population"
    },
    {
      name: "Max Iterations",
      gpsoValue: "100",
      hsgaValue: "150",
      hybridValue: "120",
      description: "Maximum number of iterations to run"
    },
    {
      name: "Inertia Weight",
      gpsoValue: "0.7",
      hsgaValue: "N/A",
      hybridValue: "0.6",
      description: "Controls influence of previous velocity in PSO"
    },
    {
      name: "Cognitive Factor",
      gpsoValue: "1.5",
      hsgaValue: "N/A",
      hybridValue: "1.4",
      description: "Controls influence of particle's best position"
    },
    {
      name: "Social Factor",
      gpsoValue: "2.0",
      hsgaValue: "N/A",
      hybridValue: "1.8",
      description: "Controls influence of swarm's best position"
    },
    {
      name: "Mutation Rate",
      gpsoValue: "N/A",
      hsgaValue: "0.1",
      hybridValue: "0.05",
      description: "Probability of mutation in GA"
    },
    {
      name: "Crossover Rate",
      gpsoValue: "N/A",
      hsgaValue: "0.8",
      hybridValue: "0.75",
      description: "Probability of crossover in GA"
    },
    {
      name: "Initial Temperature",
      gpsoValue: "N/A",
      hsgaValue: "100",
      hybridValue: "N/A",
      description: "Initial temperature for simulated annealing"
    },
    {
      name: "Cooling Rate",
      gpsoValue: "N/A",
      hsgaValue: "0.95",
      hybridValue: "N/A",
      description: "Temperature reduction factor per iteration"
    },
    {
      name: "Hybrid Switch Interval",
      gpsoValue: "N/A",
      hsgaValue: "N/A",
      hybridValue: "10",
      description: "Number of iterations before switching algorithms"
    }
  ]);

  const handleParamChange = (index: number, algorithm: string, value: string) => {
    const updatedParams = [...params];
    const key = `${algorithm}Value` as keyof AlgorithmParam;
    updatedParams[index] = {
      ...updatedParams[index],
      [key]: value
    };
    setParams(updatedParams);
  };

  const handleSaveSettings = () => {
    // In a real implementation, this would save the settings to be used in the simulation
    toast({
      title: "Settings Saved",
      description: "Your algorithm settings have been updated successfully."
    });
  };

  const handleImportTasks = () => {
    // Process the task input
    try {
      const lines = taskInput.trim().split("\n");
      const parsedTasks = lines.map(line => {
        const [id, length] = line.split(",");
        return { id: parseInt(id.trim()), length: parseInt(length.trim()) };
      });
      
      console.log("Imported tasks:", parsedTasks);
      toast({
        title: "Tasks Imported",
        description: `Successfully imported ${parsedTasks.length} tasks.`
      });
    } catch (error) {
      toast({
        title: "Import Error",
        description: "Failed to parse task input. Please check format.",
        variant: "destructive"
      });
    }
  };

  const handleImportVMs = () => {
    // Process the VM input
    try {
      const lines = vmInput.trim().split("\n");
      const parsedVMs = lines.map(line => {
        const [id, power] = line.split(",");
        return { id: parseInt(id.trim()), processingPower: parseInt(power.trim()) };
      });
      
      console.log("Imported VMs:", parsedVMs);
      toast({
        title: "VMs Imported",
        description: `Successfully imported ${parsedVMs.length} virtual machines.`
      });
    } catch (error) {
      toast({
        title: "Import Error",
        description: "Failed to parse VM input. Please check format.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 bg-white/10 backdrop-blur-sm text-white">
        <CardHeader>
          <CardTitle>Algorithm Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>GPSO</TableHead>
                  <TableHead>HSGA</TableHead>
                  <TableHead>Hybrid GA+PSO</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {params.map((param, index) => (
                  <TableRow key={param.name}>
                    <TableCell>{param.name}</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={param.gpsoValue}
                        onChange={(e) => handleParamChange(index, "gpso", e.target.value)}
                        className="w-16 bg-white/20 border border-white/30 rounded px-2 py-1 text-white"
                        disabled={param.gpsoValue === "N/A"}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={param.hsgaValue}
                        onChange={(e) => handleParamChange(index, "hsga", e.target.value)}
                        className="w-16 bg-white/20 border border-white/30 rounded px-2 py-1 text-white"
                        disabled={param.hsgaValue === "N/A"}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={param.hybridValue}
                        onChange={(e) => handleParamChange(index, "hybrid", e.target.value)}
                        className="w-16 bg-white/20 border border-white/30 rounded px-2 py-1 text-white"
                        disabled={param.hybridValue === "N/A"}
                      />
                    </TableCell>
                    <TableCell>{param.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={handleSaveSettings}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="bg-white/10 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle>Task Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm">Enter tasks as "ID,Length" (one per line)</p>
            <Textarea 
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="h-40 mb-4 bg-white/20 border-white/30 text-white"
              placeholder="1,40&#10;2,60&#10;3,30"
            />
            <Button 
              onClick={handleImportTasks}
              className="w-full bg-cyan-600 hover:bg-cyan-700"
            >
              Import Tasks
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle>VM Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm">Enter VMs as "ID,ProcessingPower" (one per line)</p>
            <Textarea 
              value={vmInput}
              onChange={(e) => setVMInput(e.target.value)}
              className="h-28 mb-4 bg-white/20 border-white/30 text-white"
              placeholder="1,10&#10;2,15&#10;3,8"
            />
            <Button 
              onClick={handleImportVMs}
              className="w-full bg-cyan-600 hover:bg-cyan-700"
            >
              Import VMs
            </Button>
          </CardContent>
        </Card>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">View Implementation Details</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Algorithm Implementation Details</DialogTitle>
              <DialogDescription>
                Technical information about the algorithm implementations.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto space-y-4">
              <div>
                <h3 className="font-bold">Greedy Particle Swarm Optimization (GPSO)</h3>
                <p className="mt-1 text-sm">
                  GPSO enhances standard PSO by adding a greedy selection mechanism. Each particle's position represents a potential task-to-VM assignment, with dimensions equal to the number of tasks. The algorithm maintains personal and global best solutions, updating velocities and positions using standard PSO equations but only accepting moves that improve the objective function value.
                </p>
                <pre className="mt-2 bg-gray-800 p-2 rounded text-xs overflow-x-auto">
{`// Pseudocode for GPSO
Initialize particles with random positions and velocities
Evaluate each particle's fitness based on makespan and load balancing
Set personal best (pbest) for each particle to its initial position
Set global best (gbest) to best position found in swarm

For i = 1 to MaxIterations
  For each particle
    Calculate new velocity v using:
      v = w*v + c1*r1*(pbest - current) + c2*r2*(gbest - current)
    Calculate new position p' = current + v
    Evaluate fitness of p'
    
    // Greedy selection
    if fitness(p') better than fitness(current)
      Update position to p'
    else
      Keep current position
      
    Update pbest if current position is better
  End For
  
  Update gbest if any particle found better solution
End For

Return gbest as optimal task scheduling solution`}
                </pre>
              </div>
              
              <div>
                <h3 className="font-bold">Hybrid Genetic Simulated Annealing (HSGA)</h3>
                <p className="mt-1 text-sm">
                  HSGA combines a genetic algorithm with simulated annealing to avoid local optima. Chromosomes represent task-to-VM mappings, with genetic operators (selection, crossover, mutation) creating new solutions. Simulated annealing is used to determine whether to accept inferior solutions based on a temperature parameter that decreases over time.
                </p>
                <pre className="mt-2 bg-gray-800 p-2 rounded text-xs overflow-x-auto">
{`// Pseudocode for HSGA
Initialize population of chromosomes randomly
Evaluate fitness of each chromosome

Set initial temperature T = T0
For i = 1 to MaxIterations
  Select parent chromosomes using tournament selection
  Apply crossover to create offspring
  Apply mutation to offspring with probability Pm
  
  Evaluate fitness of offspring
  
  // Simulated annealing acceptance
  For each offspring
    Select random chromosome in population
    ΔE = fitness(offspring) - fitness(chromosome)
    
    if ΔE < 0 (offspring is better)
      Replace chromosome with offspring
    else
      Accept with probability exp(-ΔE/T)
  End For
  
  T = T * coolingRate  // Reduce temperature
End For

Return best chromosome as optimal task scheduling solution`}
                </pre>
              </div>
              
              <div>
                <h3 className="font-bold">Hybrid GA+PSO Algorithm</h3>
                <p className="mt-1 text-sm">
                  This hybrid approach alternates between GA and PSO phases, leveraging strengths of both. The population is evolved through GA operators, then fine-tuned using PSO. This maintains diversity while quickly converging to high-quality solutions. Special operator designs ensure efficient mapping of tasks to VMs.
                </p>
                <pre className="mt-2 bg-gray-800 p-2 rounded text-xs overflow-x-auto">
{`// Pseudocode for Hybrid GA+PSO
Initialize population of solutions
Evaluate fitness of each solution

For i = 1 to MaxIterations
  // GA Phase (every switchInterval iterations)
  if i % switchInterval == 0
    Select parent solutions using tournament selection
    Apply crossover to create offspring
    Apply mutation to offspring with probability Pm
    Replace worst solutions with offspring
  
  // PSO Phase
  else
    For each solution
      Calculate new velocity using PSO equations:
        v = w*v + c1*r1*(pbest - current) + c2*r2*(gbest - current)
      Update position based on velocity
      Ensure position represents valid task-VM mapping
      
      Evaluate fitness
      Update personal best if improved
    End For
    
    Update global best solution
  End if
End For

Return global best as optimal task scheduling solution`}
                </pre>
              </div>
            </div>
            <DialogFooter>
              <Button>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AlgorithmSettings;
