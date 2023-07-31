import React, { useContext } from "react";
import { UserContext } from "./Context";
import {
    Box,
    Button,
    Stack,
    chakra
} from '@chakra-ui/react'
import { Link } from "react-router-dom";


function Home({ reports }) {
    const { user } = useContext(UserContext);
    const reportsLeft = reports.filter(r => r.text == null).length

    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1 textAlign={'center'} fontFamily={"Karla Normal"} fontSize={'4xl'} py={10} fontWeight={'bold'}>
                Welcome, {user.username}!

            </chakra.h1>
            {reportsLeft > 0 ? (
                <Stack spacing={"4"}>
                    <chakra.h2 textAlign={'center'} fontFamily={"Karla Normal"}>
                        You have {reportsLeft} reports left to complete!
                    </chakra.h2>
                    <Button as={Link} to="/courses">
                        Click here to complete!
                    </Button>
                </Stack>
            ) : (
                <chakra.h2 textAlign={'center'} fontFamily={"Karla Normal"}>
                    You have {reportsLeft} reports left to do!
                </chakra.h2>
            )}
        </Box>
    )
}

export default Home;