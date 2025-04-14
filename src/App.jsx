import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="mb-12">
        <h1 className="text-4xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Ayushman's Vite Template
        </h1>
      </header>

      <main className="flex-grow">
        <section className="max-w-2xl mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Welcome to My Vite Template
          </h2>
          <p className="mb-12 text-gray-600 text-lg">
            This is a starting point for your React applications
          </p>

          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setCount(count - 1)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl rounded-lg 
              hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all shadow-md"
            >
              −
            </button>
            <span className="text-3xl font-bold text-gray-800 w-20">
              {count}
            </span>
            <button
              onClick={() => setCount(count + 1)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl rounded-lg 
              hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all shadow-md"
            >
              +
            </button>
          </div>
        </section>
      </main>

      <footer className="mt-12 text-center text-gray-600">
        <p className="text-sm">
          Created with ❤️ by{" "}
          <span className="font-semibold text-blue-600">Ayushman</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
