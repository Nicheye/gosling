import React,{useState} from 'react'
import axios from 'axios'
// Define the Login function.
import {Link} from 'react-router-dom'
const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
// Create the submit method.
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
  localStorage.clear();
  console.log(data.access)
  localStorage.setItem('access_token',data.access);
  localStorage.setItem('refresh_token',data.refresh);
  axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
  window.location.href = '/'
  }

  return (
    <>
    

<form class="max-w-sm mx-auto auth_form" onSubmit={submit}>
  <div className="login_title">Login</div>
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-rose-400 dark:text-black">Your username</label>
    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ananas228" required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-rose-400 dark:text-white">Your password</label>
    <input type="password"value={password} onChange={(e)=>setPassword(e.target.value)}  id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  
  <button type="submit" class="text-white bg-rose-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 auth_btn">Submit</button>
  <Link to={'/register'} href="#" class=" font-semibold text-pink-200 underline dark:text-white decoration-rose-500 decoration-double mt-10">Dont have account? register</Link>
</form>

    </>


  )
}

export default Login