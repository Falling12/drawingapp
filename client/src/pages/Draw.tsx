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
        <div className='h-full'>
            <div className='inset-0 overflow-hidden relative w-full h-full flex select-none'>
                <div className='ui-wrapper absolute inset-0 w-full h-full z-[3]'>
                    <div className='bg-slate-500 w-[40px] h-[40px] cursor-pointer'>
                    </div>
                </div>
                <main>
                    <DrawingCanvas key={'canvas'} />
                </main>
            </div>
        </div>
    )
}

export default Draw