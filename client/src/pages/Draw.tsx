import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DrawingCanvas from '../components/DrawingCanvas'
import { setDrawing } from '../features/drawings/drawingSlice'
import { getDrawing } from '../utils/drawings'

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
        <div>
            <DrawingCanvas key={1} />
        </div>
    )
}

export default Draw