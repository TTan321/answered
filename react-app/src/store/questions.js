// Types
const GET_QUESTIONS = "questions/GET_QUESTIONS"
const ADD_QUESTION = "questions/ADD_QUESTION"

// Actions
const getQuestions = questions => {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

const addQuestion = question => {
    return {
        type: ADD_QUESTION,
        question
    }
}

// Thunks
// Get all questions
export const loadQuestions = () => async dispatch => {
    const response = await fetch('/api/questions')
    if (response.ok) {
        const data = await response.json()
        dispatch(getQuestions(data.questions))
        return { ...data }
    }
}

// Add a question
export const postQuestion = question => async dispatch => {
    const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question)
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(addQuestion(data.question))
        return { ...data }
    }
}

// Questions Reducer
const questionReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_QUESTIONS: {
            const allQuestions = {}
            action.questions.forEach(question => {
                allQuestions[question.id] = question
            })
            return allQuestions
        }
        case ADD_QUESTION: {
            const newState = { ...state }
            newState[action.question.id] = action.question
            return newState
        }

        default:
            return state
    }
}

export default questionReducer
