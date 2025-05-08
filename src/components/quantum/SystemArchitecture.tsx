
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SystemArchitecture = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white/10 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">System Architecture Overview</h2>
        <p className="mb-6">
          The quantum-safe cryptography system is designed with multiple components that work together to ensure
          secure data access in cloud environments, even against quantum computing threats.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-cyan-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Data Holder</h3>
            <p className="text-center text-sm">Controls sensitive data and generates cryptographic keys using PQC algorithms</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-purple-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🔑</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Key Management</h3>
            <p className="text-center text-sm">Securely stores and manages both PQC master keys and session keys</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">☁️</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Cloud Storage</h3>
            <p className="text-center text-sm">Stores encrypted data securely with redundancy and access control</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-emerald-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🔐</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Authentication Server</h3>
            <p className="text-center text-sm">Verifies user identity and enforces access control policies</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-amber-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">📱</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">User Device</h3>
            <p className="text-center text-sm">Initiates access requests and handles decryption of authorized data</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/10 border-cyan-800">
          <CardHeader>
            <CardTitle className="text-cyan-300">ABE Implementation</CardTitle>
            <CardDescription>Attribute-Based Encryption for fine-grained access control</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Ciphertext-Policy Attribute-Based Encryption (CP-ABE) is implemented to allow data to be accessed
              based on user attributes, providing a flexible and secure approach to managing data access.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 border-cyan-800">
          <CardHeader>
            <CardTitle className="text-cyan-300">Post-Quantum Algorithms</CardTitle>
            <CardDescription>Lattice-based cryptography for quantum resistance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Kyber512, a lattice-based Key Encapsulation Mechanism (KEM), is used for quantum-safe key generation,
              ensuring resistance against quantum computing attacks.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemArchitecture;
