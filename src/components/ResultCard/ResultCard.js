import React from 'react'

const ResultCard = ({ result }) => {
  console.log('in result card', result);
  return (
    <div>
      <h3>{result.plant_name}</h3>
      <p>{result.plant_details.wiki_description.value}</p>
      <a href={result.plant_details.url} target="_blank" rel="noreferrer"><p>{result.plant_details.url}</p></a>
      <p>Images</p>
      {result.similar_images.map(image => <img src={image.url} alt="plant search result" width="200"/>)}
    </div>
  )
}

export default ResultCard
