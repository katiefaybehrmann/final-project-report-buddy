import React, { useState } from "react";
import { Progress, Text, Button } from "@chakra-ui/react";
import UpdateStudentCompetency from "./UpdateStudentCompetency";

function StudentCompetency({ displayedReport, cc, reports, setReports }) {
    const [isEditing, setIsEditing] = useState(false)
    const comp = displayedReport.competencies.find(c => c.competency_category_id === cc.id)
    
    const handleUpdateCompetency = (updatedComp) => {
        const updatedComps = displayedReport.competencies.map(comp => comp.id == updatedComp.id ? updatedComp : comp)
        const updatedReport = { ...displayedReport, competencies: updatedComps }
        const updatedReports = reports.map(r => r.id == updatedReport.id ? updatedReport : r)
        setReports(updatedReports)
        setIsEditing(false)
      }

    return (
        <div>

            {isEditing ? (
                <UpdateStudentCompetency comp={comp} onUpdateComp={handleUpdateCompetency}/>
            ) : (
                <div>
                    <Progress value={comp.mastery} />
                    <Text pt='2' fontSize='sm'>{comp.notes}</Text>
                    <Button onClick={() => setIsEditing((isEditing) => !isEditing)}>
                        <span aria-label="edit">
                            Update Student Progress
                        </span>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default StudentCompetency;