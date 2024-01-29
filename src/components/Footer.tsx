import { Button, Icon, Stack } from "@mui/material"
import { useQuestionStore } from "../store/questions"
import useQueryData from "../hooks/useQueryData"


const Footer = () => {
    const reset = useQuestionStore( state => state.reset)
    const { correct, incorrect, unanswerd } = useQueryData()
  return (
    <Stack justifyContent={"center"} direction={"column"} gap={2} alignItems={"center"} margin={4}>
        <strong>Correct: ✅ {correct} | Incorrect: ⛔ {incorrect} | Unanswerd: ❓ {unanswerd}</strong>
       <Button variant="outlined" startIcon={<Icon>restart_alt</Icon>} sx={{marginTop: '1rem', width: '50%'}} onClick={reset}>Reset</Button>
    </Stack>
  )
}

export default Footer
