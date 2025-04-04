import React from 'react'
import { ScrollArea } from '@zeak/react'
import TemplateList from './TemplateList'
import DynamicInserts from './DynamicInserts'
import {Save} from 'lucide-react'

export default function EmailSection() {
  return (
    <div>
        <div className=" p-6">
          <TemplateList/>
          
         
      {/* Email Preview */}
      <div className="mt-8 bg-white p-2 rounded-zeak">
        <ScrollArea className="h-[500px] bg-[#f4f6fa] rounded-zeak">

        <img className='w-[800px] mx-auto' src="https://s3-alpha-sig.figma.com/img/371e/8747/970de1133e05e18f5360a04ba65c09ce?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z88h-h3DpG-c64e2FaombTCaa-BTOefOOe1bepFuCnD6rbJpyV4kEu~4aHiIPPaLhCUyQNMwIKktBcUyckBnOf7cgDZJnjnx~oX7pj~bxnIlwbrCI6oTBsaiuHfvyvfC81fEiYHJO4gOOezIIR8yfzglUm~mQRjhvXXoQgPIBunwijoDwcp~SSos-3B9lZ9PUMWB~BIigEej55AfegTX~CWdfeIlF5k8UmNZ2FM8GLrO0308D~-twCCUXpfsGYWqO99a1y~6fTQNFs0GKl7FkEW~z4kA8SAMcrb9dtCfRU4BOF90sj5b7hCvNQcUJyASB8y4~DCQpncBakPsRXDtlQ__" alt="Email Preview" />
        </ScrollArea>
        <div className="flex items-center justify-between mt-[6px]">
          <DynamicInserts/>
          <Save className="w-6 h-6" />

        </div>
      </div>

        
      
        </div>
    </div>
  )
}
