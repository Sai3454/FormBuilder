import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addQuestion, setQuestions } from "../store/forms"

const ClozeForm = ({number, remove, questionid, type}) => {

    const dispatch = useDispatch()

    
    const  {questions} = useSelector((state) => state.forms)

    const tQuestion = questions.find(each => each.id === questionid)

    const {question, underlinedWords} = tQuestion

    const extractUnderlinedAnswers = () => {
        const underlineRegex = /_([^_]+)_/g;
    
        const matches = question.match(underlineRegex);
    
        const underlinedAnswers = matches ? matches.map(match => match.replace(/_/g, '')) : [];
    
        return underlinedAnswers;
    };

    useEffect(() => {
        const updatedQuestion = questions.map(each => {
            if(each.id === questionid){
                return {...each, underlinedWords: extractUnderlinedAnswers()}
            }
            return each
        })
        dispatch(setQuestions(updatedQuestion))
    }, [question])

    const handleQuestionChange = (event) => {
        const updatedQuestion = questions.map(each => {
            if(each.id === questionid){
                return {...each, question: event.target.value}
            }
            return each
        })
        dispatch(setQuestions(updatedQuestion))
    }

    // const handleSaveQuestion = () => dispatch(addQuestion({
    //     type: type,
    //     id: id,
    //     number: number,
    //     question: question,
    //     underlinedWords: answers,
    // }))

    return (
        <div className="h-auto p-5 rounded-lg border-sky-10 flex flex-col justify-center items-center bg-[#101820] text-[#FBEAEB]">
            <div className="flex flex-col justify-around gap-2 w-11/12">
                <div className="flex flex-col gap-1 justify-start items-start p-2">
                    <h1 className="font-bold text-xl p-2">Question {number}</h1>
                    <input className="hover:scale-105 p-2 text-[#101820] rounded-lg min-w-full w-auto" type="text" placeholder="Enter your question here" value={question} onChange={handleQuestionChange}/>
                </div>
                <ul className="flex flex-col items-start gap-2">
                    {underlinedWords.map((answer, index) => (
                        <li key={index} className="flex justify-center items-center text-[#101820] min-w-[200px] font-semibold px-3 py-2 bg-[#FEE715] rounded-lg">{answer}</li>
                    ))}
                </ul>
                <div className="flex justify-end items-center gap-5">
                    <button type="button" className="text-[#101820] px-3 py-2 bg-[#FEE715] rounded-lg" onClick={() => remove(questionid)}>Remove</button>
                    {/* <button type="button" className="text-[#101820] px-3 py-2 bg-[#FEE715] rounded-lg" onClick={handleSaveQuestion}>Save</button> */}
                </div>
            </div>
        </div>
    )
}

export default ClozeForm