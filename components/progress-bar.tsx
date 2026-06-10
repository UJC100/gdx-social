'use client'

import { useEffect, useState } from 'react'
import { Progress } from './ui/progress';

const ProgressBar = () => {
    const [ progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
           setProgress(prev => (prev >= 100 ? 0 : prev + 1));
        }, 100);
        console.log(progress)

        return () => clearInterval(interval)
    }, [])
  return (
   <Progress className='text-green-400' value={progress} max={100}/>
  )
}

export default ProgressBar