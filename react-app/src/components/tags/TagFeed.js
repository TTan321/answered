import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { authenticate } from '../../store/session'
import { loadTags } from '../../store/tags'
import NavBar from '../navbar/NavBar'
import Tags from './Tags'
import EditTagModal from './TagForms/EditTagModal'
import DeleteTagModal from './DeleteTags/DeleteTagModal'
import './TagFeed.css'

function TagFeed() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const tags = useSelector(state => state.tagsState)
    const { tagId } = useParams()
    const currentTag = Object.values(tags).find(tag => tag.id === +tagId)

    console.log(currentTag)

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadTags())
    }, [dispatch])

    return !!currentTag && (
        <div id='tagFeedPage'>
            <NavBar user={user} />
            <div id='tagFeedContainer'>
                <Tags />
                <div id='tagTitle'>
                    <div className='tagLeft'>
                        <img src={currentTag.image_url} alt='Tag Icon' id='tagPic' />
                        <span id='tagName' >{currentTag.name}</span>
                    </div>
                    <div className='tagRight'>
                        <DeleteTagModal tag={currentTag} />
                        <EditTagModal tag={currentTag} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TagFeed
