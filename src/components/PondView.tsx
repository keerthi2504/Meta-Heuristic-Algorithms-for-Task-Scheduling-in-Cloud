
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Leaf {
  x: number;
  y: number;
  id: number;
  sunk?: boolean;
}

interface PondViewProps {
  leaves: Leaf[];
  currentLeafIndex: number;
  history: { leaf: Leaf; command: string }[];
}

const PondView: React.FC<PondViewProps> = ({ leaves, currentLeafIndex, history }) => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [animatingFrog, setAnimatingFrog] = useState(false);
  const [viewBox, setViewBox] = useState({ minX: 0, minY: 0, width: 100, height: 100 });
  
  // Calculate the viewBox to fit all leaves with padding
  useEffect(() => {
    if (leaves.length === 0) return;
    
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    
    leaves.forEach(leaf => {
      minX = Math.min(minX, leaf.x);
      minY = Math.min(minY, leaf.y);
      maxX = Math.max(maxX, leaf.x);
      maxY = Math.max(maxY, leaf.y);
    });
    
    // Add padding
    const padding = Math.max(5, Math.max(maxX - minX, maxY - minY) * 0.2);
    
    setViewBox({
      minX: minX - padding,
      minY: minY - padding,
      width: maxX - minX + padding * 2,
      height: maxY - minY + padding * 2
    });
  }, [leaves]);
  
  // Trigger frog jump animation when current leaf changes
  useEffect(() => {
    if (history.length > 0) {
      setAnimatingFrog(true);
      const timer = setTimeout(() => {
        setAnimatingFrog(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentLeafIndex, history.length]);
  
  // Calculate path coordinates
  const getPathCoordinates = () => {
    if (history.length < 1) return [];
    
    const pathPoints = [];
    
    // Get initial position (first leaf)
    if (leaves.length > 0 && leaves[0]) {
      pathPoints.push({ x: leaves[0].x, y: leaves[0].y });
    }
    
    // Add each jump point
    let currentIdx = 0;
    for (let i = 0; i < history.length; i++) {
      const entry = history[i];
      const nextLeaf = findNextLeafAfterCommand(entry.leaf, entry.command);
      
      if (nextLeaf !== null) {
        pathPoints.push({ x: nextLeaf.x, y: nextLeaf.y });
        currentIdx = nextLeaf.id;
      } else {
        // If no next leaf, stay on current
        pathPoints.push({ x: entry.leaf.x, y: entry.leaf.y });
      }
    }
    
    return pathPoints;
  };
  
  // Helper to find next leaf after a command
  const findNextLeafAfterCommand = (currentLeaf: Leaf, command: string): Leaf | null => {
    // Filter leaves that haven't sunk yet at the time of this command
    // This is a simplified version - we're not tracking which leaves were sunk at each step
    const availableLeaves = leaves.filter(leaf => leaf.id !== currentLeaf.id);
    
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
      isInDirection(leaf, command)
    );
    
    if (leavesInDirection.length === 0) return null;
    
    // Find the closest leaf in the direction
    leavesInDirection.sort((a, b) => {
      const distA = Math.abs(a.x - currentLeaf.x);
      const distB = Math.abs(b.x - currentLeaf.x);
      return distA - distB;
    });
    
    return leavesInDirection[0];
  };
  
  const pathCoords = getPathCoordinates();
  
  return (
    <div className="relative w-full h-[500px] bg-pond-water rounded-xl overflow-hidden shadow-lg">
      {/* Water pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-pond-water" style={{ 
          backgroundImage: 'radial-gradient(circle, transparent 20%, #67B4DE 20%, #67B4DE 21%, transparent 21%, transparent), radial-gradient(circle, transparent 20%, #67B4DE 20%, #67B4DE 21%, transparent 21%, transparent)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}></div>
      </div>
      
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Path of the frog's jumps */}
        {pathCoords.length > 1 && (
          <path
            d={`M ${pathCoords.map(p => `${p.x} ${p.y}`).join(' L ')}`}
            stroke="#4D8B31"
            strokeWidth="0.5"
            strokeDasharray="1,1"
            fill="none"
            opacity="0.7"
          />
        )}
        
        {/* Draw leaves */}
        {leaves.map((leaf, idx) => {
          const isCurrent = idx === currentLeafIndex;
          const hasSunk = leaf.sunk;
          
          return (
            <g 
              key={`leaf-${leaf.id}`} 
              className={cn(
                "transition-transform duration-1000",
                hasSunk && "animate-leaf-sink"
              )}
              transform={`translate(${leaf.x}, ${leaf.y})`}
            >
              {/* Leaf shadow */}
              <ellipse 
                cx="0" 
                cy="0" 
                rx="3" 
                ry="2" 
                fill="#00000030" 
                transform="translate(0.5, 0.5)" 
              />
              
              {/* Leaf */}
              <circle 
                cx="0" 
                cy="0" 
                r="2.5" 
                fill={isCurrent ? "#97E469" : hasSunk ? "#97E46980" : "#7AC74F"} 
                stroke={isCurrent ? "#4D8B31" : "none"}
                strokeWidth="0.3"
              />
              
              {/* Leaf vein */}
              <line 
                x1="-2" 
                y1="0" 
                x2="2" 
                y2="0" 
                stroke="#4D8B31" 
                strokeWidth="0.2"
                opacity={hasSunk ? 0.5 : 1} 
              />
              
              {/* Leaf text label */}
              <text 
                x="0" 
                y="-3.5" 
                textAnchor="middle" 
                fontSize="2" 
                fill={isCurrent ? "#000" : "#333"} 
                fontWeight={isCurrent ? "bold" : "normal"}
                opacity={hasSunk ? 0.5 : 1}
              >
                {idx + 1}
              </text>
              
              {/* Position text */}
              <text 
                x="0" 
                y="4.5" 
                textAnchor="middle" 
                fontSize="1.5" 
                fill="#333" 
                opacity={hasSunk ? 0.5 : 1}
              >
                ({leaf.x}, {leaf.y})
              </text>
              
              {/* Frog */}
              {isCurrent && (
                <g className={cn(
                  "transition-all",
                  animatingFrog && "animate-frog-jump"
                )}>
                  {/* Frog body */}
                  <ellipse 
                    cx="0" 
                    cy="-1" 
                    rx="1.5" 
                    ry="1" 
                    fill="#4CAF50" 
                  />
                  
                  {/* Frog head */}
                  <circle 
                    cx="0" 
                    cy="-2.5" 
                    r="1" 
                    fill="#4CAF50" 
                  />
                  
                  {/* Eyes */}
                  <circle 
                    cx="-0.5" 
                    cy="-2.7" 
                    r="0.3" 
                    fill="white" 
                  />
                  <circle 
                    cx="0.5" 
                    cy="-2.7" 
                    r="0.3" 
                    fill="white" 
                  />
                  <circle 
                    cx="-0.5" 
                    cy="-2.7" 
                    r="0.15" 
                    fill="black" 
                  />
                  <circle 
                    cx="0.5" 
                    cy="-2.7" 
                    r="0.15" 
                    fill="black" 
                  />
                  
                  {/* Legs */}
                  <line 
                    x1="-1" 
                    y1="-1" 
                    x2="-2" 
                    y2="-1" 
                    stroke="#4CAF50" 
                    strokeWidth="0.3" 
                  />
                  <line 
                    x1="1" 
                    y1="-1" 
                    x2="2" 
                    y2="-1" 
                    stroke="#4CAF50" 
                    strokeWidth="0.3" 
                  />
                </g>
              )}
            </g>
          );
        })}
        
        {/* Coordinate system */}
        <g opacity="0.5">
          <line 
            x1={viewBox.minX} 
            y1="0" 
            x2={viewBox.minX + viewBox.width} 
            y2="0" 
            stroke="#00000030" 
            strokeWidth="0.2" 
            strokeDasharray="0.5,0.5" 
          />
          <line 
            x1="0" 
            y1={viewBox.minY} 
            x2="0" 
            y2={viewBox.minY + viewBox.height} 
            stroke="#00000030" 
            strokeWidth="0.2" 
            strokeDasharray="0.5,0.5" 
          />
        </g>
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/70 rounded p-2 text-xs">
        <div className="flex items-center space-x-1 mb-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Freddy's current position</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-green-300 opacity-50"></div>
          <span>Sunk leaf</span>
        </div>
      </div>
    </div>
  );
};

export default PondView;
