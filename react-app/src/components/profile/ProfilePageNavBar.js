
import { useState } from 'react'
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

    const filterStyles = {
        color: 'red',
        borderBottom: '1px solid red',
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
        </div >
    )
}

export default ProfilePageNavBar
