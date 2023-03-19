import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IDrawing } from '../../types'
import Drawing from '../components/Drawing'
import { setDrawing, setDrawings } from '../features/drawings/drawingSlice'
import { createDrawing, getDrawings } from '../utils/drawings'
import { useSignOut } from 'react-auth-kit'
import { CSSTransition } from 'react-transition-group'


const Dashboard = () => {
  const dispatch = useDispatch()
  const drawings = useSelector((state: any) => state.drawings.drawings)
  const user = useSelector((state: any) => state.user)
  const [loading, setLoading] = React.useState(true)
  const [userOpened, setUserOpened] = React.useState(false)
  const nodeRef = React.useRef(null)
  const signOut = useSignOut()

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      setLoading(true)
      const drawings = await getDrawings()
      dispatch(
        setDrawings(drawings)
      )
      setLoading(false)
    })()
  }, [])

  const newDrawing = async () => {
    const res: any = await createDrawing("asd")

    setDrawing(res)
    navigate(`/draw/${res.id}`)
  }

  return loading ? <div>Loading...</div> : (
    <main className='flex flex-col'>
      <header className='bg-[#232423] w-full h-[80px] flex items-center p-5 justify-between'>
        <h1 className='text-[20px]'>Paint</h1>
        <h1>👋Üdv, {user.name}!</h1>
        <div className='flex flex-col gap-3 relative'>
          <img src={user.pfp || '/dummy_pfp.png'} className='w-[40px] h-[40px] rounded-full cursor-pointer' onClick={() => setUserOpened(!userOpened)} />
            <CSSTransition in={userOpened} timeout={300} nodeRef={nodeRef} classNames='user-dropdown' unmountOnExit>
              <div className='bg-[#232423] w-[200px] h-auto rounded-xl p-5 flex flex-col gap-3 absolute top-[120%] right-[1%] border-2 z-10' ref={nodeRef}>
                <div className='flex items-center gap-3 bg-blue-400 p-2 rounded-md cursor-pointer'>
                  <svg className='cursor-pointer' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clip-rule="evenodd" d="M12.3389 2.375C12.6358 2.07817 13.0385 1.91142 13.4583 1.91142C13.8782 1.91142 14.2808 2.07817 14.5777 2.375L16.625 4.42225C16.9218 4.71917 17.0886 5.12182 17.0886 5.54167C17.0886 5.96151 16.9218 6.36417 16.625 6.66108L15.3694 7.91667L11.0833 3.63058L12.3389 2.375ZM9.96392 4.75L2.83892 11.875C2.54196 12.1719 2.37509 12.5745 2.375 12.9944V15.0417C2.375 15.4616 2.54181 15.8643 2.83875 16.1613C3.13568 16.4582 3.53841 16.625 3.95833 16.625H6.00558C6.42548 16.6249 6.82814 16.458 7.125 16.1611L14.25 9.03608L9.96392 4.75Z" fill="white" />
                  </svg>
                  <p>Szerkesztés</p>
                </div>
                <div className='flex items-center gap-3 bg-red-400 p-2 rounded-md cursor-pointer' onClick={() => signOut()}>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.95841 17.4167C3.74845 17.4167 3.54709 17.3333 3.39862 17.1848C3.25016 17.0363 3.16675 16.835 3.16675 16.625V2.375C3.16675 2.16504 3.25016 1.96367 3.39862 1.81521C3.54709 1.66674 3.74845 1.58333 3.95841 1.58333H15.0417C15.2517 1.58333 15.4531 1.66674 15.6015 1.81521C15.75 1.96367 15.8334 2.16504 15.8334 2.375V16.625C15.8334 16.835 15.75 17.0363 15.6015 17.1848C15.4531 17.3333 15.2517 17.4167 15.0417 17.4167H3.95841ZM11.8751 12.6667L15.8334 9.5L11.8751 6.33333V8.70833H7.12508V10.2917H11.8751V12.6667Z" fill="white"/>
                  </svg>
                  <p>Kijelentkezés</p>
                </div>
              </div>
            </CSSTransition>
        </div>
      </header>
      <div className='flex gap-5 p-10 flex-wrap overflow-y-auto'>
        <div className='w-[300px] h-[200px] border-2 rounded-xl hover:scale-105 transition-all cursor-pointer' onClick={() => newDrawing()}>
          <div className='w-full h-full overflow-hidden relative'>
            <img src="/dummy.webp" className='w-full h-full object-cover aspect-[16/9] blur-[5px]' />
            <div className='absolute inset-0 w-full h-full bg-black bg-opacity-30 flex flex-col justify-center items-center gap-3'>
              <h1 className='text-[80px] select-none'>+</h1>
            </div>
          </div>
        </div>
        {drawings.map((drawing: IDrawing, index: number) => (
          <Drawing drawing={drawing} key={index} />
        ))}
      </div>
    </main>
  )
}

export default Dashboard