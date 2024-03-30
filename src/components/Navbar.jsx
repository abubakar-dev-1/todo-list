import React from 'react'

const Navbar = () => {
  return (
    <nav className=' flex justify-between bg-[#5f5dbd] px-6 py-5'>
        <span className=' text-white font-bold text-3xl cursor-default '>iTask</span>
        <ul className=' flex gap-10'>
            <li className=' text-white text-2xl font-mono  hover:font-bold transition-all ease-in-out duration-300'><a className=' no-underline hover:underline' href="">Home</a></li>
            <li className=' text-white text-2xl font-mono no-underline hover:font-bold transition-all duration-500'><a className=' no-underline hover:underline' href="">Tasks</a></li>
        </ul>
    </nav>
  )
}

export default Navbar
