
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DataFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Key Generation and Storage",
      description: "The Data Holder generates Quantum-Safe Cryptography (PQC) master keys using KYBER algorithm for secret key generation. Session keys are derived for individual data objects and stored in the Key Management System.",
      icon: "🔑"
    },
    {
      title: "Data Encryption and Upload",
      description: "Using a hybrid encryption approach, the Data Holder encrypts sensitive data with the derived session key and relevant user attributes. The encrypted data is then securely uploaded to the Cloud Storage service.",
      icon: "🔒"
    },
    {
      title: "Access Request and Authentication",
      description: "The User Device sends an access request with identity and data identifier to the Authentication Server, which verifies the user's identity and access permissions based on attributes. If authorized, a temporary access token is generated.",
      icon: "🔍"
    },
    {
      title: "Key Retrieval and Decryption",
      description: "The User Device sends the access token to the KMS to retrieve the decryption key. After verification, the KMS securely transmits the session key to the User Device.",
      icon: "🔄"
    },
    {
      title: "Two-Stage Decryption Process",
      description: "The User Device performs a two-stage decryption: first using the session key for symmetric decryption, then using the Attribute-Based Encryption (ABE) layer based on authorized attributes.",
      icon: "🔓"
    },
    {
      title: "Secure Data Access",
      description: "The decrypted data is accessible within the secure enclave of the User Device. Access logs are maintained for comprehensive auditing to ensure security and accountability.",
      icon: "📊"
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(steps.length - 1);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-white/10 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Data Flow Visualization</h2>
        <p className="mb-6">
          This simulation demonstrates how data flows through the quantum-safe cryptography system,
          from key generation to secure data access.
        </p>
        
        <div className="flex justify-center my-8">
          <div className="relative w-full max-w-3xl">
            <div className="h-2 bg-gray-700 rounded-full mb-10">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`absolute h-4 w-4 rounded-full top-[-4px] ${
                    index <= currentStep ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                  style={{ left: `${(index / (steps.length - 1)) * 100}%` }}
                />
              ))}
            </div>
            
            <Card className="bg-white/10 border-cyan-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-cyan-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">{steps[currentStep].icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-cyan-300">{steps[currentStep].title}</h3>
                    <p>{steps[currentStep].description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={handlePrev}>Previous Step</Button>
          <Button onClick={handleNext}>Next Step</Button>
        </div>
      </div>
      
      <div className="bg-white/10 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-cyan-300">Key Components in Data Flow</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-cyan-800 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-cyan-300">PQC Master Key</h4>
            <p className="text-sm">Generated using quantum-resistant algorithms to ensure long-term security against quantum attacks.</p>
          </div>
          
          <div className="border border-cyan-800 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-cyan-300">Session Keys</h4>
            <p className="text-sm">Derived from the master key for individual data objects, limiting exposure in case of compromise.</p>
          </div>
          
          <div className="border border-cyan-800 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-cyan-300">Access Tokens</h4>
            <p className="text-sm">Temporary credentials issued after authentication, used to authorize key retrieval operations.</p>
          </div>
          
          <div className="border border-cyan-800 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-cyan-300">User Attributes</h4>
            <p className="text-sm">Characteristics assigned to users that determine their access privileges within the ABE scheme.</p>
          </div>
          
          <div className="border border-cyan-800 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-cyan-300">Access Policies</h4>
            <p className="text-sm">Rules encoded in the ciphertext that specify which attributes are required to decrypt the data.</p>
          </div>
          
          <div className="border border-cyan-800 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-cyan-300">Audit Logs</h4>
            <p className="text-sm">Records of all access attempts and operations for security monitoring and compliance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFlow;
