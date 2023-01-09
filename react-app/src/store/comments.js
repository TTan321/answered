// Types
const GET_COMMENTS = "comments/GET_COMMENTS"


// Action
const loadComments = payload => {
    return {
        type: GET_COMMENTS,
        "comments": payload
    }
}

// Thunk
export const getComments = () => async dispatch => {
    const response = await fetch('/api/comments')
    if (response.ok) {
        const data = await response.json()
        dispatch(loadComments(data.comments))
        return { ...data }
    }
}

// Reducer
const commentsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_COMMENTS: {
            const newState = {}
            action.comments.forEach(comment => {
                newState[comment.id] = comment
            })
            return newState
        }
        default: {
            return state
        }
    }
}

export default commentsReducer
