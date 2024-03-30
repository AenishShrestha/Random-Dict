
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { useState } from 'react';
import axios from 'axios';
// import { useEffect } from 'react';



export function Randomdict() {
  const[words, setWords] = useState();
  const[meaning, setMeaning] = useState();
  const [isLoading, setIsLoading] = useState(false);


  // useEffect(() => {
  //   fetchWords();
  // }, []);

  const fetchWords = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.api-ninjas.com/v1/randomword`, {
      headers: { 'X-Api-Key':'GhXZgWLgKz9iHc15xCpabQ==pGeCPZZNr733nNGv'},
    });
      setIsLoading(false);
      setWords(response.data.word);
    }
    catch {
      setIsLoading(false);
      console.error("error", error);
    }
  }

  const fetchMeaning = async () => {
    try{
      setIsLoading(true);
      const response = await axios.get(`https://api.api-ninjas.com/v1/dictionary?word=${words}`, {
        headers: { 'X-Api-Key':'GhXZgWLgKz9iHc15xCpabQ==pGeCPZZNr733nNGv'},

    });
    setIsLoading(false);
    setMeaning(response.data.definition);
  }
    catch {
      setIsLoading(false);
      console.error("error", error);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 py-6 w-full">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Keyword Generator</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Click the button to generate a random keyword and see its meaning.
        </p>
      </div>
      <Button onClick={fetchWords} className="w-full md:w-auto">Generate Keyword</Button>
      <div className="flex flex-col items-center gap-4 w-full md:flex-row md:gap-8">
        <div className="flex flex-col gap-2 w-full md:grid md:grid-cols-2 md:gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword</CardTitle>
              <CardDescription>Randomly generated keyword.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-4xl font-bold">{words}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Meaning</CardTitle>
              <CardDescription>The meaning of the generated keyword.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-12">
            <div className="flex flex-col items-center">
              <Button onClick={fetchMeaning} className="w-full md:w-auto mb-4">Get Meaning</Button>
              {isLoading ? (
                <p>Loading...</p>  // Replace this with your preloader
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
