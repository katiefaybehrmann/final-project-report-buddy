import React from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Image
} from '@chakra-ui/react'
import { StyledButton } from "./styling/styled-components";
import reportBuddyLogin from './styling/assets/reportBuddyLogin.png'


function About() {
    return (
        <Container maxW={'7xl'}>
            <Stack
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: 'column', md: 'row' }}>
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                        <Text
                            as={'span'}
                            fontFamily={"Karla Normal"}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: '30%',
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: '#DEB55B',
                                zIndex: -1,
                            }}>
                            End of Semester Reports,
                        </Text>
                        <br />
                        <Text as={'span'} color={'#3F5B6C'} fontFamily={"Karla Normal"}>
                            in record time.
                        </Text>
                    </Heading>
                    <Text color={'#3F5B6C'} fontFamily={"Karla Normal"}>
                        As teachers, we have a lot to do.
                        Let Report Buddy take one thing off of your list.
                        Write end-of-semester reports in record time.
                    </Text>
                    <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
                        <StyledButton as={Link} to="/courses">
                            Get started
                        </StyledButton>
                    </Stack>
                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    w={'full'}>
                    <Box
                        opacity={'0.5'}
                        background={'var(--gradient-blue-to-green, linear-gradient(90deg, #3F5B6C 0%, #9AB4A8 100%))'}
                        position={'relative'}
                        height={'500px'}
                        rounded={'2xl'}
                        boxShadow={'2xl'}
                        width={'full'}
                        overflow={'hidden'}>
                        <Image
                            alt={'Hero Image'}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={'100%'}
                            src={reportBuddyLogin}
                        />
                    </Box>
                </Flex>
            </Stack>
        </Container>
    )
}

export default About;