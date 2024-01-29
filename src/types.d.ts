export interface QuestionType {
    id: number
    question: string
    code: string
    answers: string[]
    correctAnswer: number
    userSelectedAnswer?: number
    isCorrectUserAnswer?: boolean
}

export interface QuestionStore {
    question: QuestionType[],
    loading: boolean,
    limit: number
    currentQuestion: number
    fetchQuestion: ( limit: number ) => Promise<void>
    userSelectAnswer: ( id: number, answerIndex: number ) => void
    goNextPage: () => void
    goPrevPage: () => void
    setLoading: () => void
    reset: () => void
}