import './ProfilePageNavBar.css'

function ProfilePageNavBar({ user, showAnswers, setShowAnswers, showQuestions, setShowQuestions, setShowComments, showComments }) {

    const displayAnswers = (e) => {
        e.preventDefault()
        setShowQuestions(false)
        setShowAnswers(true)
        setShowComments(false)
    }

    const displayQuestions = (e) => {
        e.preventDefault()
        setShowAnswers(false)
        setShowQuestions(true)
        setShowComments(false)
    }

    const displayComments = (e) => {
        e.preventDefault()
        setShowAnswers(false)
        setShowQuestions(false)
        setShowComments(true)
    }

    const filterStyles = {
        color: 'red',
        borderBottom: '2px solid red',
    }

    return (
        <div id='profilePageSelections'>
            <p
                className='profileNavFilters'
                onClick={(e) => displayAnswers(e)}
                style={showAnswers ? filterStyles : {}}
            >
                {user.answers.length} Answers
            </p>
            <p
                className='profileNavFilters'
                onClick={(e) => displayQuestions(e)}
                style={showQuestions ? filterStyles : {}}
            >
                {user.questions.length} Questions
            </p>
            <p
                className='profileNavFilters'
                onClick={(e) => displayComments(e)}
                style={showComments ? filterStyles : {}}
            >
                {user.comments.length} Comments
            </p>
        </div>
    )
}

export default ProfilePageNavBar
