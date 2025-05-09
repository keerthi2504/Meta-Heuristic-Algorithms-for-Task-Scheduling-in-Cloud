
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AlgorithmOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-white/10 backdrop-blur-sm text-white">
        <CardHeader>
          <CardTitle>Greedy Particle Swarm Optimization (GPSO)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            GPSO is an enhanced version of the standard PSO algorithm that incorporates greedy selection 
            mechanisms to improve convergence speed and solution quality.
          </p>
          <h3 className="font-bold mb-2">Key Features:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Particle position represents task-to-VM assignments</li>
            <li>Velocity updates guided by local and global best solutions</li>
            <li>Greedy selection to accept only improving moves</li>
            <li>Better exploitation of promising solution regions</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm text-white">
        <CardHeader>
          <CardTitle>Hybrid Genetic Simulated Annealing (HSGA)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            HSGA combines the population-based approach of genetic algorithms with the temperature-controlled 
            acceptance mechanism of simulated annealing.
          </p>
          <h3 className="font-bold mb-2">Key Features:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Chromosome encoding for VM-task mapping</li>
            <li>Crossover and mutation operations for exploration</li>
            <li>Temperature-based acceptance of inferior solutions</li>
            <li>Gradual cooling schedule for solution refinement</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm text-white">
        <CardHeader>
          <CardTitle>Hybrid GA+PSO Algorithm</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This hybrid approach leverages the strengths of both GA and PSO to avoid local optima 
            and improve convergence to near-optimal solutions.
          </p>
          <h3 className="font-bold mb-2">Key Features:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>GA operators for global search capabilities</li>
            <li>PSO mechanisms for fine-tuning solutions</li>
            <li>Alternating phases of evolution and swarm intelligence</li>
            <li>Enhanced diversity preservation mechanisms</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlgorithmOverview;
