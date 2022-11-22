// Types
const GET_TAGS = "tags/GET_TAGS"
const ADD_TAG = "tags/ADD_TAG"
const EDIT_TAG = "tags/EDIT_TAG"
const DELETE_TAG = "tags/DELETE_TAG"

// Actions
const getTags = tags => {
    return {
        type: GET_TAGS,
        tags
    }
}

const addTag = tag => {
    return {
        type: ADD_TAG,
        tag
    }
}

const editTag = tag => {
    return {
        type: EDIT_TAG,
        tag
    }
}

const deleteTag = id => {
    return {
        type: DELETE_TAG,
        id
    }
}

// Thunks
// Get all tags
export const loadTags = () => async dispatch => {
    const resposne = await fetch('/api/tags')
    if (resposne.ok) {
        const data = await resposne.json()
        dispatch(getTags(data.tags))
        return { ...data }
    }
}

export const createTag = payload => async dispatch => {
    const response = await fetch('/api/tags', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json()
        console.log('DATA: ', data)
        dispatch(addTag(data.tag))
        return { ...data }
    }
}

export const modifyTag = payload => async dispatch => {
    const response = await fetch(`/api/tags/${payload.tagId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(editTag(data.tag))
        return { ...data }
    }
}

export const removeTag = id => async dispatch => {
    const response = await fetch(`/api/questions/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            'tag_id': id
        })
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteTag(data.id))
        return { ...data }
    }
}

// Tags reducer
const tagsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TAGS: {
            const allTags = {}
            action.tags.forEach(tag => {
                allTags[tag.id] = tag
            })
            return allTags
        }
        case ADD_TAG: {
            const newState = { ...state }
            newState[action.tag.id] = action.tag
            return newState
        }
        case EDIT_TAG: {
            const newState = { ...state }
            newState[action.tag.id] = action.tag
            return newState
        }
        case DELETE_TAG: {
            const allTags = { ...state }
            delete allTags[action.id]
            return allTags
        }
        default:
            return state
    }
}

export default tagsReducer
