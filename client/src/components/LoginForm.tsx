import React, { useState } from 'react'
import { useSignIn } from 'react-auth-kit'
import { redirect, useNavigate } from "react-router-dom";
import { login } from '../utils/user'

export default function LoginForm() {
    let navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signIn = useSignIn()

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        console.log("submit")
        try {
            const res = await login({
                email,
                password
            })
            console.log(res)
            
            if(signIn({
                token: res.token,
                expiresIn: 3600,
                tokenType: 'Bearer',
                authState: {
                    user: null
                }
            })){
                navigate('/dashboard')
            }
            else{
                console.log("error")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    return (
        <form className='bg-[#00000054] w-full max-w-[530px] h-full max-h-[290px] rounded-[25px] flex flex-col p-8 gap-4 flex-1'>
            <div className='flex items-center bg-transparent border-2 rounded-[10px] p-2 border-[#272738] w-full h-[45px]'>
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4.2807C11.9725 4.2807 12.9051 4.68734 13.5927 5.41117C14.2803 6.13499 14.6667 7.11671 14.6667 8.14035C14.6667 9.16399 14.2803 10.1457 13.5927 10.8695C12.9051 11.5934 11.9725 12 11 12C10.0275 12 9.0949 11.5934 8.40726 10.8695C7.71963 10.1457 7.33332 9.16399 7.33332 8.14035C7.33332 7.11671 7.71963 6.13499 8.40726 5.41117C9.0949 4.68734 10.0275 4.2807 11 4.2807ZM11 6.21053C10.5138 6.21053 10.0474 6.41385 9.70363 6.77576C9.35981 7.13767 9.16666 7.62853 9.16666 8.14035C9.16666 8.65217 9.35981 9.14303 9.70363 9.50494C10.0474 9.86686 10.5138 10.0702 11 10.0702C11.4862 10.0702 11.9525 9.86686 12.2964 9.50494C12.6402 9.14303 12.8333 8.65217 12.8333 8.14035C12.8333 7.62853 12.6402 7.13767 12.2964 6.77576C11.9525 6.41385 11.4862 6.21053 11 6.21053ZM11 12.9649C13.4475 12.9649 18.3333 14.2482 18.3333 16.8246V19.7193H3.66666V16.8246C3.66666 14.2482 8.55249 12.9649 11 12.9649ZM11 14.7982C8.27749 14.7982 5.40832 16.207 5.40832 16.8246V17.886H16.5917V16.8246C16.5917 16.207 13.7225 14.7982 11 14.7982Z" fill="#F8F8F8" />
                </svg>
                <input className='w-full outline-none text-white bg-transparent  rounded-[10px] p-2' name='email' type='email' placeholder='Email-cím vagy felhasználónév' onChange={(e) => handleChange(e)} />
            </div>
            <div className='flex items-center bg-transparent border-2 rounded-[10px] p-2 border-[#272738] w-full h-[45px]'>
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.49999 8.14035H13.75V6.21052C13.75 5.40643 13.4826 4.72295 12.9479 4.16009C12.4132 3.59722 11.7639 3.31579 11 3.31579C10.2361 3.31579 9.5868 3.59722 9.05207 4.16009C8.51735 4.72295 8.24999 5.40643 8.24999 6.21052H6.41666C6.41666 4.87573 6.86368 3.73778 7.75774 2.79667C8.65118 1.8562 9.73193 1.38596 11 1.38596C12.268 1.38596 13.3491 1.8562 14.2432 2.79667C15.1366 3.73778 15.5833 4.87573 15.5833 6.21052V8.14035H16.5C17.0042 8.14035 17.4359 8.32915 17.7952 8.70675C18.154 9.085 18.3333 9.53947 18.3333 10.0702V19.7193C18.3333 20.25 18.154 20.7045 17.7952 21.0827C17.4359 21.4603 17.0042 21.6491 16.5 21.6491H5.49999C4.99582 21.6491 4.56438 21.4603 4.20566 21.0827C3.84632 20.7045 3.66666 20.25 3.66666 19.7193V10.0702C3.66666 9.53947 3.84632 9.085 4.20566 8.70675C4.56438 8.32915 4.99582 8.14035 5.49999 8.14035ZM5.49999 19.7193H16.5V10.0702H5.49999V19.7193ZM11 16.8246C11.5042 16.8246 11.9359 16.6358 12.2952 16.2582C12.654 15.8799 12.8333 15.4254 12.8333 14.8947C12.8333 14.364 12.654 13.9096 12.2952 13.5313C11.9359 13.1537 11.5042 12.9649 11 12.9649C10.4958 12.9649 10.0644 13.1537 9.70566 13.5313C9.34632 13.9096 9.16666 14.364 9.16666 14.8947C9.16666 15.4254 9.34632 15.8799 9.70566 16.2582C10.0644 16.6358 10.4958 16.8246 11 16.8246Z" fill="#F8F8F8" />
                </svg>

                <input className='w-full outline-none text-white bg-transparent  rounded-[10px] p-2' name='password' type='password' placeholder='Jelszó' onChange={(e) => handleChange(e)} />
            </div>
            <button type='button' onClick={(e: React.MouseEvent) => handleSubmit(e)} className='w-full h-[45px] bg-[#1C304F] rounded-[10px] flex items-center justify-center justify-self-end self-end hover:bg-[#1F3961] transition-all'>
                <span className='text-white text-[15px] font-bold'>Bejelentkezés</span>
            </button>
        </form>
    )
}
