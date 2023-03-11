import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IDrawing } from '../../types'
import Drawing from '../components/Drawing'
import { setDrawings } from '../features/drawings/drawingSlice'
import { getDrawings } from '../utils/drawings'

const Dashboard = () => {
  const dispatch = useDispatch()
  const drawings = useSelector((state: any) => state.drawings.drawings)
  const [loading, setLoading] = React.useState(true)

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

  return loading ? <div>Loading...</div> : (
    <div>
      <div className='flex gap-5 p-10 flex-wrap'>
        {drawings.map((drawing: IDrawing, index: number) => (
          <Drawing drawing={drawing} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard