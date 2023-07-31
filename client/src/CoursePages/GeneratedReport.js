import React, { useState } from "react";
import { Flex, Stack, Text, Button } from "@chakra-ui/react";
import { FormField, Error, StyledButton } from "../styling/styled-components";

function GeneratedReport({ displayedReport, handleUpdateGeneratedReports }) {
    const [reportText, setReportText] = useState(displayedReport.text)
    const [isEditing, setIsEditing] = useState(false)
    const [errors, setErrors] = useState([]); 

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/reports/${displayedReport.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "text": reportText
            })
        })
            .then((r) => {
                if (r.ok) {
                    r.json()
                        .then((updatedReport) => {
                            handleUpdateGeneratedReports(updatedReport)
                            setIsEditing(false)
                        });
                }
                else {
                    r.json().then((err) => setErrors(err.errors));
                }
            })
    }

    const handleDeleteText = (e) => {
        e.preventDefault()
        fetch(`/reports/${displayedReport.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "text": null
            })
        })
            .then((r) => {
                if (r.ok) {
                    r.json()
                        .then((updatedReport) => {
                            handleUpdateGeneratedReports(updatedReport)
                        });
                }
                else {
                    r.json().then((err) => setErrors(err));
                }
            })
    }


    return (
        <div>
        {isEditing ? (
            <Stack direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <form onSubmit={handleSubmit}>
                        <FormField>
                            <textarea
                                type="textarea"
                                rows="5" 
                                cols="60"
                                id="text"
                                autoComplete="off"
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            {errors.map((err) => (
                                <Error key={err}>{err}</Error>
                            ))
                            }
                        </FormField>
                        <StyledButton type="submit">
                            Update Report
                        </StyledButton>
                    </form>
                </Stack>
            </Flex>
        </Stack>
        ) : (
            <div>
                <Text pt='2' fontSize='sm'>{displayedReport.text}</Text>
                <Button margin={"10px"} onClick={() => setIsEditing((isEditing) => !isEditing)}>
                    <span aria-label="edit">
                        Edit Report
                    </span>
                </Button>
                <Button margin={"10px"} onClick={handleDeleteText}>
                    Delete Report
                </Button>
            </div>
        )}
        
        </div>
    )
}

export default GeneratedReport;