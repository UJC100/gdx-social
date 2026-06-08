import { UseCreateWorkspaceValues } from '@/hooks/create-workspace-values'
import { UploadDropzone } from '@/lib/uploadthing'
import Image from 'next/image'
import {ImCancelCircle} from 'react-icons/im'


const ImageUpload = () => {
    const {imageurl, updateImageurl} = UseCreateWorkspaceValues()
    if(imageurl){
        return <div className='flex items-center justify-center h-32 w-32 relative'>
            <Image 
            src={imageurl}
            className='object-cover w-full h-full rounded-md'
            alt='workspace'
            width={320}
            height={320}
            />
            <ImCancelCircle className='absolute cursor-pointer -right-2 -top-2 z-10 hover:scale-110'/>
        </div>
    }

  return (
   <UploadDropzone
  endpoint="workspaceImage"
  onClientUploadComplete={(res) => {
    console.log('UPLOAD COMPLETE', res)
    updateImageurl(res?.[0].ufsUrl)
  }}
  onUploadError={(err) => {
    console.error('UPLOAD ERROR', err)
  }}
/>
  )
}

export default ImageUpload