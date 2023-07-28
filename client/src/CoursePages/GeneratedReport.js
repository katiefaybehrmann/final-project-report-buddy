import React, { useState } from "react";
import { Flex, Stack, Heading, Text, Button } from "@chakra-ui/react";
import { FormField, Input, Label, Error, StyledButton } from "../styling/styled-components";

function GeneratedReport({ displayedReport, handleUpdateGeneratedReports }) {
    const [reportText, setReportText] = useState(displayedReport.text)
    const [isEditing, setIsEditing] = useState(false)

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
                    r.json().then((err) => console.log(err));
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
                                id="text"
                                autoComplete="off"
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                            />
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
                <Button onClick={() => setIsEditing((isEditing) => !isEditing)}>
                    <span aria-label="edit">
                        Edit Report
                    </span>
                </Button>
            </div>
        )}
        
        </div>
    )
}

export default GeneratedReport;