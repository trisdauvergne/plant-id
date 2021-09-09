import React, { useState } from 'react';
import ResultCard from '../ResultCard/ResultCard';

const Form = () => {
  const [images, setImages] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendIdentification = () => {
    setLoading(true);
    const files = [...images];
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const res = event.target.result;
            console.log(res);
            resolve(res);
          }
          reader.readAsDataURL(file)
      })
    });
    
    Promise.all(promises).then((base64files) => {
      console.log(base64files)
            
      const data = {
        api_key: process.env.REACT_APP_API_KEY,
        images: base64files,
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: ["common_names",
                          "url",
                          "name_authority",
                          "wiki_description",
                          "taxonomy",
                          "synonyms"]
      };
      
      fetch('https://api.plant.id/v2/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
        console.log('Success:', data);
      })
      .catch((error) => {
        setError(true);
        console.error('Error:', error);
      });
    })
    setLoading(false);
  };

  return (
    <div>
      <h2>Form section</h2>
      {/* Added aria label below for testing */}
      <form aria-label="form" onSubmit={sendIdentification}>
        <input type="file" multiple onChange={(e) => setImages(e.target.files)}/>
        <button type="button" onClick={sendIdentification}>OK</button>
      </form>
      {loading && <p>Loading...</p>}
      {searchResults && searchResults.suggestions.map((result, i) => <ResultCard key={i} result={result} />)}
      {error && <p>Something went wrong</p>}
    </div>
  )
}

export default Form