import React from 'react'

export const Sidebar=({onMenuClick})=> {
  return (
    <div className='w-64 bg-gray-100 h-screen p-4'>
        <ul>
            <li onClick={()=> onMenuClick('productList')} className='cursor-pointer p-2 hover:bg-gray-300'>
                Product List
            </li>
        </ul>
    </div>
  )
}

