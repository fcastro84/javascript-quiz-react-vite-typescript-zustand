import { QuestionType } from "../types.d"

export const getBackgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info
    
    if (userSelectedAnswer == null) return {backgroundColor:'transparent'}
    
    if (index !== correctAnswer && index !== userSelectedAnswer) return {backgroundColor:'transparent'}
    
    if (index === correctAnswer) return {backgroundColor:'blue'}
    
    if (index === userSelectedAnswer) return {backgroundColor:'red'}
    
    return {backgroundColor:'transparent'}
  }