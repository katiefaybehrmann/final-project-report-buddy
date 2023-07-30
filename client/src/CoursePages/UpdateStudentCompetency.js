import React, { useState } from "react";
import { Slider, Box, Button, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, } from "@chakra-ui/react";
import { FormField, Input, Error } from "../styling/styled-components";

function UpdateStudentCompetency({ comp, onUpdateComp }) {
    const [notes, setNotes] = useState(comp.notes)
    const [mastery, setMastery] = useState(comp.mastery)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/competencies/${comp.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "notes": notes,
                "mastery": mastery
            })
        })
        .then((r) => {
        if (r.ok) {
            r.json()
            .then((updatedComp) => {
                console.log(updatedComp)
                onUpdateComp(updatedComp)});
            }
          else {
            r.json().then((err) => setErrors(err.errors));
          }})
    }

    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormField>
                    <Input
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </FormField>
                <FormField>
                    <Box pt={6} pb={2}>
                        <Slider aria-label='slider-ex-6' onChange={(val) => setMastery(val)}>
                            <SliderMark value={50}>
                                50
                            </SliderMark>
                            <SliderMark value={75} >
                                75
                            </SliderMark>
                            <SliderMark value={100} >
                                100
                            </SliderMark>
                            <SliderMark
                                value={mastery}
                                textAlign='center'
                                bg='blue.500'
                                color='white'
                                mt='-10'
                                ml='-5'
                                w='12'
                            >
                                {mastery}
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Box>
                </FormField>
                <FormField>
                    {errors.map((err) => (
                        <Error key={err}>{err}</Error>
                    ))
                    }
                </FormField>
                <FormField>
                    <Button type="submit">
                        Submit
                    </Button>
                </FormField>
            </form>
        </div>
    )
}

export default UpdateStudentCompetency;