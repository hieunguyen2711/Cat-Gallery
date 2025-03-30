import { useState } from 'react'
import './App.css'
import GalleryNav from './Components/GalleryNav';
import BanNav from './Components/BanNav';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const breeds_link = `https://api.thecatapi.com/v1/breeds?api_key=${ACCESS_KEY}` ;
// const image_link = `https://api.thecatapi.com/v1/images/search?api_key=${ACCESS_KEY}`;


function App() {
  const [picInfo, setPicInfo] =useState({
    name: " ",
    origin: " ",
    weight: " ",
    age: " ",
  })

  // const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [prevImageUrl, setPrevImageUrl] = useState([]);
  const [prevDes, setPrevDes] = useState([]);
  const [isPicInfo, setIsPicInfo] = useState(false);
  // Banned attributes state
  const [bannedAttributes, setBannedAttributes] = useState({
    name: new Set(),
    origin: new Set(),
    weight: new Set(),
    age: new Set(),
  });

 


  const submitForm = () => {
    makeQuery();
  }

  const makeQuery = () => {

    callAPI(breeds_link);
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(json[0]);
    if (json == null) {
      alert("Oops! Something went wrong with your query, let's try that again!");
      return;
    } 
    // } else {
    //   const randomBreed = json[Math.floor(Math.random() * json.length)];
    //   console.log(randomBreed);
    //   const imageId = randomBreed.reference_image_id;
    const validBreeds = json.filter (
      (breed) => 
        !bannedAttributes.name.has(breed.name) &&
        !bannedAttributes.origin.has(breed.origin) &&
        !bannedAttributes.weight.has(`${breed.weight.metric} lbs`) &&
        !bannedAttributes.age.has(`${breed.life_span} yrs old`)
    );
    if (validBreeds.length === 0) {
      alert("No more cats available that meet your criteria!");
      return;
    }

    const randomBreed = validBreeds[Math.floor(Math.random() * validBreeds.length)];
    const imageId = randomBreed.reference_image_id;

    if (imageId) {
      const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/${imageId}`);
      const imageData = await imageResponse.json();
      let newImageUrl = imageData.url || "";
      setImageUrl(newImageUrl);
      setPrevImageUrl((images) => [...images, newImageUrl]);
      console.log(prevImageUrl);
      console.log(`Here is the image url: ${imageUrl}`);
    }

    const newPicInfo = {
      name: randomBreed.name,
      origin: randomBreed.origin,
      weight: `${randomBreed.weight.metric} lbs`,
      age: `${randomBreed.life_span} yrs old`
    };

    setPicInfo(newPicInfo);

    let des = `A ${randomBreed.name} from ${randomBreed.origin}.`
    setPrevDes((description) => [...description, des]);

    setIsPicInfo(true);
    
    console.log(picInfo.weight);
 
  }
  const banAttribute = (key, value) => {
    setBannedAttributes((prevBans) => ({
      ...prevBans,
      [key]: new Set([...prevBans[key], value]),
    }));
  };

  const removeBan = (key, value) => {
    setBannedAttributes((prevBans) => {
      const updatedSet = new Set(prevBans[key]);
      updatedSet.delete(value);
      return { ...prevBans, [key]: updatedSet };
    });
  };

  return (
    
    <div>
      <GalleryNav images={prevImageUrl} descriptions={prevDes}/>
      <div className='wholePage'>
        
        <h1>Trippin' on Cats</h1>
        <h3>Discover cats from your wildest dreams!</h3>
        🐱😹😹😹😹😾😾😻😻😻😻😻
        <br />
        <br />
        <div className='discover-container'>
          <div className='listing-container'>
            <h2>{picInfo.name}</h2>
            {isPicInfo && (
              <div className='buttons'>
              <button onClick={() => banAttribute("name", picInfo.name)} type='attribute' className='attribute-buttons' >{picInfo.name}</button>
              <button onClick={() => banAttribute("name", picInfo.weight)} type='attribute' className='attribute-buttons'>{picInfo.weight}</button>
              <button onClick={() => banAttribute("name", picInfo.origin)} type='attribute' className='attribute-buttons'>{picInfo.origin}</button>
              <button onClick={() => banAttribute("name", picInfo.age)} type='attribute' className='attribute-buttons'>{picInfo.age} </button>
            </div>
            )}
            
            {imageUrl && (
              <img
                className="cat-pic"
                src={imageUrl}
                alt="Random image from Cat API"
                height="250px" 
                width= "250px"
              />
            )} 
          </div>
          <br />
          <button type='discover' className='discover-btn' onClick={submitForm}>🔀 Discover new Cats</button>

        </div>
      </div>
      <BanNav banAttribute={bannedAttributes} handleChange={removeBan} />
      
    </div>
    
    
  )
}

export default App
