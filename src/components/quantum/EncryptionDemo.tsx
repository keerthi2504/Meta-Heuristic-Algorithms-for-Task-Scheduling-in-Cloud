
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Code } from "lucide-react";

interface UserAttribute {
  id: string;
  name: string;
  selected: boolean;
}

const EncryptionDemo = () => {
  const [plaintext, setPlaintext] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [userAttributes, setUserAttributes] = useState<UserAttribute[]>([
    { id: "attr1", name: "Department: Finance", selected: false },
    { id: "attr2", name: "Role: Manager", selected: false },
    { id: "attr3", name: "Clearance: Level 3", selected: false },
    { id: "attr4", name: "Location: Headquarters", selected: false },
    { id: "attr5", name: "Project: Alpha", selected: false },
  ]);
  const [encryptionStatus, setEncryptionStatus] = useState("");
  const [decryptionStatus, setDecryptionStatus] = useState("");
  const [accessPolicy, setAccessPolicy] = useState("(Department: Finance AND Role: Manager) OR (Clearance: Level 3)");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  
  const toggleAttribute = (id: string) => {
    setUserAttributes(userAttributes.map(attr => 
      attr.id === id ? { ...attr, selected: !attr.selected } : attr
    ));
  };
  
  const encryptData = () => {
    if (!plaintext) {
      setEncryptionStatus("Please enter data to encrypt");
      return;
    }
    
    setIsEncrypting(true);
    setEncryptionStatus("Encrypting data...");
    
    // Simulate encryption process
    setTimeout(() => {
      // Create a mock encrypted text
      const mockEncrypted = btoa(plaintext) + "." + Math.random().toString(36).substring(2, 15);
      setEncryptedText(mockEncrypted);
      setEncryptionStatus(`Data encrypted successfully using CP-ABE with policy: ${accessPolicy}`);
      setIsEncrypting(false);
    }, 1500);
  };
  
  const decryptData = () => {
    if (!encryptedText) {
      setDecryptionStatus("No encrypted data to decrypt");
      return;
    }
    
    setIsDecrypting(true);
    setDecryptionStatus("Verifying user attributes against policy...");
    
    // Simulate attribute verification and decryption
    setTimeout(() => {
      const selectedAttrs = userAttributes.filter(attr => attr.selected).map(attr => attr.name);
      
      const hasFinance = selectedAttrs.includes("Department: Finance");
      const hasManager = selectedAttrs.includes("Role: Manager");
      const hasClearance = selectedAttrs.includes("Clearance: Level 3");
      
      const meetsPolicy = (hasFinance && hasManager) || hasClearance;
      
      if (meetsPolicy) {
        setDecryptionStatus("Access granted. Decrypting data...");
        setTimeout(() => {
          try {
            // Mock decryption - in reality would use the selected attributes to perform ABE decryption
            const originalText = atob(encryptedText.split('.')[0]);
            setDecryptedText(originalText);
            setDecryptionStatus("Data decrypted successfully");
          } catch (e) {
            setDecryptedText("");
            setDecryptionStatus("Error during decryption. Invalid ciphertext format.");
          }
          setIsDecrypting(false);
        }, 1000);
      } else {
        setDecryptedText("");
        setDecryptionStatus("Access denied. User attributes do not satisfy the access policy.");
        setIsDecrypting(false);
      }
    }, 1500);
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-white/10 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Attribute-Based Encryption Demo</h2>
        <p className="mb-6">
          This demo illustrates how Attribute-Based Encryption (ABE) works in conjunction with post-quantum cryptography
          to provide secure and fine-grained access control to encrypted data.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-cyan-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Data Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="plaintext">Data to Encrypt</Label>
                  <Textarea 
                    id="plaintext" 
                    placeholder="Enter sensitive data to encrypt..." 
                    value={plaintext}
                    onChange={(e) => setPlaintext(e.target.value)}
                    className="h-28"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accessPolicy">Access Policy</Label>
                  <Input
                    id="accessPolicy"
                    value={accessPolicy}
                    onChange={(e) => setAccessPolicy(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-gray-400">Define who can access this data using attributes</p>
                </div>
                
                <Button 
                  onClick={encryptData} 
                  disabled={isEncrypting || !plaintext}
                  className="w-full"
                >
                  {isEncrypting ? "Encrypting..." : "Encrypt Data with ABE"}
                </Button>
                
                {encryptionStatus && (
                  <div className="bg-cyan-950/50 p-3 rounded border border-cyan-800 text-sm">
                    {encryptionStatus}
                  </div>
                )}
                
                {encryptedText && (
                  <div className="space-y-2">
                    <Label htmlFor="encryptedText">Encrypted Data</Label>
                    <div className="bg-black/50 p-3 rounded border border-gray-700 font-mono text-xs break-all max-h-28 overflow-auto">
                      {encryptedText}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-cyan-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Data Decryption</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">User Attributes</Label>
                  <div className="space-y-3">
                    {userAttributes.map((attr) => (
                      <div key={attr.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={attr.id} 
                          checked={attr.selected} 
                          onCheckedChange={() => toggleAttribute(attr.id)} 
                        />
                        <Label htmlFor={attr.id}>{attr.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={decryptData} 
                  disabled={isDecrypting || !encryptedText}
                  className="w-full"
                >
                  {isDecrypting ? "Decrypting..." : "Attempt Decryption"}
                </Button>
                
                {decryptionStatus && (
                  <div className={`p-3 rounded border text-sm ${
                    decryptionStatus.includes("denied") 
                      ? "bg-red-950/30 border-red-800" 
                      : "bg-cyan-950/50 border-cyan-800"
                  }`}>
                    {decryptionStatus}
                  </div>
                )}
                
                {decryptedText && (
                  <div className="space-y-2">
                    <Label htmlFor="decryptedText">Decrypted Data</Label>
                    <div className="bg-green-950/30 p-3 rounded border border-green-800 font-mono text-sm break-all max-h-28 overflow-auto">
                      {decryptedText}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="bg-white/10 border-cyan-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code size={18} className="text-cyan-300" />
            <CardTitle className="text-cyan-300">How It Works</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-cyan-300 mb-1">Ciphertext-Policy Attribute-Based Encryption (CP-ABE)</h4>
              <p className="text-sm">
                In CP-ABE, the access policy is embedded in the ciphertext itself, allowing only users 
                with attributes that satisfy the policy to decrypt the data.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-cyan-300 mb-1">Post-Quantum Resistance</h4>
              <p className="text-sm">
                The encryption keys and mechanisms are designed to be resistant to attacks from 
                quantum computers, using lattice-based cryptography like KYBER instead of traditional algorithms.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-cyan-300 mb-1">Hybrid Approach</h4>
              <p className="text-sm">
                The system uses a hybrid approach combining symmetric encryption (for efficiency) and 
                attribute-based encryption (for fine-grained access control).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EncryptionDemo;
