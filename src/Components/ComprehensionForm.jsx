import { v4 as uuidv4 } from "uuid"
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../store/forms";

const ComprehensionForm = ({number, type, questionid, remove}) => {

    const dispatch = useDispatch()

  const  {questions} = useSelector((state) => state.forms)
  console.log(questions)

    const tQuestion = questions.find(each => each.id === questionid)



    const handleChange = (event) => {
        const updatedQuestion = questions.map(each => {
            if(each.id === questionid){
                return {...each, paragragh: event.target.value}
            }
            return each
        })
        dispatch(setQuestions(updatedQuestion))
    };

    const handleAddQuestion = () => {
        const updatedQuestion = questions.map(each => {
            if(each.id === questionid){
                return {...each, cQuestions: [
                    ...each.cQuestions,
                    {                   
                        id: uuidv4(),
                        question: "What is the advantage?",
                        options: [{
                            id: uuidv4(),
                            value: "option"
                        },
                        {
                            id: uuidv4(),
                            value: "option"
                        }]
                    }
                ],}
            }
            return each
        })
        dispatch(setQuestions(updatedQuestion))
    } 

const handleAddOptions = (id) => {
    const updatedQuestion = questions.map(each => {
        if(each.id === questionid){
            const updatedCquestions =  each.cQuestions.map(question => {
                if(question.id === id){
                    return {
                        ...question,
                        options: [
                            ...question.options,
                            {
                            id: uuidv4(),
                            value: "option"
                        },]
                    }}
                return question
            })
            return {...each, cQuestions: updatedCquestions}
        }
        return each
    })
    dispatch(setQuestions(updatedQuestion))
} 

        const handleCQuestionChange = (event, id) => {
            const updatedQuestion = questions.map(each => {
                if(each.id === questionid){
                    const updatedCquestions =  each.cQuestions.map(question => {
                        if(question.id === id){
                            return {
                                ...question,
                                question: event.target.value
                            }}
                        return question
                    })
                    return {...each, cQuestions: updatedCquestions}
                }
                return each
            })
            dispatch(setQuestions(updatedQuestion))
        }
    
        const handleOptionChange = (event, Qid, Oid) => {
            const updatedQuestion = questions.map(each => {
                if(each.id === questionid){
                    const updatedCquestions = each.cQuestions.map(question => {
                        if (question.id === Qid) {
                            const updatedOptions = question.options.map(option => { 
                                if (option.id === Oid) {
                                    return {...option, value: event.target.value}
                                }
                                return option
                            })
                            return {...question, options: updatedOptions}
                        }
                        return question;
                    });
                    return {...each, cQuestions: updatedCquestions}
                }
                return each
            })
            dispatch(setQuestions(updatedQuestion))
        }

        const handleDeleteOption = (Oid, Qid) => {
            const updatedQuestion = questions.map(each => {
                if(each.id === questionid){
                    const updatedCquestions = each.cQuestions.map(question => {
                        if (question.id === Qid) {
                            return {...question, options: question.options.filter(option => option.id !== Oid)}
                        }
                        return question;
                    });
                    return {...each, cQuestions: updatedCquestions}
                }
                return each
            })
            dispatch(setQuestions(updatedQuestion))
        }

    return (
        <div className="h-auto p-5 rounded-lg border-sky-10 flex flex-col justify-center items-center bg-[#101820] text-[#FBEAEB]">
            <div className="flex flex-col justify-around gap-2 w-11/12">
                <div className="flex flex-col gap-1 justify-start items-start p-2">
                    <h1 className="font-bold text-xl p-2">Question {number}</h1>
                    <textarea
                        id="myTextarea"
                        className="hover:scale-105 p-2 text-[#101820] rounded-lg min-w-full w-auto min-h-[200px] h-auto"
                        value={tQuestion.paragragh}
                        onChange={handleChange}
                        rows="4"
                        cols="100"
                    />
                </div>
                <div className="flex flex-col gap-1 p-2 w-11/12">
                    <div className="flex justify-start items-center gap-10 w-9/12">
                        <h1 className="font-bold text-xl p-2">Questions</h1>
                        <div onClick={handleAddQuestion} className="flex justify-around gap-2 px-3 py-2 items-center cursor-pointer hover:scale-105 bg-[#FEE715] rounded-lg text-[#101820] font-semibold text-md">
                            <FaPlus />
                            <p className="">Add Question</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        {tQuestion.cQuestions.map((question, index1) => (
                            <div className="flex flex-col text-[#101820] font-semibold" key={question.id}>
                                <div className="flex gap-1 justify-start items-start p-2">
                                    <h1 className="font-bold text-xl p-2 text-[#FBEAEB]">{number}.{index1 + 1}</h1>
                                    <input className="hover:scale-105 p-2 text-[#101820] rounded-lg min-w-full w-auto" type="text" placeholder="Enter your question here" value={question.question} onChange={(event) => handleCQuestionChange(event, question.id)}/>
                                </div>
                                <div className="flex justify-start items-center gap-10 w-9/12">
                                    <h1 className="font-bold text-xl p-2">Options</h1>
                                    <div onClick={() => handleAddOptions(question.id)} className="flex justify-around gap-2 px-3 py-2 items-center cursor-pointer hover:scale-105 bg-[#FEE715] rounded-lg text-[#101820] font-semibold text-md">
                                        <FaPlus />
                                        <p className="">Add Options</p>
                                    </div>
                                </div>
                                {question.options.map((option) => (
                                    <div key={option.id} className="flex justify-start items-center gap-3 p-3 text-[#101820] font-semibold" draggable>
                                        <input  type="text" className="hover:scale-105 p-2 rounded-lg w-auto" draggable placeholder="category" value={option.value} onChange={(event) => handleOptionChange(event, question.id, option.id)}/>
                                        <div className="text-[#FBEAEB] cursor-pointer text-xl flex justify-center items-center hover:scale-110" onClick={() => handleDeleteOption(option.id, question.id)}>
                                            <MdDelete />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center gap-5">
                    <button type="button" className="text-[#101820] px-3 py-2 bg-[#FEE715] rounded-lg" onClick={() => remove(questionid)}>Remove</button>
            </div>
        </div>
    )
}

export default ComprehensionForm