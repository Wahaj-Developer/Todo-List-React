import React from 'react'

const Navbar = () => {
  return (
 <nav className='flex justify-between bg-violet-500 text-white py-2'>
    <div className="logo">
        <span className=" font-bold text-xl mx-9">iTask</span>
    </div>

<ul className="flex gap-8 mx-9">
<li className="cursor-pointer hover:font-bold transition-all">Start yor day</li>
<li className="cursor-pointer hover:font-bold transition-all">Plane yor day </li>
</ul>


 </nav>
  )
}

export default Navbar
