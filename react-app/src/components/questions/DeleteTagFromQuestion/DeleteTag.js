import { useDispatch } from "react-redux"
import { loadQuestions, removeTagOnQuestion } from "../../../store/questions"


function DeleteTag({ setShowModal, tag, question }) {
    const dispatch = useDispatch();

    const currentTag = question.question_tags.find(questionTag => questionTag.tag_id === tag.id)

    console.log("CURRENT TAG: ", currentTag)
    console.log("THIS IS THE TAG: ", tag)
    console.log("THIS IS current question: ", question)

    const removeTag = () => {

        const payload = {
            question_tag_id: currentTag.id
        }

        dispatch(removeTagOnQuestion(payload))
        dispatch(loadQuestions())
        setShowModal(false)
    }

    return (
        <div>
            <div>
                <p>Do want to remove this tag from this question?</p>
                <div>
                    <button onClick={removeTag}>Remove</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTag
