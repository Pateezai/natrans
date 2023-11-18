import React from 'react'
import {FaListUl} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='min-w-[270px] w-full bg-slate-900 py-2 sm:px-2 px-8 flex items-center justify-between'>

      <div className="flex text-white gap-2 items-end">
        <Link to='../'>
          <span className='text-2xl font-semibold text-slate-50 p-1'>Na-trans.</span>
        </Link>
        <div className="menu hidden">
          <ul className='flex items-center gap-2 p-1'>
            <li>Services</li>
            <li>Contact</li>
            <li>About</li>
          </ul>
        </div>
      </div>

      {/* <FaListUl size={25} className='text-white'/> */}
      <div className="text-white flex items-center gap-2 hidden">
        <select name="lang" id="" className='text-slate-900'>
          <option value="">TH</option>
          <option value="">EN</option>
          <option value="">JP</option>
          <option value="">RS</option>
          <option value="">CN</option>
        </select>
        <div className="member">
          <p>Login</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar