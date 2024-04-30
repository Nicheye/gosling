import React, { useState,useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
const Head = () => {
  const [data,setData] = useState([]);
  useEffect(() => {
    if(localStorage.getItem('access_token') ===null){
      window.location.href = '/login'

    }
    else{
      (async () =>{
        try{
          const {data} = await axios.get(
            'http://127.0.0.1:8000/api/v1/all_parts/',{
              headers:{
                'Content-Type':'application/json'
              },
              withCredentials:true,
            }
          );
		  console.log(data.heads)
          setData(data.heads)
        }
        catch (e){
          console.log('not auth')
        }
      })()};
  },[]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {data.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl.image} alt={`Slide ${index}`} />
        </div>
      ))}
    </Slider>
  );
};

// Usage:


const App = () => {
  return (
    <div>
      <h1>React-Slick Carousel</h1>
      <Carousel images={images} />
    </div>
  );
};

export default Head;
