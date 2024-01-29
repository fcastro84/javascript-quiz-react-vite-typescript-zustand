import { Button, Divider, FormControl, FormControlLabel, FormLabel, Icon, Radio, RadioGroup, Stack } from "@mui/material"
import { FormEvent } from "react"
import { useQuestionStore } from "../store/questions"



const Start = () => {

    const fetchQuestion = useQuestionStore( state => state.fetchQuestion)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData( event.currentTarget )
        const limit = Number(formData.get('radio-buttons-group')?.toString()) 
        fetchQuestion(limit)
    }
  return (
    <Stack sx={{marginTop: '2rem'}}>
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Number of Questions</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="5"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                    <FormControlLabel value="10" control={<Radio />} label="10" />
                    <FormControlLabel value="15" control={<Radio />} label="15" />
                </RadioGroup>
            </FormControl>
            <Divider sx={{marginTop: '2rem'}}/>
            <Button variant="outlined" startIcon={<Icon>play_arrow</Icon>} sx={{marginTop: '2rem'}} type="submit">Start</Button>

        </form>
      
    </Stack>
  )
}

export default Start
