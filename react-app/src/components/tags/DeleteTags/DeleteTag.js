import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authenticate } from '../../../store/session'
import { loadTags, removeTag } from '../../../store/tags'
import './DeleteTag.css'

function DeleteTag({ setShowModal, tag }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = async (e) => {
        e.preventDefault()

        await dispatch(removeTag(tag.id))
        await dispatch(loadTags())
        await dispatch(authenticate())
        await setShowModal(false)
        return history.push('/')
    }

    return (
        <div className='deleteTag'>
            <div id='createTagXDiv' onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
            </div>
            <div className='deleteMidDiv'>
                <p className='deleteTagText'>
                    Are you sure you want to delete this space?
                </p>
            </div>
            <div className='deleteBottomDiv'>
                <button className='deleteSpace' onClick={(e) => onSubmit(e)}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteTag
