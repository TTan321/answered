// Types
const GET_ANSWERS = "answers/GET_ANSWERS"

// Actions
const loadAnswers = answers => {
    return {
        type: GET_ANSWERS,
        answers
    }
}

// Thunks
export const getAnswers = () => async dispatch => {
    const reponse = await fetch('/api/answers')
    if (reponse.ok) {
        const data = await reponse.json()
        dispatch(loadAnswers(data.answers))
        return { ...data }
    }
}

// Reducer
const answersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ANSWERS: {
            const newState = {}
            action.answers.forEach(answer => {
                newState.answer.id = answer
            })
            return newState
        }
        default: {
            return state
        }
    }
}

export default answersReducer
