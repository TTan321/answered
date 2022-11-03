// Types
const GET_QUESTIONS = "questions/GET_QUESTIONS"

// Actions
const getQuestions = questions => {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

// Thunk
export const loadQuestions = () => async dispatch => {
    const response = await fetch('/api/questions')
    if (response.ok) {
        const data = await response.json()
        dispatch(getQuestions(data.questions))
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

        default:
            return state
    }
}

export default questionReducer
