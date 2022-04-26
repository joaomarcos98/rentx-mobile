import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';

import ArrowSvg from "../../assets/arrow.svg"

import * as Styled from './styles';
import { StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';
import { generateInterval } from '../../components/Calendar/generateInterval';


type SchedulingScreenRouteProp = StackNavigationProp<RootStackParamList, 'Scheduling'>;

export const Scheduling = () => {

    const [markedDates, setMarkedDates] = useState({} as MarkedDateProps);
    const [lastSelectedDate, setLastSelectedDate] = useState({} as DayProps);

    const { navigate, goBack } = useNavigation<SchedulingScreenRouteProp>()

    const theme = useTheme();

    const handleConfirmRental = () => {
        navigate("SchedulingDetails")
    };

    const handleBack = () => {
        goBack();
    };

    const handleChangeDate = (day: DayProps) => {
        let start = !lastSelectedDate.timestamp ? day : lastSelectedDate;
        let end = day;

        if (start.timestamp > end.timestamp) {
            start = end
            end = start
        }

        setLastSelectedDate(end);

        const interval = generateInterval(start, end);

        setMarkedDates(interval)
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
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Styled.Content>

            <Styled.Footer>
                <Button title="Confirmar" onPress={handleConfirmRental} />
            </Styled.Footer>

        </Styled.Container >
    );
}