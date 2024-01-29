import { Card, CardActions, CardContent, Icon, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"
import { useQuestionStore } from "../store/questions"
import { QuestionType } from "../types.d"
import SyntaxHighlighter  from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { getBackgroundColor } from "../helpers/getBackgroundColor"
import Footer from "./Footer"





const Question = ({info}: {info:QuestionType}) => {

    const userSelectAnswer = useQuestionStore( state => state.userSelectAnswer)

    const handleClick = ( index: number) => () => {
        userSelectAnswer( info.id, index)
    }
    
    return (
            <Card sx={{ maxWidth: '100%', bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4 }} variant="outlined">
                <CardContent>
                   <Typography variant="h5">{info.question}</Typography> 
                   <SyntaxHighlighter language='javascript' style={gradientDark}>
                        {info.code}
                    </SyntaxHighlighter>
                </CardContent>
                <CardActions>
                        <List sx={{ width: '100%', bgcolor: '#333' }} component="nav">
                            {
                                info.answers.map((answer, index) => (
                                    <ListItem disablePadding  divider key={index}>
                                        <ListItemButton
                                        disabled={info.userSelectedAnswer != null}
                                        onClick={handleClick(index)}
                                        sx={getBackgroundColor(info, index)}
                                        >
                                        { 
                                        (info.correctAnswer === index && info.userSelectedAnswer!=null)  
                                            ? (<ListItemIcon><Icon>check</Icon></ListItemIcon>) 
                                            :( info.userSelectedAnswer === index 
                                                ?  (<ListItemIcon><Icon>error</Icon></ListItemIcon>)
                                                : ''
                                            )
                                        }
                                        <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                            
                            
                        </List>

                </CardActions>
                
            </Card>
       
    )
}




const Questions = () => {
    const questions = useQuestionStore( state => state.question)
    const currentQuestion = useQuestionStore( state => state.currentQuestion)
    const goPrevPage = useQuestionStore( state => state.goPrevPage)
    const goNextPage = useQuestionStore( state => state.goNextPage)

    const questionCurrent = questions[currentQuestion]
  return (
    <>
    <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"}>
        <IconButton onClick={goPrevPage} disabled={ currentQuestion === 0}>
            <Icon>skip_previous</Icon>
        </IconButton>
        { currentQuestion + 1 } / { questions.length }
        <IconButton onClick={goNextPage} disabled={ currentQuestion >= questions.length -1}>
            <Icon>skip_next</Icon>
        </IconButton>
    </Stack>
    <Question info={questionCurrent} />
    <Footer />
      
    </>
  )
}

export default Questions
