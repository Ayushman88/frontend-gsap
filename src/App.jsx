import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./page/Home";
import Accordion from "./components/AccordianDennis.jsx";
import { gsap } from "gsap";

// Wrapper to animate page transitions
const PageWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    gsap.fromTo(
      ".page-transition",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [location]);

  return <div className="page-transition">{children}</div>;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col p-4 bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl pt-10 text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 tracking-tight">
            Ayushman's Awwwards-Like Frontend Work
          </h1>
          <nav className="mt-6">
            <ul className="flex justify-center gap-8 text-lg">
              <li>
                <Link
                  to="/"
                  className="relative text-blue-600 hover:text-blue-800 font-medium transition"
                >
                  Home
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/accordion-dennis"
                  className="relative text-blue-600 hover:text-blue-800 font-medium transition"
                >
                  Accordion
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content with Page Transitions */}
        <main className="flex-grow">
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/accordion-dennis" element={<Accordion />} />
            </Routes>
          </PageWrapper>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 border-t border-gray-200 pt-6 pb-4 text-sm">
          <p>
            Designed & Developed by{" "}
            <span className="font-semibold text-blue-600 hover:underline">
              Ayushman
            </span>{" "}
            • © {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
