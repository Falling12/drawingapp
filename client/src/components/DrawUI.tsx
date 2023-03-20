import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setScale } from '../features/drawings/drawingSlice'

const DrawUI = () => {
    const scale = useSelector((state: any) => state.drawings.drawing.lastState.scale)
    const dispatch = useDispatch()

    return (
        <div className='ui-wrapper absolute inset-0 w-full h-full z-[3] pointer-events-none'>
            <div className='ui-container absolute inset-0 w-full h-full z-[2] pointer-events-none p-5 flex flex-col justify-between'>
                <div className='bg-ui-primary w-8 h-8 pointer-events-auto cursor-pointer rounded-md border-[1.5px] p-2 border-ui-secondary flex flex-col gap-[3px] justify-center'>
                    {[1, 2, 3].map((i) => (
                        <div className='w-full h-[2px] bg-ui-secondary rounded-md' key={i}></div>
                    ))}
                </div>
                <div className='bg-ui-primary w-32 h-[36px] pointer-events-auto rounded-md border-[1.5px] border-ui-secondary flex gap-2 justify-center items-center overflow-hidden'>
                    <div className='w-full h-full flex justify-center items-center cursor-pointer border-r-2 border-ui-secondary active:border-[1px] active:border-pink-400 rounded-tl-md rounded-bl-md transition-all hover:bg-ui-secondary' onClick={() => dispatch(setScale(scale - 0.1))}>
                        <p className='font-medium opacity-80 text-[18px]'>-</p>
                    </div>
                    <p className='text-[14px]'>{(scale * 100).toFixed(0)}%</p>
                    <div className='w-full h-full flex justify-center items-center cursor-pointer border-l-[1px] border-ui-secondary active:border-[1px] active:border-pink-400 rounded-tr-md rounded-br-md transition-all hover:bg-ui-secondary' onClick={() => dispatch(setScale(scale + 0.1))}>
                        <p className='font-medium opacity-80 text-[18px]'>+</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DrawUI