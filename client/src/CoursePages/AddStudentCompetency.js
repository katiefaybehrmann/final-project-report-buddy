import React, { useState } from "react";
import { Slider, Box, Button, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, } from "@chakra-ui/react";
import { FormField, Input, Error } from "../styling/styled-components";

function AddStudentCompetency({ displayedReport, setIsAdding, reports, setReports, cc }) {
    const [notes, setNotes] = useState("")
    const [mastery, setMastery] = useState(50)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/competencies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "notes": notes,
                "mastery": mastery,
                "competency_category_id": cc.id,
                "report_id": displayedReport.id
            })
        })
            .then((r) => {
                if (r.ok) {
                    r.json()
                        .then((newComp) => {
                            console.log(newComp)
                            handleAddStudentComp(newComp)
                        });
                }
                else {
                    r.json().then((err) => setErrors(err.errors));
                }
            })
    }

    const handleAddStudentComp = (newComp) => {
        const updatedComps = [...displayedReport.competencies, newComp]
        const updatedReport = { ...displayedReport, competencies: updatedComps }
        const updatedReports = reports.map(r => r.id == updatedReport.id ? updatedReport : r)
        setReports(updatedReports)
        setIsAdding(false)
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

export default AddStudentCompetency;