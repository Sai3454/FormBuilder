import { v4 as uuidv4 } from "uuid"
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../store/forms";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const ComprehensionPreview = ({number, type, questionId}) => {

    const dispatch = useDispatch()

  const  {questions, answers} = useSelector((state) => state.forms)
    
  const tQuestion = questions.find(each => each.id === questionId)
  console.log(tQuestion.paragragh)


  const handleSaveAnswer = (event, id) => {
        const updatedAnswer = answers.map(each => {
            if(each.questionId === questionId){
                return {...each, answer: [...each.answer, {
                    id: uuidv4(),
                    type: type,
                    questionId: questionId,
                    answer: [{questionId: id, value: event.target.value}],
                }]}
            }
            return each
        })
        dispatch(setAnswer(updatedAnswer))
  }

    return (
        <div className="h-auto p-5 rounded-lg border-sky-10 flex flex-col justify-center items-center bg-[#101820] text-[#FBEAEB]">
            <div className="flex flex-col justify-around gap-2 w-11/12">
                <div className="flex flex-col gap-1 justify-start items-start p-2">
                    <h1 className="font-bold text-xl p-2">Question {number}</h1>
                    <p className="text-sm bg-[#FBEAEB] p-5 text-gray-900 text-left rounded-md">
                        {tQuestion.paragragh}
                    </p>
                </div>
                <div className="flex flex-col gap-1 p-2 w-11/12">
                    <div className="flex justify-start items-center gap-10 w-9/12">
                        <h1 className="font-bold text-xl p-2">Questions</h1>
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        {tQuestion.cQuestions.map((question, index1) => (
                            <div className="flex flex-col text-[#101820] font-semibold" key={question.id}>
                                <div className="flex gap-1 justify-start items-center p-2 text-[#FBEAEB]">
                                    <h1 className="font-bold text-sm p-2 ">{number}.{index1 + 1}</h1>
                                    <p className="text-sm">{question.question}</p>
                                </div>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        className="text-[#FBEAEB] text-xs"
                                    >
                                        {question.options.map((option) => (
                                            <FormControlLabel value={option.value} control={<Radio />} label={option.value} onChange={(event) => handleSaveAnswer(event, question.id)}/>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComprehensionPreview