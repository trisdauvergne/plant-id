import React, { useState, useEffect } from 'react'

const Form = () => {
  const [images, setImages] = useState([]);
  const [searchResults, setSearchResults] = useState([])

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
      // .then(data => setSearchResults(data))
      .catch((error) => {
        console.error('Error:', error);
      });
    })
  };

  useEffect(() => {
    console.log(searchResults);
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
      {searchResults && <p>{searchResults.suggestions[0].plant_name}</p>}
    </div>
  )
}

export default Form


// import React, { useState, useEffect } from 'react'

// const Form = () => {
//   const [imageFile, setImageFile] = useState(undefined);
//   const [imageBase64, setImageBase64] = useState('');

//   // const API_KEY = process.env.REACT_APP_API_KEY;

//   const fetchData = () => {
//     console.log('In fetch data');
//     // console.log('line 9 API KEY', API_KEY);
//     const data = {
//       api_key: process.env.REACT_APP_API_KEY,
//       images: imageBase64,
//       modifiers: ["crops_fast", "similar_images"],
//       plant_language: "en",
//       plant_details: ["common_names",
//                         "url",
//                         "name_authority",
//                         "wiki_description",
//                         "taxonomy",
//                         "synonyms"]
//     };

//     if (imageBase64) {
//       console.log('line 24', data);
//       fetch('https://api.plant.id/v2/identify', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Success:', data);
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//       }
//   }

//   useEffect(() => {
//     fetchData();
//   }, [imageBase64]);

//   const convertImageToBase64 = async (e) => {
//     e.preventDefault();
//     console.log('line 50', imageFile);
//     const reader = await new FileReader();
//     reader.readAsDataURL(imageFile);
//     reader.onload = () => {
//       // console.log('line 12', reader.result);
//       setImageBase64(reader.result);
//     };
//     reader.onerror = (error) => {
//       console.log('line 58 ERROR:', error)
//     };
//    fetchData(); 
//   }

//   const saveImageToState = async (e) => {
//     console.log('line 64', e.target.files[0]);
//     const image = e.target.files[0];
//     setImageFile(image);
//   };

//   return (
//     <section>
//       <h2>Form section</h2>
//       {/* Added aria label below for testing */}
//       <form aria-label="form">
//         <input
//           type="file"
//           onChange={saveImageToState}
//           required 
//         />
//         <button onClick={convertImageToBase64}>Submit</button>
//       </form>
//       {imageFile && <p>There's an image called {imageFile.name}</p>}
//       {imageBase64 && <p>There should be string base64 for the image now as well</p>}
//     </section>
//   )
// }

// export default Form

