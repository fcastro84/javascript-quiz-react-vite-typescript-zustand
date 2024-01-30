

import { Box, CircularProgress, Container, Stack, Typography, Divider } from '@mui/material';
import './App.css'
import { useQuestionStore } from './store/questions'
import Start from './components/Start'
import Questions from './components/Questions'
import useQueryData from './hooks/useQueryData'
import Results from './components/Results'

function App() {
  const question = useQuestionStore( state => state.question)
  const loading = useQuestionStore( state => state.loading)
  const {unanswerd} = useQueryData()


  return (
    <Container>
        <Box
        sx={{ width: '100%', marginBottom: '2rem' }}
        role="presentation"
      >
        <Typography variant='h4'>JavaScript Quiz Apps: (React + TypeScript + Material UI + Zustand + Confetti)</Typography>
        <Typography variant='subtitle2'>The repository code can be found at the following link: <a href="https://github.com/fcastro84/javascript-quiz-react-vite-typescript-zustand" target='_blank' className='text-blue-700 font-bold'>Here</a></Typography>
      </Box>
      <Divider sx={{marginBottom: '2rem' }}/>
      <Typography variant='h5'>Javascript Quiz</Typography>
      {(question.length === 0 && !loading) && <Start/>}
      {loading && ( <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" justifyContent={'center'}>
                      <CircularProgress color="secondary" />
                      <CircularProgress color="success" />
                      <CircularProgress color="inherit" />
                    </Stack>)
      }
      {(question.length > 0 && unanswerd > 0) && <Questions/>}
      {(question.length > 0 && unanswerd === 0) && <Results/>}
      
    </Container>
  )
}

export default App
