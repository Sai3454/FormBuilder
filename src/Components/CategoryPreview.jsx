import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { setAnswer } from '../store/forms';
import { useDispatch, useSelector } from 'react-redux';

const CategoryPreview = ({questionId, type, number}) => {

  const  {questions, answers} = useSelector((state) => state.forms)
    
  const tQuestion = questions.find(each => each.id === questionId)

  const [itemsList, setItemsList] = useState(tQuestion.items)
  const [categoriesList, setCategoriesList] = useState(tQuestion.categories)

const dispatch = useDispatch()

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, categoryId) => {
    const draggedItem = event.dataTransfer.getData('text/plain');

    // Remove the dragged item from itemsList
    const updatedItemsList = itemsList.filter(item => item.value !== draggedItem);
    setItemsList(updatedItemsList);

    // Add the dragged item to categoriesList
    const updatedCategoriesList = categoriesList.map(category => {
        if(category.id === categoryId){
            return {...category, items: [...category.items, draggedItem]}
        }
        return category
    });
    setCategoriesList(updatedCategoriesList);
  };

  const handleSaveQuestion = () => dispatch(setAnswer([
    ...answers,
    {
    id: uuidv4(),
    type: type,
    questionId: questionId,
    answer: categoriesList,
  }]))

  return (
    <div className="h-auto p-5 rounded-lg border-sky-10 flex flex-col justify-center items-center bg-[#101820] text-[#FBEAEB] gap-10">
      <div className="flex flex-col gap-5">
        <h1 className='self-start font-semibold text-md'>Question {number}</h1>
        <h2 className='text-sm font-semibold'>Items</h2>
        <ul className='flex items-center gap-3 px-5 py-3 bg-[#FBEAEB] min-w-[500px] rounded-lg min-h-[50px]'>
          {itemsList.map(item => (
            <li
              key={item.id}
              className='flex text-sm justify-center items-center text-[#101820] min-w-[200px] font-semibold px-3 py-2 bg-[#FEE715] rounded-lg'
              draggable
              onDragStart={(event) => handleDragStart(event, item.value)}
            >
              {item.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className='text-sm'>Categories</h2>
        <div className='flex gap-5 flex-wrap'>
            {categoriesList.map(category => (
            <div
                key={category.id}
                className="min-w-[150px] min-h-[200px] flex flex-col p-5 text-gray-900 gap-5 bg-[#FBEAEB] rounded-lg"
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, category.id)}
            >
                    <h2 className='text-sm font-semibold'>{category.value}</h2>   
                    {category.items.map(item => (
                        <div className='text-sm flex justify-center items-center text-[#101820] min-w-[200px] font-semibold px-3 py-2 bg-[#FEE715] rounded-lg'>
                            {item}
                        </div>
                    ))}
            </div>
            ))}
        </div>
      </div>
      <div className="flex justify-end items-center gap-5">
            <button type="button" className="text-[#101820] text-sm font-semibold px-3 py-2 bg-[#FEE715] rounded-lg" onClick={handleSaveQuestion}>Save</button>
        </div>
    </div>
  );
};

export default CategoryPreview;
