import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ITool } from '../../types'
import { setScale } from '../features/drawings/drawingSlice'
import Tool from './Tool'

const DrawUI = () => {
    const scale = useSelector((state: any) => state.drawings.drawing.lastState.scale)
    const dispatch = useDispatch()
    const [tools, setTools] = React.useState<ITool[]>([
        {
            name: 'Pen',
            icon: '/icons/pen.svg',
            active: true,
        },
        {
            name: 'Eraser',
            icon: '/icons/eraser.svg',
            active: false,
        },
        {
            name: 'Fill',
            icon: '/icons/fill.svg',
            active: false,
        },
        {
            name: 'Hand',
            icon: '/icons/hand.svg',
            active: false,
        }
    ])

    const setActive = (name: string) => {
        const index = tools.findIndex(tool => tool.name === name)
        tools.forEach(tool => {
            if (tool.name === name){
                setTools([...tools.slice(0, index), {...tool, active: true}, ...tools.slice(index + 1, tools.length)])
            } else {
                tool.active = false
            }
        })
    }

    return (
        <div className='ui-wrapper absolute inset-0 w-full h-full z-[3] pointer-events-none'>
            <div className='ui-container absolute inset-0 w-full h-full z-[2] pointer-events-none p-5 flex flex-col gap-[50px]'>
                <div className='bg-ui-primary w-10 h-12 pointer-events-auto cursor-pointer rounded-md p-2 flex flex-col gap-[5px] justify-center'>
                    {[1, 2, 3].map((i) => (
                        <div className='w-full h-[3px] bg-white rounded-md' key={i}></div>
                    ))}
                </div>
                <div className='flex flex-col justify-between h-full w-12 px-2 py-5 bg-ui-primary rounded-md pointer-events-auto'>
                    {tools.map((tool) => (
                        <Tool name={tool.name} icon={tool.icon} active={tool.active} key={tool.name} setActive={setActive} />
                    ))}
                </div>
                <div className='bg-ui-primary w-32 h-[36px] pointer-events-auto rounded-md flex gap-2 justify-center items-center overflow-hidden'>
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