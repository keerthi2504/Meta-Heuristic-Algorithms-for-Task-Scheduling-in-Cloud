
import { useState } from "react";
import FrogGame from "@/components/FrogGame";

const Index = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-200">
      {!isGameStarted ? (
        <div className="flex flex-col items-center justify-center h-screen p-6">
          <h1 className="text-4xl font-bold mb-6 text-center text-emerald-700">
            Freddy Frog Jumps Again!
          </h1>
          <div className="max-w-xl bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <p className="text-lg mb-6">
              Apaar is relaxing beside a large pond, while his pet frog Freddy is enjoying hopping between leaves.
              Help Freddy navigate through the pond by following Apaar's commands!
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><span className="font-bold">A</span>: Jump diagonally up-right (x+Z, y+Z)</li>
              <li><span className="font-bold">B</span>: Jump diagonally down-right (x+Z, y-Z)</li>
              <li><span className="font-bold">C</span>: Jump diagonally up-left (x-Z, y+Z)</li>
              <li><span className="font-bold">D</span>: Jump diagonally down-left (x-Z, y-Z)</li>
            </ul>
            <button 
              onClick={() => setIsGameStarted(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-md font-medium transition-colors shadow-md"
            >
              Start Game
            </button>
          </div>
        </div>
      ) : (
        <FrogGame />
      )}
    </div>
  );
};

export default Index;
