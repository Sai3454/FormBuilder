import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  title: "Title",
  questions: [{
    id: "",
    type: "",
    number: "",
    question: "",
    categories: [],
    items: [],
    imageUrl: "",
    paragragh: "",
    cQuestions: [],
    underlinedWords: []
  }],            
  answers: [{
    id: "",
    type: "",
    questionId: "",
    answer: [],
  }]
}


const FormSlice = createSlice({
    name: "forms",
    initialState,
    reducers: {
        // action: function

        setFormTitle: (state, action) => {
            state.title = action.payload.title
        },

        setQuestions: (state, action) => {
            // const {id, questions} = action.payload
            // const {type, number, question, categories, items, imageUrl, paragragh, cQuestions, underlinedWords} = questions
            // const updatedQuestions = state.questions.map(item => {
            //     if(item.id === id){
            //         return {
            //             ...item,
            //             type: type,
            //             number: number,
            //             question: question,
            //             categories: categories,
            //             items: items,
            //             imageUrl: imageUrl,
            //             paragragh: paragragh,
            //             cQuestions: cQuestions,
            //             underlinedWords: underlinedWords,
            //         }
            //     }
            //     return item
            // })
            state.questions = action.payload
        },

        addQuestion: (state, action) => {
            state.questions = action.payload
        },

        setAnswer: (state, action) => {
            state.answers = action.payload
        },

        resetForm: (state, action) => {
            state = initialState
        }
    }
});

export const {
    setFormTitle,
    setQuestions,
    addQuestion,
    setAnswer,
    resetForm,
} = FormSlice.actions;
export default FormSlice.reducer;

// Action Creators


// export const loadTransactions = () => {
    
//     const params = {
//         "limit": "20",
//         "offset": "1"
//     }
//     const url = "/all-transactions";

//     return apiCallBegan({
//         url,
//         params,
//         onStart: apiRequested.type,
//         onSuccess: getTransactions.type,
//         onError: apiRequestFailed.type,
//     });

// }

export const addNewForm = (data) => {
    const url = "/form";

    return apiCallBegan({
        url,
        method: "POST",
        data,
    });
}


export const addNewDocument = (data) => {
    const url = "/documents";

    return apiCallBegan({
        url,
        method: "POST",
        data,
    });
}

