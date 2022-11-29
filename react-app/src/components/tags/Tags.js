
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadTags } from '../../store/tags'
import CreateTagModal from './TagForms/CreateTagModal'
import './Tags.css'

function Tags() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tags = useSelector(state => state.tagsState)
    const tagsArr = Object.values(tags)

    useEffect(() => {
        dispatch(loadTags())
    }, [dispatch])

    return tagsArr.length > 0 && (
        <div id='tagsContainer'>
            <CreateTagModal />
            {tagsArr.map(tag => (
                <div className='tags' key={tag.id} onClick={() => history.push(`/tag/${tag.id}`)}>
                    <span className='tagContents'>
                        <img src={tag.image_url} alt={`${tag.name} logos`} style={{ width: '25px', height: '25px' }} />&nbsp;
                        <span className='tagName'>
                            {tag.name}
                        </span>
                    </span>
                </div>
            ))}
        </div>
    )
}

export default Tags
