import { create } from "zustand";
import { QuestionStore, QuestionType } from "../types.d";
import { persist } from "zustand/middleware";

const APP_API_URL = 'https://api.jsonbin.io/v3/b/65b6909e1f5677401f276e83'


export const useQuestionStore = create<QuestionStore>()(persist(( set, get ) => {
    return {
       question: [],
       loading: false,
       currentQuestion: 0,
       limit: 0,
       fetchQuestion: async(limit) => {
       
        const resp = await fetch(APP_API_URL, {
            method: 'GET',
            headers: {
                "X-Master-Key": import.meta.env.VITE_KEY_API
            }
        })
        const { record: questions } = await resp.json() as {record: QuestionType[]}
        const newQuestions = questions.sort(() => Math.random() -0.5 ).slice( 0, limit)
    
        set({question: newQuestions, limit, loading: false}, false)
       },
       userSelectAnswer: (id, answerIndex)=> {
          const { question }  = get()

          const copyArrayQuestions = structuredClone(question)

          const indexElement = copyArrayQuestions.findIndex( question => question.id === id )

          const questionCurrent = copyArrayQuestions[indexElement]

          const isCorrectUserAnswer = questionCurrent.correctAnswer === answerIndex

          copyArrayQuestions[indexElement] = {
            ...questionCurrent,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex
          }

          set({question: copyArrayQuestions}, false)
       },
       goNextPage: ()=> {
           const { currentQuestion, question } = get()
           const nextQuestion = currentQuestion + 1

           if(nextQuestion < question.length){
            set({currentQuestion: nextQuestion})
           }
       },
       goPrevPage: ()=> {
        const { currentQuestion } = get()
        const prevQuestion = currentQuestion - 1

        if(prevQuestion >= 0){
         set({currentQuestion: prevQuestion})
        }
       },
       setLoading: () =>{
        set({loading: true}, false)
       },
       reset: () => {
        set({question: [], currentQuestion: 0, limit: 0, loading: false}, false)
       }

    }
},
{
 name: 'questions'
}))