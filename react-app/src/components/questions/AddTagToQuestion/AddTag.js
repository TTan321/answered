import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addTagToQuestion, loadQuestions } from "../../../store/questions"
import { loadTags } from "../../../store/tags"

function AddTag({ setShowModal }) {
    const dispatch = useDispatch()
    const { questionId } = useParams()
    const tags = useSelector(state => state.tagsState)
    const tagsArr = Object.values(tags)

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

        await dispatch(addTagToQuestion(payload))
        await dispatch(loadQuestions())
        setShowModal(false)
    }

    return (
        <div>
            Add Tags
            <form onSubmit={onSubmit}>
                {/* {
                    tagsArr.map(tag => (
                        <div key={tag.id}>
                            <label htmlFor={tag.name}>
                                <input
                                    name={tag.name}
                                    type="checkbox"
                                    value={tag.id}
                                    onChange={() => setCheckedTags(checkedTags[`${tag.name}`] ? false : true)}
                                />
                                {tag.name}
                            </label>
                        </div>
                    ))
                } */}
                <select onChange={(e) => onSelect(e, e.target.value)}>
                    {
                        tagsArr.map(tag => (
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
