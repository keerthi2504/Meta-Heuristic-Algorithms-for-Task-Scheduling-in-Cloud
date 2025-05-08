
import { useState } from "react";
import QuantumCryptoSimulator from "@/components/QuantumCryptoSimulator";

const Index = () => {
  const [isSimulationStarted, setIsSimulationStarted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-blue-900">
      {!isSimulationStarted ? (
        <div className="flex flex-col items-center justify-center h-screen p-6">
          <h1 className="text-4xl font-bold mb-6 text-center text-cyan-300">
            Quantum-Safe Cryptography for Secure Cloud Data Access
          </h1>
          <div className="max-w-2xl bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg text-white">
            <p className="text-lg mb-6">
              This project demonstrates a cutting-edge system designed to enhance the security of cloud data access
              through the integration of post-quantum cryptography and Attribute-Based Encryption (ABE).
            </p>
            <p className="mb-6">
              The system implements advanced post-quantum cryptographic algorithms to ensure resilience against quantum attacks,
              with a specific focus on Attribute-Based Encryption for fine-grained access control to encrypted data.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><span className="font-bold">Key Generation:</span> Using Kyber512 lattice-based cryptography</li>
              <li><span className="font-bold">Public Key Management:</span> Secure key storage and distribution</li>
              <li><span className="font-bold">Shared Key Generation:</span> Secure key encapsulation mechanisms</li>
              <li><span className="font-bold">Attribute-Based Encryption:</span> Fine-grained access control</li>
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
