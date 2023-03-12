import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IDrawing } from '../../types'
import Drawing from '../components/Drawing'
import { setDrawing, setDrawings } from '../features/drawings/drawingSlice'
import { createDrawing, getDrawings } from '../utils/drawings'

const Dashboard = () => {
  const dispatch = useDispatch()
  const drawings = useSelector((state: any) => state.drawings.drawings)
  const [loading, setLoading] = React.useState(true)

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
    <div>
      <div className='flex gap-5 p-10 flex-wrap'>
      <div className='w-[300px] h-[200px] border-2 rounded-xl hover:scale-105 transition-all cursor-pointer' onClick={() => newDrawing()}>
            <div className='w-full h-full overflow-hidden relative'>
                <img src="/dummy.webp" className='w-full h-full object-cover aspect-[16/9] blur-[5px]' />
                <div className='absolute inset-0 w-full h-full bg-black bg-opacity-30 flex flex-col justify-center items-center gap-3'>
                    <h1 className='text-[100px] select-none'>+</h1>
                </div>
            </div>
        </div>
        {drawings.map((drawing: IDrawing, index: number) => (
          <Drawing drawing={drawing} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard