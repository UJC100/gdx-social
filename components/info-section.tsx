'use client'

import { cn } from "@/lib/utils";
import { useColorPreferences } from "@/providers/color-prefrences";


const InfoSection = () => {
    const {color} = useColorPreferences()

    let backgroundColor = 'bg-primary-light';
    if(color === "green") {
        backgroundColor = 'bg-green-900'
    } else if (color === "blue") {
        backgroundColor = "bg-blue-900" 
    }
  return (<div className={cn('fixed left-20 rounded-l-xl md:w-52 lg:w-87.5 h-[calc(100%-63px)] flex z-20 flex-col justify-between items-center',backgroundColor)}>

  </div>);
};

export default InfoSection;