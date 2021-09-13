import React from 'react';
import './resultcard.scss';

const ResultCard = ({ result }) => {
  console.log('in result card', result);
  return (
    <section className="resultcard">
      <div className="resultcard__text">
        <h1>{result.plant_name}</h1>
        <p>{result.plant_details.wiki_description.value}</p>
        <p>Read about {result.plant_name} <a href={result.plant_details.url} target="_blank" rel="noreferrer">here</a></p>
      </div>
      <div className="resultcard__images">
        <p>Images</p>
        {result.similar_images.map(image => <img className="resultcard__image" src={image.url} alt="plant search result"/>)}
      </div>
    </section>
  )
}

export default ResultCard
