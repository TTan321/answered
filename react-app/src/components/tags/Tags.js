
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadTags } from '../../store/tags'
import './Tags.css'

function Tags() {
    const dispatch = useDispatch();
    const tags = useSelector(state => state.tagsState)
    const tagsArr = Object.values(tags)

    useEffect(() => {
        dispatch(loadTags())
    }, [dispatch])

    return tagsArr.length > 0 && (
        <div id='tagsContainer'>
            {tagsArr.map(tag => (
                <div className='tags' key={tag.id}>
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