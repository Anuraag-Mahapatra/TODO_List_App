import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <div className="flex justify-around items-center bg-purple-600 text-white w-full h-[10vh]">
            <div className="logo ">
                <span className='text-3xl font-extrabold cursor-pointer'>TODO</span>
            </div>
            <div className="links">
                <ul className='flex font-bold gap-10'>
                    <li><a href="/" className='hover:text-purple-950'>Home</a></li>
                    <li><a href="/" className='hover:text-purple-950'>Your Tasks</a></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
