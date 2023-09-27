import React, { useState } from "react";
import axios from "axios";
import OpenAI from "openai";
import "./search.css";
import NoEntendiIMG from "./noentendi.png";


export default function Search() {
  const [userInput, setUserInput] = useState("");
  const [character, setCharacter] = useState(null);
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const characters = {
    "Rick": 1,
    "Morty": 2,
    "Summer": 3,
    "Beth": 4,
    "Jerry": 5,
    "Birdperson": 599,
    "Mr. Meeseeks": 242,
    "Pickle Rick": 265,
    "Jessica": 180,
    "Snuffles": 329,
    "Amagheadon": 24,
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      setCharacter(null);
      chooseCharacter();
    }
  };

  const chooseCharacter = async () => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0613",
        messages: [
          { role: "system", content: "You are a tool that selects rick and morty characters based on the user's input" },
          { role: "user", content: userInput },
        ],
        functions: [
          {
            name: "RickMortyCharacters",
            description: "Select one rick and morty character",
            parameters: {
              type: "object",
              properties: {
                character: {
                  type: "string",
                  enum: Object.keys(characters),
                  description: "List of Rick and Morty's characters",
                },
              },
              required: ["character"],
            },
          },
        ],
      });
      let res = {
        data: {
          image: NoEntendiIMG,
          name: 'No te entendí, describí mejor al personaje'
        }
      };
      try {
        const rawCompletion = completion.choices[0].message.function_call.arguments;
        const completionObj = JSON.parse(rawCompletion);
        if (completionObj.character && characters.hasOwnProperty(completionObj.character)) {
          res = await axios.get(
            `https://rickandmortyapi.com/api/character/${characters[completionObj.character]}`
          ); 
        } 
      } catch (error){
        console.error("Bad gpt response")
      }
      setCharacter(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Describí al personaje"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={handleKey}
        className="input-container"
      />
      <img
        className="character-img"
        src={character?.image}
        alt={character?.name}
      />
      <span className="character-name">{character?.name}</span>
    </div>
  );
}
