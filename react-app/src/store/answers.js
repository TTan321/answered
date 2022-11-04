// Types
const GET_ANSWERS = "answers/GET_ANSWERS"
const ADD_ANSWER = "answers/ADD_ANSWER"

// Actions
const loadAnswers = answers => {
    return {
        type: GET_ANSWERS,
        answers
    }
}

const postAnswer = answer => {
    return {
        type: ADD_ANSWER,
        answer
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

export const addAnswer = answer => async dispatch => {
    const reponse = await fetch(`/api/answers`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answer)
    });
    if (reponse.ok) {
        const data = await reponse.json()
        dispatch(postAnswer(data.answer))
        return { ...data }
    }
}

// Reducer
const answersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ANSWERS: {
            const newState = {}
            action.answers.forEach(answer => {
                newState[answer.id] = answer
            })
            return newState
        }
        case ADD_ANSWER: {
            const newAnswer = {}
            newState[action.answer.id] = action.answer
            const newState = { ...state, ...newAnswer }
            return newState
        }
        default: {
            return state
        }
    }
}

export default answersReducer
