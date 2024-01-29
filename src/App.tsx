

import { Container, Typography } from '@mui/material'
import './App.css'
import { useQuestionStore } from './store/questions'
import Start from './components/Start'
import Questions from './components/Questions'
import useQueryData from './hooks/useQueryData'
import Results from './components/Results'

function App() {
  const question = useQuestionStore( state => state.question)
  const {unanswerd} = useQueryData()


  return (
    <Container>
      <Typography variant='h3'>Javascript Quiz</Typography>
      {question.length === 0 && <Start/>}
      {(question.length > 0 && unanswerd > 0) && <Questions/>}
      {(question.length > 0 && unanswerd === 0) && <Results/>}
      
    </Container>
  )
}

export default App
