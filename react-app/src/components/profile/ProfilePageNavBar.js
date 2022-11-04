

import './ProfilePageNavBar.css'

function ProfilePageNavBar({ user, showAnswers, setShowAnswers, showQuestions, setShowQuestions }) {

    const displayAnswers = (e) => {
        e.preventDefault()
        setShowQuestions(false)
        setShowAnswers(true)
    }

    const displayQuestions = (e) => {
        e.preventDefault()
        setShowAnswers(false)
        setShowQuestions(true)
    }

    return (
        <div id='profilePageSelections'>
            <p
                className='profileNavFilters'
                onClick={(e) => displayAnswers(e)}
                style={showAnswers ? { color: 'red', borderBottom: '1px solid red' } : {}}
            >
                {user.answers.length} Answers
            </p>
            <p
                className='profileNavFilters'
                onClick={(e) => displayQuestions(e)}
                style={showQuestions ? { color: 'red', borderBottom: '1px solid red' } : {}}
            >
                {user.questions.length} Questions
            </p>
        </div >
    )
}

export default ProfilePageNavBar
