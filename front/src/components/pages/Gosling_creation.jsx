import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Head from '../carousel/Head';
const Gosling_creation = () => {

	const [data,setData] = useState([])
	const [title,setTitle] = useState('');
	const [description,setDescripiom] = useState('');
	const [head,setHead] = useState();
	const [body,setBody] = useState();
	const [feet,setFeet] = useState();
	const [boots,setBoots] = useState();




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

  const submit = async e =>{
    e.preventDefault()

    const user = {
      username:username,
      password:password
    };
// Create the POST requuest
const config = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
};

const { data } = await axios.post('http://localhost:8000/token/', user, config);
  
  }

  return (
	<>
	<section class="bg-white dark:bg-gray-900">
  <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Create <span class="text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-pink-400">Гослинг</span></h2>
      <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Незабываемый и уникальный</p>
      <form action="#" class="space-y-8" onSubmit={submit}>
	  <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Имя-кличка</label>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Goslinger" required />
        </div>

		<div>
		<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание</label>
<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{'resize':'none'}} placeholder="Напишите, что о нем думаете..."></textarea>
		</div>

		<div>

			<Head/>
		</div>
      </form>
  </div>
</section>
	</>
  )
}

export default Gosling_creation