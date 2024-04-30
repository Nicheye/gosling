import React, { useState, useEffect} from 'react';

import {Link} from 'react-router-dom'

const Navigate = () => {
	const [isAuth,setIsAuth] = useState(false)
	useEffect(() => {
		if(localStorage.getItem('access_token') !== null){
			setIsAuth(true);
		}
	},[isAuth]);
  return (

  <>


  <header>
    <nav class="bg-gray-950 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 rounded">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to={'/'} className="brand-title">Ryan Gosling</Link>
            
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {isAuth ? <Link to="/profile" className='block py-2 pr-4 pl-3  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white'>Profile</Link> : null}
       
        {isAuth ? null :
                  
                  
            <Link to="/login" className='block py-2 pr-4 pl-3  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white'>Login</Link>}
                
                </ul>
            </div>
        </div>
    </nav>
</header>
  </> 
        
  )
}

export default Navigate