import React from 'react'
import { IDrawing } from '../../types'
import { useNavigate } from 'react-router-dom'
import { deleteDrawing, getDrawings } from '../utils/drawings'
import { useDispatch } from 'react-redux'
import { setDrawings } from '../features/drawings/drawingSlice'

const Drawing = ({
    drawing
}: {
    drawing: IDrawing
}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log(drawing)

    const deleteDraw = async (id: number | null) => {
        await deleteDrawing(id)
        const drawings = await getDrawings()
        console.log(drawings)
        dispatch(
            setDrawings(drawings)
        )
    }

    return (
        <div className='w-[300px] h-[200px] border-2 rounded-xl hover:scale-105 transition-all'>
            <div className='w-full h-full overflow-hidden relative bg-white'>
                <img src={drawing.image} className='w-full h-full object-cover aspect-[16/9] blur-[5px]' alt='asd'/>
                <div className='absolute inset-0 w-full h-full bg-black bg-opacity-30 flex flex-col justify-center items-center gap-3'>
                    <h1 className='uppercase max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis'>{drawing.name}</h1>
                    <div className='flex gap-2'>
                        <svg className='cursor-pointer' onClick={() => navigate(`/draw/${drawing.id}`)} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clip-rule="evenodd" d="M12.3389 2.375C12.6358 2.07817 13.0385 1.91142 13.4583 1.91142C13.8782 1.91142 14.2808 2.07817 14.5777 2.375L16.625 4.42225C16.9218 4.71917 17.0886 5.12182 17.0886 5.54167C17.0886 5.96151 16.9218 6.36417 16.625 6.66108L15.3694 7.91667L11.0833 3.63058L12.3389 2.375ZM9.96392 4.75L2.83892 11.875C2.54196 12.1719 2.37509 12.5745 2.375 12.9944V15.0417C2.375 15.4616 2.54181 15.8643 2.83875 16.1613C3.13568 16.4582 3.53841 16.625 3.95833 16.625H6.00558C6.42548 16.6249 6.82814 16.458 7.125 16.1611L14.25 9.03608L9.96392 4.75Z" fill="white" />
                        </svg>
                        <svg className='cursor-pointer' onClick={() => deleteDraw(drawing.id)} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.12496 2.375V3.16667H3.16663V4.75H3.95829V15.0417C3.95829 15.4616 4.12511 15.8643 4.42204 16.1613C4.71897 16.4582 5.1217 16.625 5.54163 16.625H13.4583C13.8782 16.625 14.2809 16.4582 14.5779 16.1613C14.8748 15.8643 15.0416 15.4616 15.0416 15.0417V4.75H15.8333V3.16667H11.875V2.375H7.12496ZM7.12496 6.33333H8.70829V13.4583H7.12496V6.33333ZM10.2916 6.33333H11.875V13.4583H10.2916V6.33333Z" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Drawing