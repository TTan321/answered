

import NavBar from '../navbar/NavBar'
import Tags from './Tags'
import './TagFeed.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function TagFeed() {

    const user = useSelector(state => state.session.user)
    const tags = useSelector(state => state.tagsState)
    const { tagId } = useParams()
    const currentTag = Object.values(tags).find(tag => tag.id === +tagId)

    console.log(currentTag)

    return !!currentTag && (
        <div id='tagFeedPage'>
            <NavBar user={user} />
            <div id='tagFeedContainer'>
                <Tags />
                <div id='tagTitle'>
                    <img src={currentTag.image_url} alt='Tag Icon' id='tagPic' />
                    <span id='tagName' >{currentTag.name}</span>
                </div>
            </div>
        </div>
    )
}

export default TagFeed
