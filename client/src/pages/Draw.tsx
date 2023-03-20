import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DrawingCanvas from '../components/DrawingCanvas'
import { setDrawing } from '../features/drawings/drawingSlice'
import { getDrawing } from '../utils/drawings'
import '../styles/Draw.css'
import DrawUI from '../components/DrawUI'

const Draw = () => {
    const { id } = useParams<{ id: any }>()
    const dispatch = useDispatch()
    const drawing = useSelector((state: any) => state.drawings.drawing)
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        const handleWheel = (event: any) => {
          if (event.ctrlKey) {
            event.preventDefault();
          }
        };
    
        window.addEventListener("wheel", handleWheel, { passive: false });
    
        return () => {
          window.removeEventListener("wheel", handleWheel);
        };
      }, []);

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
                <DrawUI key={'ui'}/>
                <main>
                    <DrawingCanvas key={'canvas'} />
                </main>
            </div>
        </div>
    )
}

export default Draw