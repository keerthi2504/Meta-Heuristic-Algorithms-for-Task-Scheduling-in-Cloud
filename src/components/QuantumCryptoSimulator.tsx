
import { useState } from "react";
import SystemArchitecture from "./quantum/SystemArchitecture";
import DataFlow from "./quantum/DataFlow";
import KeyManagement from "./quantum/KeyManagement";
import EncryptionDemo from "./quantum/EncryptionDemo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QuantumCryptoSimulator = () => {
  const [activeTab, setActiveTab] = useState("architecture");
  
  return (
    <div className="container mx-auto py-8 px-4 text-white">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-cyan-300">Quantum-Safe Cryptography Simulator</h1>
        <p className="text-lg max-w-2xl text-center">
          Explore the components of a quantum-safe cryptography system for secure cloud data access
        </p>
      </div>
      
      <Tabs defaultValue="architecture" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="architecture">System Architecture</TabsTrigger>
          <TabsTrigger value="dataflow">Data Flow</TabsTrigger>
          <TabsTrigger value="keymanagement">Key Management</TabsTrigger>
          <TabsTrigger value="encryptiondemo">Encryption Demo</TabsTrigger>
        </TabsList>
        <TabsContent value="architecture">
          <SystemArchitecture />
        </TabsContent>
        <TabsContent value="dataflow">
          <DataFlow />
        </TabsContent>
        <TabsContent value="keymanagement">
          <KeyManagement />
        </TabsContent>
        <TabsContent value="encryptiondemo">
          <EncryptionDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuantumCryptoSimulator;
