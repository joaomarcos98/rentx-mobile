import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { StackNavigationProp } from '@react-navigation/stack';
import { format } from 'date-fns';
import { Alert, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import ArrowSvg from "../../assets/arrow.svg"

import * as Styled from './styles';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import { RootStackParamList } from '../../routes/types';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dto/CarDTO';


interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

type Params = {
    car: CarDTO
}


type SchedulingScreenRouteProp = StackNavigationProp<RootStackParamList, 'Scheduling'>;

export const Scheduling = () => {

    const [markedDates, setMarkedDates] = useState({} as MarkedDateProps);
    const [lastSelectedDate, setLastSelectedDate] = useState({} as DayProps);
    const [rentalPeriod, setRentalPeriod] = useState({} as RentalPeriod);

    const { params } = useRoute();

    const { car } = params as Params;

    const { navigate, goBack } = useNavigation<SchedulingScreenRouteProp>()

    const theme = useTheme();

    const handleConfirmRental = () => {
        navigate("SchedulingDetails", {
            car,
            dates: Object.keys(markedDates)
        })
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

        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), "dd/MM/yyyy"),
            endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy")
        })
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
                            selected={!!rentalPeriod.startFormatted}
                        >{rentalPeriod.startFormatted} </Styled.DateValue>
                    </Styled.DateInfo>

                    <ArrowSvg />

                    <Styled.DateInfo>
                        <Styled.DateTitle>ATÉ</Styled.DateTitle>
                        <Styled.DateValue
                            selected={!!rentalPeriod.endFormatted}
                        >{rentalPeriod.endFormatted}</Styled.DateValue>
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
                <Button
                    title="Confirmar"
                    onPress={handleConfirmRental}
                    enabled={!!rentalPeriod.startFormatted}
                    style={{ opacity: !!rentalPeriod.startFormatted ? 1 : 0.5 }}
                />
            </Styled.Footer>

        </Styled.Container >
    );
}