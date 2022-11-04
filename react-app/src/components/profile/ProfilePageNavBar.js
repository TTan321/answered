

import './ProfilePageNavBar.css'

function ProfilePageNavBar({ setShowAnswers, setShowQuestions }) {

    const showAnswers = (e) => {
        e.preventDefault()
        setShowQuestions(false)
        setShowAnswers(true)
    }

    const showQuestions = (e) => {
        e.preventDefault()
        setShowAnswers(false)
        setShowQuestions(true)
    }

    return (
        <div id='profilePageSelections'>
            <p onClick={(e) => showAnswers(e)}>
                Answers
            </p>
            <p onClick={(e) => showQuestions(e)}>
                Questions
            </p>
        </div>
    )
}

export default ProfilePageNavBar
