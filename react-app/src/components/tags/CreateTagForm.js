import { useState } from "react"
import { useDispatch } from "react-redux"
import { createTag, loadTags } from "../../store/tags"
import './CreateTagForm.css'


function CreateTagForm({ setShowModal }) {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name,
            'image_url': imageUrl
        }

        await dispatch(createTag(payload))
        await dispatch(loadTags())
        setShowModal(false)
    }

    return (
        <div id='createTagFormContainer'>
            <div id='createTagXDiv' onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
            </div>
            <form id='createTagForm' onSubmit={onSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    placeholder="Write name here"
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Image Url</label>
                <input
                    type="text"
                    value={imageUrl}
                    placeholder="Enter image url here"
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateTagForm
