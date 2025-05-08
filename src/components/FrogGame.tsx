
import { useState, useRef, useEffect } from "react";
import PondView from "./PondView";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface Leaf {
  x: number;
  y: number;
  id: number;
  sunk?: boolean;
}

const FrogGame = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [commands, setCommands] = useState<string>("");
  const [currentLeafIndex, setCurrentLeafIndex] = useState<number>(0);
  const [currentCommandIndex, setCurrentCommandIndex] = useState<number>(-1);
  const [leafInput, setLeafInput] = useState<string>("");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isGameSetup, setIsGameSetup] = useState<boolean>(false);
  const [history, setHistory] = useState<{leaf: Leaf, command: string}[]>([]);
  
  // References for animation timing
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset the game
  const resetGame = () => {
    setLeaves([]);
    setCommands("");
    setCurrentLeafIndex(0);
    setCurrentCommandIndex(-1);
    setLeafInput("");
    setIsSimulating(false);
    setIsGameSetup(false);
    setHistory([]);
    
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  };

  // Add leaf from input
  const addLeaf = () => {
    try {
      const coordinates = leafInput.trim().split(/\s+/).map(Number);
      
      if (coordinates.length !== 2 || isNaN(coordinates[0]) || isNaN(coordinates[1])) {
        toast.error("Please enter valid x y coordinates separated by space");
        return;
      }

      const newLeaf = {
        x: coordinates[0],
        y: coordinates[1],
        id: leaves.length
      };

      setLeaves((prevLeaves) => [...prevLeaves, newLeaf]);
      setLeafInput("");
    } catch (error) {
      toast.error("Invalid input format");
    }
  };

  // Add multiple leaves from text area
  const addLeaves = () => {
    try {
      const lines = leafInput.trim().split('\n');
      const newLeaves: Leaf[] = [];
      
      lines.forEach((line, index) => {
        const coordinates = line.trim().split(/\s+/).map(Number);
        
        if (coordinates.length !== 2 || isNaN(coordinates[0]) || isNaN(coordinates[1])) {
          throw new Error(`Line ${index + 1} has invalid format`);
        }

        newLeaves.push({
          x: coordinates[0],
          y: coordinates[1],
          id: index
        });
      });

      setLeaves(newLeaves);
      setLeafInput("");
      toast.success(`Added ${newLeaves.length} leaves`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid input format");
    }
  };

  // Setup the game with example data
  const setupExampleGame = () => {
    // Example from the problem statement
    const exampleLeaves = [
      { x: 5, y: 6, id: 0 },
      { x: 8, y: 9, id: 1 },
      { x: 4, y: 13, id: 2 },
      { x: 1, y: 10, id: 3 },
      { x: 7, y: 4, id: 4 },
      { x: 10, y: 9, id: 5 },
      { x: 3, y: 7, id: 6 }
    ];
    const exampleCommands = "ACDBB";
    
    setLeaves(exampleLeaves);
    setCommands(exampleCommands);
    toast.success("Example game loaded!");
  };

  // Load custom game from input
  const loadCustomGame = () => {
    try {
      const lines = leafInput.trim().split('\n');
      const firstLine = lines[0].trim().split(/\s+/).map(Number);
      
      if (firstLine.length !== 2 || isNaN(firstLine[0]) || isNaN(firstLine[1])) {
        toast.error("First line should contain two numbers: N and M");
        return;
      }
      
      const N = firstLine[0]; // Number of leaves
      const M = firstLine[1]; // Number of commands
      
      if (lines.length < 2 + N) {
        toast.error(`Input should have at least ${2 + N} lines`);
        return;
      }
      
      const commandsLine = lines[1].trim();
      if (commandsLine.length !== M) {
        toast.error(`Commands should be exactly ${M} characters`);
        return;
      }
      
      const leafLines = lines.slice(2, 2 + N);
      const newLeaves: Leaf[] = [];
      
      leafLines.forEach((line, index) => {
        const coordinates = line.trim().split(/\s+/).map(Number);
        if (coordinates.length !== 2 || isNaN(coordinates[0]) || isNaN(coordinates[1])) {
          throw new Error(`Invalid leaf coordinates at line ${index + 3}`);
        }
        
        newLeaves.push({
          x: coordinates[0],
          y: coordinates[1],
          id: index
        });
      });
      
      setLeaves(newLeaves);
      setCommands(commandsLine);
      setIsGameSetup(true);
      
      toast.success(`Loaded game with ${N} leaves and ${M} commands`);
      setLeafInput("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid input format");
    }
  };

  // Find the next leaf in a direction
  const findNextLeafInDirection = (
    currentLeaf: Leaf,
    direction: string
  ): Leaf | null => {
    // Filter leaves that haven't sunk yet (except the current one)
    const availableLeaves = leaves.filter(
      (leaf) => !leaf.sunk && leaf.id !== currentLeaf.id
    );

    // Helper function to check if a leaf is in the specified direction
    const isInDirection = (leaf: Leaf, dir: string): boolean => {
      const dx = leaf.x - currentLeaf.x;
      const dy = leaf.y - currentLeaf.y;

      // Check if the leaf is in the specified diagonal direction and at the same distance in both x and y
      if (Math.abs(dx) !== Math.abs(dy)) return false;

      switch (dir) {
        case "A": // up-right (x+Z, y+Z)
          return dx > 0 && dy > 0;
        case "B": // down-right (x+Z, y-Z)
          return dx > 0 && dy < 0;
        case "C": // up-left (x-Z, y+Z)
          return dx < 0 && dy > 0;
        case "D": // down-left (x-Z, y-Z)
          return dx < 0 && dy < 0;
        default:
          return false;
      }
    };

    // Filter leaves that are in the specified direction
    const leavesInDirection = availableLeaves.filter((leaf) =>
      isInDirection(leaf, direction)
    );

    if (leavesInDirection.length === 0) return null;

    // Find the closest leaf in the direction
    // For all directions, we need to find the minimum distance
    leavesInDirection.sort((a, b) => {
      const distA = Math.abs(a.x - currentLeaf.x); // Same as Math.abs(a.y - currentLeaf.y) for diagonals
      const distB = Math.abs(b.x - currentLeaf.x);
      return distA - distB;
    });

    return leavesInDirection[0];
  };

  // Execute a single step in the simulation
  const executeStep = () => {
    if (currentCommandIndex + 1 >= commands.length) {
      setIsSimulating(false);
      toast.success(`Simulation complete! Freddy is at (${leaves[currentLeafIndex].x}, ${leaves[currentLeafIndex].y})`);
      return;
    }

    const nextCommandIndex = currentCommandIndex + 1;
    const command = commands[nextCommandIndex];
    const currentLeaf = leaves[currentLeafIndex];
    
    // Add to history
    setHistory(prev => [...prev, {
      leaf: { ...currentLeaf },
      command: command
    }]);

    // Find next leaf
    const nextLeaf = findNextLeafInDirection(currentLeaf, command);

    // Update leaves state with the current leaf sunk
    setLeaves(prevLeaves =>
      prevLeaves.map(leaf =>
        leaf.id === currentLeaf.id ? { ...leaf, sunk: true } : leaf
      )
    );

    // Update command index
    setCurrentCommandIndex(nextCommandIndex);

    // If no leaf in that direction, stay on the current leaf (but still sink it)
    if (!nextLeaf) {
      toast.error(`No leaf found in direction ${command}`);
      return;
    }

    // Schedule next position update after animation
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentLeafIndex(nextLeaf.id);
    }, 600); // Slightly longer than animation duration
  };

  // Start the simulation
  const startSimulation = () => {
    if (leaves.length === 0) {
      toast.error("Please add at least one leaf");
      return;
    }

    if (commands.length === 0) {
      toast.error("Please add at least one command");
      return;
    }

    setCurrentLeafIndex(0);
    setCurrentCommandIndex(-1);
    setLeaves(leaves.map(leaf => ({ ...leaf, sunk: false })));
    setIsSimulating(true);
    setIsGameSetup(true);
    setHistory([]);
  };

  // Execute steps automatically when simulation is running
  useEffect(() => {
    if (isSimulating) {
      const timer = setTimeout(() => {
        executeStep();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isSimulating, currentCommandIndex]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-emerald-700">
          Freddy Frog Jumps Again!
        </h1>

        {!isGameSetup ? (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/90 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">Game Setup</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Enter leaves and commands:
                  </label>
                  <Textarea
                    placeholder={`Example format:
7 5
ACDBB
5 6
8 9
4 13
1 10
7 4
10 9
3 7`}
                    value={leafInput}
                    onChange={(e) => setLeafInput(e.target.value)}
                    className="h-48"
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button onClick={loadCustomGame} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    Load Custom Game
                  </Button>
                  <Button onClick={setupExampleGame} className="flex-1">
                    Load Example
                  </Button>
                </div>
                <div className="text-sm text-gray-500 mt-4">
                  <p className="mb-2">
                    <strong>Format:</strong> First line - N (leaves) and M (commands)
                  </p>
                  <p className="mb-2">
                    <strong>Second line:</strong> M commands (A, B, C, or D)
                  </p>
                  <p>
                    <strong>Next N lines:</strong> X and Y coordinates for each leaf
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">Add Leaves Manually</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Enter leaf coordinates (x y):
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="e.g., 5 6"
                      value={leafInput}
                      onChange={(e) => setLeafInput(e.target.value)}
                    />
                    <Button onClick={addLeaf} className="whitespace-nowrap bg-emerald-600 hover:bg-emerald-700">
                      Add Leaf
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Commands:
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="e.g., ACDBB"
                      value={commands}
                      onChange={(e) => {
                        const validCommands = e.target.value
                          .toUpperCase()
                          .replace(/[^ABCD]/g, "");
                        setCommands(validCommands);
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use A (up-right), B (down-right), C (up-left), D (down-left)
                  </p>
                </div>

                <div className="pt-2">
                  <Button 
                    onClick={startSimulation}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={leaves.length === 0 || commands.length === 0}
                  >
                    Start Simulation
                  </Button>
                </div>

                {leaves.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Added Leaves:</h3>
                    <div className="max-h-32 overflow-y-auto border border-gray-200 rounded p-2">
                      {leaves.map((leaf, idx) => (
                        <div key={idx} className="text-sm">
                          {idx + 1}: ({leaf.x}, {leaf.y})
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <PondView 
                leaves={leaves} 
                currentLeafIndex={currentLeafIndex} 
                history={history}
              />
            </div>
            <div className="lg:col-span-1 space-y-4">
              <Card className="p-4 bg-white/90 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-3">Controls</h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Command Progress:</span>
                      <span className="text-xs font-medium">
                        {currentCommandIndex + 1}/{commands.length}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ 
                          width: `${commands.length ? ((currentCommandIndex + 1) / commands.length) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-1">
                    {commands.split('').map((cmd, i) => {
                      const status = i < currentCommandIndex + 1 
                        ? 'completed' 
                        : i === currentCommandIndex + 1 
                          ? 'current' 
                          : 'pending';
                          
                      return (
                        <div 
                          key={i}
                          className={`p-2 rounded text-center text-sm font-medium ${
                            status === 'completed' ? 'bg-emerald-100 text-emerald-700 border-emerald-300 border' :
                            status === 'current' ? 'bg-blue-100 text-blue-700 border-blue-300 border' :
                            'bg-gray-100 text-gray-500 border-gray-200 border'
                          }`}
                        >
                          {cmd}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="space-x-2 pt-2">
                    <Button 
                      onClick={startSimulation} 
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={isSimulating}
                    >
                      Restart
                    </Button>
                    <Button 
                      onClick={resetGame} 
                      variant="outline"
                    >
                      New Game
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white/90 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-3">Current Status</h2>
                <div>
                  {leaves[currentLeafIndex] && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Leaf:</span>
                        <span className="text-emerald-700">
                          {currentLeafIndex + 1} of {leaves.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Position:</span>
                        <span>({leaves[currentLeafIndex].x}, {leaves[currentLeafIndex].y})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Next Command:</span>
                        <span className="font-mono">
                          {currentCommandIndex + 1 < commands.length 
                            ? commands[currentCommandIndex + 1] 
                            : 'Done'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-4 bg-white/90 backdrop-blur-sm">
                <h2 className="text-lg font-semibold mb-2">Jump History</h2>
                <div className="max-h-48 overflow-y-auto">
                  {history.length === 0 ? (
                    <p className="text-sm text-gray-500">No jumps yet</p>
                  ) : (
                    <div className="space-y-1">
                      {history.map((entry, idx) => (
                        <div key={idx} className="text-sm border-b border-gray-100 pb-1">
                          <span className="font-medium">#{idx + 1}:</span> Command {entry.command} from ({entry.leaf.x}, {entry.leaf.y})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrogGame;
