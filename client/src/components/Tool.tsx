import React from 'react'
import { ITool } from '../../types'

interface ToolProps extends ITool {
    name: string,
    icon: string,
    active: boolean,
    setActive: (name: string) => void
}

const Tool = ({
    name,
    icon,
    active,
    setActive
}: ToolProps) => {
  return (
    <div className={`w-full box-border bg-white h-auto pointer-events-auto cursor-pointer rounded-md p-2 flex items-center justify-center transition-all ${active ? '!bg-ui-secondary' : ''}`} onClick={() => setActive(name)}>
        <img src={icon} alt="a" className='min-w-[18px]'/>
    </div>
  )
}

export default Tool