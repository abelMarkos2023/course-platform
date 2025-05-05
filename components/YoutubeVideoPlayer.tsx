"use client"

import React from 'react'
import Youtube from 'react-youtube'
const YoutubeVideoPlayer = ({videoId,onVideoFinish}:{videoId:string,onVideoFinish?:()=>void}) => {
  return (
   <Youtube 
   videoId={videoId}
   className='w-full h-full'
   opts={{
       height:"100%",
       width:"100%",
   }}
   onEnd={onVideoFinish}
   />
  )
}

export default YoutubeVideoPlayer