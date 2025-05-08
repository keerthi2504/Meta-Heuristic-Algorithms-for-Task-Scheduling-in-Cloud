
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const KeyManagement = () => {
  const [generatingKey, setGeneratingKey] = useState(false);
  const [keyGenProgress, setKeyGenProgress] = useState(0);
  const [generatedKeys, setGeneratedKeys] = useState<{id: string, type: string, created: string}[]>([]);
  
  const handleGenerateKey = (type: string) => {
    setGeneratingKey(true);
    setKeyGenProgress(0);
    
    // Simulate key generation process
    const interval = setInterval(() => {
      setKeyGenProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setGeneratingKey(false);
          const newKey = {
            id: `key-${Math.random().toString(36).substring(2, 10)}`,
            type,
            created: new Date().toLocaleString()
          };
          setGeneratedKeys(prev => [...prev, newKey]);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-white/10 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Key Management System (KMS)</h2>
        <p className="mb-6">
          The Key Management System securely stores and manages cryptographic keys, including PQC master keys and session keys.
          It provides key generation, distribution, rotation, and revocation capabilities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/5 border-cyan-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Key Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="mb-4">Generate quantum-resistant cryptographic keys using the Kyber512 lattice-based algorithm.</p>
                
                {generatingKey ? (
                  <div className="space-y-2">
                    <div className="flex justify-between mb-1">
                      <span>Generating key...</span>
                      <span>{Math.round(keyGenProgress)}%</span>
                    </div>
                    <Progress value={keyGenProgress} className="h-2" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => handleGenerateKey("PQC Master Key")}>
                      Generate PQC Master Key
                    </Button>
                    <Button onClick={() => handleGenerateKey("Session Key")}>
                      Generate Session Key
                    </Button>
                    <Button onClick={() => handleGenerateKey("ABE Policy Key")}>
                      Generate ABE Policy Key
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-cyan-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Key Management Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                <li>Quantum-resistant key generation using Kyber512</li>
                <li>Secure storage with hardware security modules</li>
                <li>Key lifecycle management (creation, rotation, revocation)</li>
                <li>Distributed key shares for enhanced security</li>
                <li>Access control based on user attributes</li>
                <li>Comprehensive key usage auditing</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-cyan-300">Generated Keys</h3>
          
          {generatedKeys.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 px-4">Key ID</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Created</th>
                    <th className="text-left py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedKeys.map((key, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-2 px-4 font-mono text-xs">{key.id}</td>
                      <td className="py-2 px-4">{key.type}</td>
                      <td className="py-2 px-4">{key.created}</td>
                      <td className="py-2 px-4">
                        <span className="inline-block px-2 py-1 rounded-full bg-green-900 text-green-300 text-xs">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">No keys generated yet. Use the options above to generate keys.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyManagement;
