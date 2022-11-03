

import './ProfilePageNavBar.css'

function ProfilePageNavBar({ setShowAnswers, setShowQuestions }) {

    return (
        <div id='profilePageSelections'>
            <p>
                Answers
            </p>
            <p onClick={() => setShowQuestions(true)}>
                Questions
            </p>
        </div>
    )
}

export default ProfilePageNavBar
