import { useState } from "react"
import { useDispatch } from "react-redux"
import { modifyTag, loadTags } from "../../../store/tags"
import './CreateTagForm.css'


function EditTagForm({ setShowModal, tag }) {
    const dispatch = useDispatch()

    const [name, setName] = useState(tag.name)
    const [imageUrl, setImageUrl] = useState(tag.image_url)

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name,
            'image_url': imageUrl,
            tagId: tag.id
        }

        await dispatch(modifyTag(payload))
        await dispatch(loadTags())
        setShowModal(false)
    }

    return (
        <div id='createTagFormContainer'>
            <div id='createTagXDiv' onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
            </div>
            <form id='createTagForm' onSubmit={onSubmit}>
                <h3 id='tagFormHeader'>Edit Space</h3>
                <label className="tagLabels">Name</label>
                <input
                    className="tagFormInputs"
                    type="text"
                    value={name}
                    placeholder="Write name here"
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="tagLabels">Image Url</label>
                <input
                    className="tagFormInputs"
                    type="text"
                    value={imageUrl}
                    placeholder="Enter image url here"
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <div id='createButtonDiv'>
                    <button type="submit" id='tagFormSubmit'>Edit</button>
                </div>
            </form>
        </div>
    )
}

export default EditTagForm
