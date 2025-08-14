import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importing components
import Counter from "./Counter";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import Services from "./Pages/Services";
import { Contact } from "./Pages/Contact";
import AboutUsPage from "./Pages/AboutUsPage";

function App() {
  return (
    <>
      <div className="App ">
        <Router>
          {/* start header */}
          <Navbar />
          {/* end header */}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Routes>

          {/* start footer */}
          <Footer />
          {/* end footer */}
          {/* <Counter /> */}
        </Router>
      </div>
    </>
  );
}

export default App;
