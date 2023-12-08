import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { FaPlus } from "react-icons/fa6";
import CategoryForm from "./CategoryForm";
import ComprehensionForm from "./ComprehensionForm";
import ClozeForm from "./ClozeForm";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, setQuestions } from "../store/forms";
import CategoryPreview from "./CategoryPreview";
import ComprehensionPreview from "./ComprehensionPreview";

const Preview = () => {

    const dispatch = useDispatch()

  const  {questions} = useSelector((state) => state.forms)

    const categories = ["Categorize", "Cloze", "Comprehension"]

    // const handleAddQuestion = (event) => {
    //     dispatch(addQuestion([
    //         ...questions,
    //         {
    //         id: uuidv4(),
    //         type: selectedType,
    //                     question: "React is a _JavaScript_ library for building user _interfaces_.",
    //                     categories: [{
    //                         id: uuidv4(),
    //                         value: 'New Category',
    //                       },{
    //                         id: uuidv4(),
    //                         value: 'New Category',
    //                       }],
    //                     items: [{
    //                         id: uuidv4(),
    //                         value: 'New Item',
    //                         category: ""
    //                       },{
    //                         id: uuidv4(),
    //                         value: 'New Item',
    //                         category: ""
    //                       }],
    //                     imageUrl: "",
    //                     paragragh: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //                     cQuestions: [
    //                         {                   
    //                             id: uuidv4(),
    //                             question: "What is the advantage?",
    //                             options: [{
    //                                 id: uuidv4(),
    //                                 value: "option"
    //                             },
    //                             {
    //                                 id: uuidv4(),
    //                                 value: "option"
    //                             }]
    //                         }
    //                     ],
    //                     underlinedWords: [],
    //         }
    //     ]))
    // }

    // const handleDeleteQuestion = (id) => {
    //     const filteredQuestions = questions.filter(question => question.id !== id);
    //     dispatch(setQuestions(filteredQuestions))
    // } 


    return (
        <div className="flex flex-col gap-5 bg-gray-700 ">
            <div className="flex flex-col gap-5 p-5">
                {questions.map((question, index) => (
                    <div>  
                        {question.type === "Categorize" && <CategoryPreview type={question.type} number={index} questionId={question.id} />}
                        {question.type === "Comprehension" && <ComprehensionPreview type={question.type} number={index} questionId={question.id} />}
                        {/* {question.type === "Cloze" && <ClozeForm type={question.type} number={index} questionid={question.id} />} */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Preview