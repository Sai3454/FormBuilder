import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { FaPlus } from "react-icons/fa6";
import CategoryForm from "./CategoryForm";
import ComprehensionForm from "./ComprehensionForm";
import ClozeForm from "./ClozeForm";
import { useDispatch, useSelector } from "react-redux";
import { addNewDocument, addNewForm, addQuestion, resetForm, setQuestions } from "../store/forms";
import Preview from "./Preview";

const FormBuilder = () => {
    const formId = uuidv4()
    const [selectedType, setSelectedType] = useState("Categorize")
    const [showPreview, setShowPreview] = useState(false)

    const dispatch = useDispatch()

  const  {questions, answers} = useSelector((state) => state.forms)

    const categories = ["Categorize", "Cloze", "Comprehension"]

    const handleAddQuestion = (event) => {
        dispatch(addQuestion([
            ...questions,
            {
            id: uuidv4(),
            type: selectedType,
                        question: "React is a _JavaScript_ library for building user _interfaces_.",
                        categories: [{
                            id: uuidv4(),
                            value: 'New Category',
                            items: []
                          },{
                            id: uuidv4(),
                            value: 'New Category',
                            items: []
                          }],
                        items: [{
                            id: uuidv4(),
                            value: 'New Item',
                            category: ""
                          },{
                            id: uuidv4(),
                            value: 'New Item',
                            category: ""
                          }],
                        imageUrl: "",
                        paragragh: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        cQuestions: [
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
                        ],
                        underlinedWords: [],
            }
        ]))
    }

    const handleDeleteQuestion = (id) => {
        const filteredQuestions = questions.filter(question => question.id !== id);
        dispatch(setQuestions(filteredQuestions))
    } 

    const handleClickSubmit = () => {
        dispatch(addNewForm({id: formId, questions}))
        dispatch(addNewDocument({id: uuidv4(), formId, answers}))
        dispatch(resetForm())
        setShowPreview(false)
    }


    return (
        <div className="flex flex-col gap-5 bg-gray-700">
            <div className="flex flex-col gap-5 p-5">
                {questions.map((question, index) => (
                    <div key={question.id}>  
                        {question.type === "Categorize" && <CategoryForm type={question.type} number={index} questionid={question.id} remove={handleDeleteQuestion}/>}
                        {question.type === "Comprehension" && <ComprehensionForm type={question.type} number={index} questionid={question.id} remove={handleDeleteQuestion}/>}
                        {question.type === "Cloze" && <ClozeForm type={question.type} number={index} questionid={question.id} remove={handleDeleteQuestion}/>}
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center h-[200px] gap-10">
                <select id="dropdown" className="rounded-lg px-3 py-2 hover:scale-105" value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
                    {
                        categories.map(category => (
                            <option value={category} key={category.id}>{category}</option>
                        ))
                    }                                    
                </select>
                <div onClick={handleAddQuestion} className="flex justify-around gap-2 p-2 items-center cursor-pointer bg-[#FEE715] rounded-lg text-[#101820] font-semibold text-md hover:scale-105">
                    <FaPlus />
                    <p className="text-md">Add</p>
                </div>
            </div>
            {showPreview && (
                <div className="absolute overflow-scroll top-0 left-0  p-20 w-screen text-3xl flex justify-center items-center bg-black bg-opacity-80">
                    <div className="w-10/12 ">
                        <Preview />
                        <div className="flex justify-center items-center gap-7 bg-gray-700 p-5">
                            <button type="button" className="text-[#101820] text-sm px-3 py-2 font-semibold bg-[#FEE715] rounded-lg" onClick={() => setShowPreview(!showPreview)}>Cancel</button>
                            <button type="button" className="text-[#101820] text-sm px-3 py-2 font-semibold bg-[#FEE715] rounded-lg" onClick={handleClickSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-center items-center pb-10">
                <button type="button" className="text-[#101820] text-sm px-3 py-2 bg-[#FEE715] rounded-lg" onClick={() => setShowPreview(!showPreview)}>Preview</button>
            </div>
        </div>
    )
}

export default FormBuilder