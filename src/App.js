import './App.css';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer';

function App() {

  // Break this function down into 2:
  // 1. Handle images
  // 2. Make fetch request
  
  const sendIdentification = (setLoading, images, setSearchResults, setError) => {
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
    <div className="App">
      <Header />
      <Form sendIdentification={sendIdentification} />
      <Footer />
    </div>
  );
}

export default App;
