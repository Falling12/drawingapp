import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ITool } from '../../types'
import { setOffset, setScale, setTool } from '../features/drawings/drawingSlice'
import Tool from './Tool'

const DrawUI = () => {
    const scale = useSelector((state: any) => state.drawings.drawing.lastState.scale)
    const tool = useSelector<string>((state: any) => state.drawings.drawing.lastState.tool)
    const offset = useSelector((state: any) => state.drawings.drawing.lastState.offset)
    const drawing = useSelector((state: any) => state.drawings.drawing)
    const dispatch = useDispatch()
    const [tools, setTools] = React.useState<ITool[]>([
        {
            name: 'pen',
            icon: '/icons/pen.svg',
            active: true,
        },
        {
            name: 'eraser',
            icon: '/icons/eraser.svg',
            active: false,
        },
        {
            name: 'fill',
            icon: '/icons/fill.svg',
            active: false,
        },
        {
            name: 'hand',
            icon: '/icons/hand.svg',
            active: false,
        }
    ])

    function toScreenX(xTrue: number) {
        return (xTrue + offset[0]) * scale;
    }
    function toScreenY(yTrue: number) {
        return (yTrue + offset[1]) * scale;
    }

    useEffect(() => {
        if(tool !== "") {
            const index = tools.findIndex(t => t.name === tool)
            tools.forEach(t => {
                if (t.name === tool){
                    setTools([...tools.slice(0, index), {...t, active: true}, ...tools.slice(index + 1, tools.length)])
                } else {
                    t.active = false
                }
            })
        }else if(tool === "") {
            setTools([...tools.slice(0, 0), {...tools[0], active: true}, ...tools.slice(0 + 1, tools.length)])
            dispatch(
                setTool(tools[0].name)
            )
        }
    }, [tool])

    const setActive = (name: string) => {
        const index = tools.findIndex(tool => tool.name === name)
        tools.forEach(tool => {
            if (tool.name === name){
                setTools([...tools.slice(0, index), {...tool, active: true}, ...tools.slice(index + 1, tools.length)])
                dispatch(
                    setTool(tool.name)
                )
            } else {
                tool.active = false
            }
        })
    }

    useEffect(() => {
        const back: HTMLElement | null = document.querySelector('.back')
        if(drawing.strokes.length === 0) return
        const stroke = drawing.strokes[0]
        const lastStroke = drawing.strokes[drawing.strokes.length - 1]
        if(stroke.points.length === 0) return
        const strokeX = stroke.points[0].x
        const strokeY = stroke.points[0].y

        //FIXME: remove lastStroke.points[0].x and lastStroke.points[0].y
        if(toScreenX(strokeX) + lastStroke.points[0].x < 0 || toScreenX(strokeX) + lastStroke.points[0].x  > window.innerWidth || toScreenY(strokeY) + lastStroke.points[0].y < 0 || toScreenY(strokeY) + lastStroke.points[0].y  > window.innerHeight) {
            back?.classList.remove('hidden')
        } else {
            back?.classList.add('hidden')
        }
    }, [offset])

    const backToContent = () => {
        if(drawing.strokes.length === 0) return
        const stroke = drawing.strokes[0]
        if(stroke.points.length === 0) return
        const lastStroke = drawing.strokes[drawing.strokes.length - 1]
        //get the center stroke point of the drawing
        const strokeX = stroke.points[0].x
        const strokeY = stroke.points[0].y
        if(toScreenX(strokeX) + lastStroke.points[0].x < 0 || toScreenX(strokeX) + lastStroke.points[0].x > window.innerWidth || toScreenY(strokeY) + lastStroke.points[0].y < 0 || toScreenY(strokeY) + lastStroke.points[0].y > window.innerHeight) {
            dispatch(
                setOffset([-strokeX + window.innerWidth / 2, -strokeY + window.innerHeight / 2])
            )
        }
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
                <div className='flex justify-between items-center'>
                    <div className='bg-ui-primary w-32 h-[36px] pointer-events-auto rounded-md flex gap-2 justify-center items-center overflow-hidden'>
                        <div className='w-full h-full flex justify-center items-center cursor-pointer border-r-2 border-ui-secondary active:border-[1px] active:border-pink-400 rounded-tl-md rounded-bl-md transition-all hover:bg-ui-secondary' onClick={() => dispatch(setScale(scale - 0.1))}>
                            <p className='font-medium opacity-80 text-[18px]'>-</p>
                        </div>
                        <p className='text-[14px]'>{(scale * 100).toFixed(0)}%</p>
                        <div className='w-full h-full flex justify-center items-center cursor-pointer border-l-[1px] border-ui-secondary active:border-[1px] active:border-pink-400 rounded-tr-md rounded-br-md transition-all hover:bg-ui-secondary' onClick={() => dispatch(setScale(scale + 0.1))}>
                            <p className='font-medium opacity-80 text-[18px]'>+</p>
                        </div>
                    </div>
                    {
                        
                    }
                    <div className='bg-ui-primary w-32 h-[36px] pointer-events-auto rounded-md flex justify-center items-center p-2 back cursor-pointer' onClick={(e) => backToContent()}>
                        <p className='text-[14px]'>Back to content</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DrawUI