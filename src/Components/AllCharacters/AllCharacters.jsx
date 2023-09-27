import React, { useEffect, useState } from "react";
import axios from "axios";
import './allcharacters.css'

export default function AllCharacters() {
    const [characterlist, setCharacterList] = useState([])
  
    useEffect(() => {
      const APICall = async () => {
        try {
          const res = await axios.get("https://rickandmortyapi.com/api/character/");
          let listAux = []

          for (let i = 1; i <= res.data.info.pages; i++) {
              const auxRes = await axios.get(`https://rickandmortyapi.com/api/character/?page=${i}`)
              listAux.push(auxRes.data.results)
          }

          setCharacterList(listAux.flat())
          
        } catch (error) {
          console.error(error);
        }
      };
      APICall();
    }, []);
  
    return(
      <div className="img-character-div">
        {characterlist.map((item, index)=>(
         <img key={index} src={item.image} alt={item.name} />))}
      </div>
    )
  }
