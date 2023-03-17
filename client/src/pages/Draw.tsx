import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DrawingCanvas from '../components/DrawingCanvas'
import { setDrawing } from '../features/drawings/drawingSlice'
import { getDrawing } from '../utils/drawings'
import '../styles/Draw.css'

const Draw = () => {
    const { id } = useParams<{ id: any }>()
    const dispatch = useDispatch()
    const drawing = useSelector((state: any) => state.drawings.drawing)
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const drawing = await getDrawing(id)
            dispatch(
                setDrawing(
                    drawing
                )
            )
            setLoading(false)
        })()
    }, [])

    return loading ? <div>Loading...</div> : (
        <div className='min-h-full h-full relative main'>
            <div className='w-full h-full'>
                <div className='w-full h-full'>
                    <a>asd</a>
                </div>
                <DrawingCanvas key={'canvas'} />
            </div>
        </div>
    )
}

export default Draw