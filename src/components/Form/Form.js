import React, { useState, useRef, useEffect } from 'react';
import ResultCard from '../ResultCard/ResultCard';
import './form.scss';

const Form = ({ sendIdentification }) => {
  const [images, setImages] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [clear, setClear] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const inputRef = useRef();

  const clearResults = () => {
    inputRef.current.value = '';
    setSearchResults(null);
    setClear(false);
  };

  const formHandler = (e) => {
    e.preventDefault();
    sendIdentification(setLoading, images, setSearchResults, setError);
  };

  useEffect(() => {
    setClear(true);
  }, [setSearchResults]);

  return (
    <section className="form">
      <div className="form-div">
      <form className="form__elements" aria-label="form" onSubmit={formHandler}>
        <input ref={inputRef} className="form__input" type="file" multiple onChange={(e) => setImages(e.target.files)}/>
        <button className="form__btn" type="submit">Search</button>
        {clear && <button className="form__btn" onClick={clearResults}>Clear search</button>}
      </form>
      {loading && <p>Loading...</p>}
      </div>
      {searchResults && searchResults.suggestions.map((result, i) => <ResultCard key={i} result={result} />)}
      {error && <p>Something went wrong</p>}
    </section>
  )
}

export default Form