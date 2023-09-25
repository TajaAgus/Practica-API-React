import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Search from "./Components/Search/Search";
import AllCharacters from "./Components/AllCharacters/AllCharacters";
import Footer from "./Components/Footer/Footer";
import "./app.css" 

function App() {
  return (
    <div className="app">
    <Header/>
    <Routes>
      <Route path="/" element={<Search/>}/>
      <Route path="/personajes" element={<AllCharacters/>}/>
    </Routes>
    <Footer/>
    </div>
    
  );
}
export default App;
