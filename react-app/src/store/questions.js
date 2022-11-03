// Types
const GET_QUESTIONS = "questions/GET_QUESTIONS"
const ADD_QUESTION = "questions/ADD_QUESTION"
const EDIT_QUESTION = "questions/EDIT_QUESTION"
const DELETE_QUESTION = "question/DELETE_QUESTION"

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

const editQuestion = question => {
    return {
        type: EDIT_QUESTION,
        question
    }
}

const deleteQuestion = id => {
    return {
        type: DELETE_QUESTION,
        id
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

// Edit a question
export const modifyQuestion = question => async dispatch => {
    const response = await fetch(`/api/questions/${question.questionId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(editQuestion(data.question))
        return { ...data }
    }
}

// Delete a question
export const removeQuestion = id => async dispatch => {
    const response = await fetch(`/api/questions/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            'question_id': id
        })
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteQuestion(id))
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
        case EDIT_QUESTION: {
            const newState = { ...state }
            newState[action.question.id] = action.question
            return newState
        }
        case DELETE_QUESTION: {
            const allQuestions = { ...state }
            delete allQuestions[action.id]
            return allQuestions
        }
        default:
            return state
    }
}

export default questionReducer
