import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, setQuestions } from "../store/forms";


const CategoryForm = ({number, type, questionid, remove}) => {

    const dispatch = useDispatch()

    const  {questions} = useSelector((state) => state.forms)

    const tQuestion = questions.find(each => each.id === questionid)


      const handleQuestionChange = (event) => {
        const updatedQuestion = questions.map(each => {
            if(each.id === questionid){
                return {...each, question: event.target.value}
            }
            return each
        })
        dispatch(setQuestions(updatedQuestion))
    }

    const handleCategoryChange = (event, id) => {
        const updatedQuestion = questions.map(each => {
            if(each.id === questionid){
                const updatedCategories =  each.categories.map(category => {
                    if(category.id === id){
                        return {
                            ...category,
                            value: event.target.value
                        }}
                    return category
                })
                return {...each, categories: updatedCategories}
            }
            return each
        })
        dispatch(setQuestions(updatedQuestion))
    }

    const handleItemValueChange = (event, id) => {
        const updatedQuestion = questions.map(each => {
            if(each.id === questionid){
                const updatedItems =  each.items.map(item => {
                    if(item.id === id){
                        return {
                            ...item,
                            value: event.target.value
                        }}
                    return item
                })
                return {...each, items: updatedItems}
            }
            return each
        })
        dispatch(setQuestions(updatedQuestion))
    }

    const handleItemCategoryChange = (event, id) => {
        const updatedQuestion = questions.map(each => {
            if(each.id === questionid){
                const updatedCategories =  each.items.map(category => {
                    if(category.id === id){
                        return {
                            ...category,
                            category: event.target.value
                        }}
                    return category
                })
                return {...each, items: updatedCategories}
            }
            return each
        })
        dispatch(setQuestions(updatedQuestion))
    }

    const handleAddCategory = () => {
        const updatedQuestion = questions.map(each => {
            if(each.id === questionid){
                return {...each, categories: [
                    ...each.categories,
                    {
                        id: uuidv4(),
                        value: 'New Category',
                        items: []
                    }
                ]}
            }
            return each
        })
        dispatch(setQuestions(updatedQuestion))
    }

    const handleAddItem = () => {
        const updatedQuestion = questions.map(each => {
            if(each.id === questionid){
                return {...each, items: [
                    ...each.items,
                    {
                        id: uuidv4(),
                        value: 'New Item',
                        category: ""
                    }
                ]}
            }
            return each
        })
        dispatch(setQuestions(updatedQuestion))
    }

    const handleDeleteCategory = (id) => {
        const updatedQuestion = questions.map(each => {
            if(each.id === questionid){
                return {...each, categories: each.categories.filter(category => category.id !== id)}
            }
            return each
        })
        dispatch(setQuestions(updatedQuestion))
    } 

    const handleDeleteItem = (id) => {
        const updatedQuestion = questions.map(each => {
            if(each.id === questionid){
                return {...each, items: each.items.filter(category => category.id !== id)}
            }
            return each
        })
        dispatch(setQuestions(updatedQuestion))
    } 

    // const handleSaveQuestion = () => dispatch(addQuestion({
    //     id: id,
    //     type: type,
    //     number: number,
    //     question: question,
    //     categories: categories,
    //     items: items,
    // }))

    return (
        <div className="h-auto p-5 rounded-lg border-sky-10 flex flex-col justify-center items-center bg-[#101820] text-[#FBEAEB]">
            <div className="flex flex-col justify-around gap-2 w-11/12">
                <div className="flex flex-col gap-1 justify-start items-start p-2">
                    <h1 className="font-bold text-xl p-2">Question {number}</h1>
                    <input className="hover:scale-105 p-2 text-[#101820] rounded-lg min-w-full w-auto" type="text" placeholder="Enter your question here" value={tQuestion.question} onChange={handleQuestionChange}/>
                </div>
                <div className="flex flex-col gap-1 p-2 w-11/12">
                    <div className="flex justify-start items-center gap-10 w-9/12">
                        <h1 className="font-bold text-xl p-2">Categories</h1>
                        <div onClick={handleAddCategory} className="flex justify-around gap-2 px-3 py-2 items-center cursor-pointer hover:scale-105 bg-[#FEE715] rounded-lg text-[#101820] font-semibold text-md">
                            <FaPlus />
                            <p className="">Add Category</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        {tQuestion.categories.map(category => (
                            <div className="flex flex-col text-[#101820] font-semibold" key={category.id}>
                                <div className="flex justify-start items-center gap-3 p-3 text-[#101820] font-semibold" draggable>
                                    <input  type="text" className="hover:scale-105 p-2 rounded-lg w-auto" draggable placeholder="category" value={category.value} onChange={(event) => handleCategoryChange(event, category.id)}/>
                                    <div className="text-[#FBEAEB] cursor-pointer text-xl flex justify-center items-center hover:scale-110" onClick={() => handleDeleteCategory(category.id)}>
                                        <MdDelete />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 p-2 w-8/12">
                    <div className="flex justify-start gap-10 p-2 items-center w-8/12">
                        <h1 className="font-bold text-xl p-2">Items</h1>
                        <div onClick={handleAddItem} className="flex justify-around gap-2 p-2 items-center cursor-pointer bg-[#FEE715] rounded-lg text-[#101820] font-semibold text-md hover:scale-105">
                            <FaPlus />
                            <p className="text-md">Add Item</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-2 items-center w-8/12">
                        {tQuestion.items.map(item => (
                            <div className="flex justify-around w-8/12 gap-5 p-3 text-[#101820] font-semibold" draggable>
                                <input type="text" className="p-2 rounded-lg w-auto hover:scale-105" placeholder="item" value={item.value} onChange={(event) => handleItemValueChange(event, item.id)}/>
                                <select id="dropdown" className="rounded-lg px-3 py-2 hover:scale-105" value={item.category} onChange={(event) => handleItemCategoryChange(event, item.id)}>
                                    {
                                        tQuestion.categories.map(category => (
                                            <option value={category.value}>{category.value}</option>
                                        ))
                                    }
                                </select>
                                <div className="text-[#FBEAEB] cursor-pointer text-xl flex justify-center items-center hover:scale-110" onClick={() => handleDeleteItem(item.id)}>
                                        <MdDelete />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end items-center gap-5">
                    <button type="button" className="text-[#101820] px-3 py-2 bg-[#FEE715] rounded-lg" onClick={() => remove(questionid)}>Remove</button>
                    {/* <button type="button" className="text-[#101820] px-3 py-2 bg-[#FEE715] rounded-lg" onClick={handleSaveQuestion}>Save</button> */}
                </div>
            </div>
        </div>
    )
}

export default CategoryForm