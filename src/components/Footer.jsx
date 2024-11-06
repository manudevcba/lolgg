import React from 'react'

function Footer () {
  return (
    <footer className='bg-gray-100 rounded-lg shadow m-4'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <a href='https://github.com/manudevcba' className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'>
            <img src='https://i.imgur.com/TUhrHC3.png' className='h-8' alt='logo' />
            <span className='self-center text-2xl font-semibold whitespace-nowrap text-gray-800'>LOL gg</span>
          </a>
          <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-600 sm:mb-0'>
            <li>
              <a href='https://github.com/manudevcba' className='hover:underline'>Contact</a>
            </li>
          </ul>
        </div>
        <hr className='my-6 border-gray-300 sm:mx-auto lg:my-8' />
        <span className='block text-sm text-gray-600 sm:text-center'>
          © 2024 <a href='https://github.com/manudevcba' className='hover:underline'>LOLgg™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
