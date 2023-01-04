import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addTagToQuestion, loadQuestions } from "../../../store/questions"
import { loadTags } from "../../../store/tags"
import './AddTag.css'

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
    console.log(questionTagsArr.length > 0)

    const [checkedTags, setCheckedTags] = useState(0)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(loadTags())
    }, [dispatch])

    const onSelect = (e, selected) => {
        e.preventDefault()
        setCheckedTags(selected)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (checkedTags === 0) {
            let validateErrors = [];
            validateErrors.push("Select a tag to add to this question.")
            setErrors(validateErrors)
            return
        }

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
        <div className="addTagForm">
            <div id='add-tag-cancel-div' onClick={() => setShowModal(false)}>
                <i className="fas fa-times" />
            </div>
            <div style={{ display: "flex", justifyContent: "center", borderBottom: "solid lightgray 1px" }}>
                {questionTagsArr.length > 0 && <div style={{ fontSize: 20, fontWeight: "bold" }}>Add Tags</div>}
                {questionTagsArr.length === 0 && <div style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>Alert</div>}
            </div>
            <div style={{ padding: "0 5px", paddingTop: "10px" }}>
                {questionTagsArr.length > 0 &&
                    <form onSubmit={onSubmit} className="addTagFormBody">
                        <select className="tagsDropdown" defaultValue={"none"} onChange={(e) => onSelect(e, e.target.value)}>
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
                        {errors.length > 0 &&
                            errors.map((message, idx) => (
                                <div key={idx} style={{ color: 'red', fontSize: '14px', fontWeight: 'bold', paddingTop: '10px' }}>
                                    {message}
                                </div>
                            ))
                        }
                        <div className="addTagButtonDiv">
                            <button type="submit" className="addTags">Add Tags</button>
                        </div>
                    </form>
                }
                {
                    questionTagsArr.length === 0 &&
                    <p className="alertMessage">
                        All spaces have been tagged to this question. Create more spaces to add more tags to this question.
                    </p>
                }
            </div>
        </div>
    )
}

export default AddTag
