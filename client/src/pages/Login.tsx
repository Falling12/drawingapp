import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const Login = () => {
  let navigate = useNavigate()

  return (
    <div className={`h-[100vh] flex flex-col gap-[40px] justify-center items-center sm:px-3`} style={mainstyle}>
        <h1 className='font-semibold text-[40px]'>Bejelentkezés</h1>
        <div className='flex flex-col gap-3 w-full max-w-[530px] h-full max-h-[300px]'>
            <LoginForm />
            <div className='flex items-center justify-center gap-5 sm:flex-col sm:gap-2'>
                <div className='flex items-center gap-1'>
                    <p className='opacity-80'>Nincs fiókod?</p>
                    <a href={'#'} className='font-bold cursor-pointer hover:underline underline-offset-4'>Regisztráció</a>    
                </div>
                <a href={'#'} className='opacity-80 cursor-pointer hover:opacity-100 transition-all'>Elfelejtett jelszó?</a>
            </div>
        </div>
    </div>
  )
}

const mainstyle = {
  backgroundImage: 'radial-gradient(137.64% 100% at 50% 100%, #1C304F 0%, #262626 100%)',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
}

export default Login
