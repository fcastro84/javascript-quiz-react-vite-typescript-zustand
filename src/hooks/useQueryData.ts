import { useQuestionStore } from "../store/questions"


const useQueryData = () => {
 const questions = useQuestionStore( state => state.question )
 let correct = 0
 let incorrect = 0
 let unanswerd = 0

  questions.forEach( question => {
    if(  question.isCorrectUserAnswer ) correct++
    else if (question.userSelectedAnswer == null) unanswerd++
    else incorrect++
  })

  return { correct, incorrect, unanswerd}
}

export default useQueryData
