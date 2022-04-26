import React from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';

import ArrowSvg from "../../assets/arrow.svg"

import * as Styled from './styles';
import { StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';


type SchedulingScreenRouteProp = StackNavigationProp<RootStackParamList, 'Scheduling'>;


export const Scheduling = () => {

    const { navigate, goBack } = useNavigation<SchedulingScreenRouteProp>()

    const theme = useTheme()

    const handleConfirmRental = () => {
        navigate("SchedulingDetails")
    }

    const handleBack = () => {
        goBack();
    }

    return (
        <Styled.Container>
            <Styled.Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />

                <BackButton
                    color={theme.colors.shape}
                    onPress={handleBack}
                />

                <Styled.Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Styled.Title>

                <Styled.RentalPeriod>
                    <Styled.DateInfo>
                        <Styled.DateTitle>DE</Styled.DateTitle>
                        <Styled.DateValue
                            selected={false}
                        >18/06/2021 </Styled.DateValue>
                    </Styled.DateInfo>

                    <ArrowSvg />

                    <Styled.DateInfo>
                        <Styled.DateTitle>ATÉ</Styled.DateTitle>
                        <Styled.DateValue
                            selected={false}
                        >18/06/2021</Styled.DateValue>
                    </Styled.DateInfo>
                </Styled.RentalPeriod>

            </Styled.Header>

            <Styled.Content>
                <Calendar />
            </Styled.Content>

            <Styled.Footer>
                <Button title="Confirmar" onPress={handleConfirmRental} />
            </Styled.Footer>

        </Styled.Container >
    );
}