import { useState } from 'react'
import { TextareaComponent } from '@zeak/react'

function TextareaDemo() {
    const [description, setDescription] = useState('')

    return (
        <TextareaComponent
            label="Description"
            required
            maxLength={500}
            placeholder="Enter your description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
    )
}

export default TextareaDemo