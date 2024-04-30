import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
const Home = () => {
  const [data,setData] = useState([])

  useEffect(() => {
    if(localStorage.getItem('access_token') ===null){
      window.location.href = '/login'

    }
    else{
      (async () =>{
        try{
          const {data} = await axios.get(
            'http://127.0.0.1:8000/api/v1/',{
              headers:{
                'Content-Type':'application/json'
              },
              withCredentials:true,
            }
          );
          setData(data.data)
        }
        catch (e){
          console.log('not auth')
        }
      })()};
  },[]);


  return (
    <>
    <div className="main-wrapper">
      {data.map(gosling =>

      

<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 card">
    <div className="gosling-image">
    <img src={gosling.head.image} alt="" className="head-image" />
    <img src={gosling.body.image} alt="" className="body-image" />
    <img src={gosling.feet.image} alt="" className="feet-image" />
    <img src={gosling.boots.image} alt="" className="boots-image" />
    </div>
    


    <a href="#">
        <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{gosling.title}</h5>
    </a>
    <p class="mb-3 text-center font-normal text-gray-700 dark:text-gray-400">{gosling.description}</p>
    <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex  justify-end">{gosling.created_by}</button>
</div>
 )}
    </div>
    </>
  )
}

export default Home