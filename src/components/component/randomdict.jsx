
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { useState } from 'react';
import axios from 'axios';
// import { useEffect } from 'react';



export function Randomdict() {
  const[words, setWords] = useState();
  const[meaning, setMeaning] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  const [isFetchingWords, setIsFetchingWords] = useState(false);
  const [isFetchingMeaning, setIsFetchingMeaning] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);



  // useEffect(() => {
  //   fetchWords();
  // }, []);

  const fetchWords = async () => {
    try {
      setIsFetchingWords(true);
      const response = await axios.get(`https://api.api-ninjas.com/v1/randomword`, {
      headers: { 'X-Api-Key':'GhXZgWLgKz9iHc15xCpabQ==pGeCPZZNr733nNGv'},
    });
      setIsFetchingWords(false);
      setWords(response.data.word);
    }
    catch {
      setIsFetchingWords(false);
      console.error("error", error);
    }
  }

  const fetchMeaning = async () => {
    try{
      setIsFetchingMeaning(true);
      const response = await axios.get(`https://api.api-ninjas.com/v1/dictionary?word=${words}`, {
        headers: { 'X-Api-Key':'GhXZgWLgKz9iHc15xCpabQ==pGeCPZZNr733nNGv'},

    });
      setIsFetchingMeaning(false);
      if (words == null) {
        setErrorMessage("Please Generate Random Word First");
      }
      else if (response.data.valid === false) {
        setErrorMessage("Sorry We Couldn't Find The Meaning Of This Word");
      }
      else {
        setErrorMessage(null);
        setMeaning(response.data.definition);
      }
  }
    catch {
      setIsFetchingMeaning(false);
    }
  }


  return (
    <div className="flex flex-col items-center gap-4 py-6 w-full">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Random Word Generator</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Click the button to generate a random word and see its meaning.
        </p>
      </div>
      <Button onClick={fetchWords} className="w-full md:w-auto">Generate Random Word</Button>
      <div className="flex flex-col items-center gap-4 w-full md:flex-row md:gap-8">
        <div className="flex flex-col gap-2 w-full md:grid md:grid-cols-2 md:gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Word</CardTitle>
              <CardDescription>Randomly generated word.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
            { isFetchingWords ? (
              <p>Loading...</p>  // Replace this with your preloader
            ) : (
              <p className="text-4xl font-bold">{words}</p>
            )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Meaning</CardTitle>
              <CardDescription>The meaning of the generated word.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-12">
            <div className="flex flex-col items-center">
              <Button onClick={fetchMeaning} className="w-full md:w-auto mb-4">Get Meaning</Button>
              {isFetchingMeaning ? (
                <p>Loading...</p>  // Replace this with your preloader
               ) : errorMessage ? (
                <p>{errorMessage}</p>
              ) : (
              <p className="text-center">
                <span className="font-bold">{meaning}</span>
              </p>
               )}
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
