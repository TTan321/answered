import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
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
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const tags = useSelector(state => state.tagsState)
    const { tagId } = useParams()
    const currentTag = Object.values(tags).find(tag => tag.id === +tagId)

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadTags())
    }, [dispatch])

    return !!currentTag && (
        <div id='tagFeedPage'>
            <NavBar user={user} />
            <div id='tagFeedContainer'>
                <Tags />
                <div id='innerTagFeedContainer'>
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
                    <div>
                        {
                            currentTag.questions.map(question => (
                                <div id='tagQuestions' key={question.id}>
                                    <div className="questionUser">
                                        <i className="fas fa-user-circle fa-2x" />
                                        <div className="questionUserInfo">
                                            <span className="name">{question.user.firstname} {question.user.lastname}</span><br />
                                            <span className="date">{question.createdAt.slice(5, 16)}</span><br />
                                        </div>
                                    </div>
                                    <div className="question" onClick={() => history.push(`/question/${question.id}`)}>
                                        {question.question}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TagFeed
