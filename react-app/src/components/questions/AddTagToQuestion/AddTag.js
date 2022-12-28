import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addTagToQuestion, loadQuestions } from "../../../store/questions"
import { loadTags } from "../../../store/tags"

function AddTag({ setShowModal, question }) {
    const dispatch = useDispatch()
    const { questionId } = useParams()
    const tags = useSelector(state => state.tagsState)
    const tagsArr = Object.values(tags)
    let tagsSet = new Set()

    for (let i = 0; i < question.tags.length; i++) {
        tagsSet.add(question.tags[i].name)
    }

    let questionTagsArr = tagsArr.filter(tag => !tagsSet.has(tag.name))

    const [checkedTags, setCheckedTags] = useState(0)

    useEffect(() => {
        dispatch(loadTags())
    }, [dispatch])

    const onSelect = (e, selected) => {
        e.preventDefault()
        setCheckedTags(selected)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            question_id: +questionId,
            tag_id: checkedTags
        }

        console.log('PAYLOAD: ', payload)

        await dispatch(addTagToQuestion(payload))
        await dispatch(loadQuestions())
        setShowModal(false)
    }

    return (
        <div>
            Add Tags
            <form onSubmit={onSubmit}>
                <select defaultValue={"none"} onChange={(e) => onSelect(e, e.target.value)}>
                    <option value="none" disabled hidden>Select a Tag</option>
                    {
                        questionTagsArr.map(tag => (
                            <option key={tag.id}
                                value={tag.id}
                            >
                                {tag.name}
                            </option>
                        ))
                    }
                </select>
                <button type="submit">Add Tags</button>
            </form>
        </div>
    )
}

export default AddTag
