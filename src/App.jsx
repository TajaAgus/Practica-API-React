import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Search from "./Components/Search/Search";
import AllCharacters from "./Components/AllCharacters/AllCharacters";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Search/>}/>
      <Route path="/personajes" element={<AllCharacters/>}/>
    </Routes>
    <Footer/>
    </>
    
  );
}
export default App;
