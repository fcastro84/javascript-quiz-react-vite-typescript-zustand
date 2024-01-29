import { Button, Card, CardActions, CardContent, CardHeader, Divider, Icon, Rating, Stack, Typography } from "@mui/material"
import useQueryData from "../hooks/useQueryData"
import { useQuestionStore } from "../store/questions"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

const calculateRating = ( value: number) => {
    switch (true) {
        case (value >= 0 && value < 21):
            return 0
            break;
        case (value >= 21 && value < 41):
            return 1
            break;
        case (value >= 41 && value < 60):
            return 2
            break;
        case (value >= 60 && value < 81):
            return 3
            break;
        case (value >= 81 && value < 94):
            return 4
            break;
        default:
            return 5
            break;
    }
}

const ConffetiResult = (value: number) => {
    if( value >= 60 ) confetti({
        particleCount: 150
      })
}


const Results = () => {
    const [value, setValue] = useState(0)

    const { correct, incorrect} = useQueryData()
    const limit = useQuestionStore( state => state.limit)
    const reset = useQuestionStore( state => state.reset)

    const result = Math.round((correct * 100) / limit) 

    useEffect(() => {
        setValue(calculateRating(result))
        ConffetiResult(result)
    }, [])

  return (
    <Card sx={{ maxWidth: '100%', bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4 }} variant="outlined">
                <CardHeader title={`Results: ${result}%`}>
                </CardHeader>
                <CardContent>
                    <Stack justifyContent={"center"} direction={"column"} gap={2} alignItems={"center"} margin={4}>
                    <Typography component="legend">{result >= 60 ? 'Congratulations...' : 'Continue studying...'}</Typography>
                    <Rating name="read-only" value={value} readOnly />
                        <strong>Correct: ✅ {correct}</strong>
                        <strong>Incorrect: ⛔ {incorrect}</strong>
                        <Divider></Divider>
                        <strong>Number of Questions: ⏩ {limit}</strong>
                    </Stack>              
                </CardContent>
                <CardActions>
                    <Button variant="outlined" startIcon={<Icon>restart_alt</Icon>} sx={{margin: '0 auto'}}  onClick={reset}>Reset</Button>
                </CardActions>
                
            </Card>
  )
}

export default Results
