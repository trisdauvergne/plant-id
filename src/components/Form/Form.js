import React, { useState, useEffect } from 'react'

const Form = () => {
  const [images, setImages] = useState([]);
  const [searchResults, setSearchResults] = useState(null)

  const sendIdentification = () => {
    if (images) {
      console.log(images);
    }
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
    })
    
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
        console.error('Error:', error);
      });
    })
  };

  useEffect(() => {
    console.log('the search results', searchResults);
  }, [searchResults])

  return (
    <div>
      <h2>Form section</h2>
      {/* Added aria label below for testing */}
      <form aria-label="form" onSubmit={sendIdentification}>
        <input type="file" multiple onChange={(e) => setImages(e.target.files)}/>
        <button type="button" onClick={sendIdentification}>OK</button>
      </form>
      {searchResults && <p>There are some results</p>}
      {searchResults && searchResults.suggestions.map(result => <div>
        <p>{result.plant_name}</p>
        <p>{result.plant_details.wiki_description.value}</p>
        <a href={result.plant_details.wiki_description.value} target="_blank" rel="noreferrer"><p>Wiki</p></a>
        <p>Images</p>
        {result.similar_images.map(image => <p>{image.url}</p>)}
      </div>)}
    </div>
  )
}

export default Form