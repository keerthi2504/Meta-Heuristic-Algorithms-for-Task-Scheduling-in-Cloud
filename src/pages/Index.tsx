
import { useState } from "react";
import QuantumCryptoSimulator from "@/components/QuantumCryptoSimulator";

const Index = () => {
  const [isSimulationStarted, setIsSimulationStarted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-blue-900">
      {!isSimulationStarted ? (
        <div className="flex flex-col items-center justify-center h-screen p-6">
          <h1 className="text-4xl font-bold mb-6 text-center text-cyan-300">
            Meta-Heuristic Algorithms for Task Scheduling in Cloud
          </h1>
          <div className="max-w-2xl bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg text-white">
            <p className="text-lg mb-6">
              This project demonstrates the implementation and comparison of three meta-heuristic algorithms 
              for optimized task scheduling in cloud computing environments.
            </p>
            <p className="mb-6">
              Task scheduling in cloud computing is an NP-hard problem that requires efficient allocation of 
              resources to minimize cost, execution time, and improve quality of service.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><span className="font-bold">GPSO:</span> Greedy Particle Swarm Optimization</li>
              <li><span className="font-bold">HSGA:</span> Hybrid Genetic Simulated Annealing</li>
              <li><span className="font-bold">Hybrid GA+PSO:</span> Combined Genetic Algorithm and Particle Swarm Optimization</li>
            </ul>
            <button 
              onClick={() => setIsSimulationStarted(true)}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-6 rounded-md font-medium transition-colors shadow-md"
            >
              Start Simulation
            </button>
          </div>
        </div>
      ) : (
        <QuantumCryptoSimulator />
      )}
    </div>
  );
};

export default Index;
