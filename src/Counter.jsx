import React from "react";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    return setCount(count + 1);
  };
  const decrement = () => setCount(count - 1);
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Counter App</h1>
      <p className="mt-4 text-lg">Current Count: {count}</p>
      <button onClick={increment} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Increment
      </button>
      <button onClick={decrement} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Decrement
      </button>
    </div>
  );
}

export default Counter;
