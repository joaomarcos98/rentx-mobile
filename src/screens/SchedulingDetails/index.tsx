/** @name Style */
import * as Styled from './styles';
/** @name Dependencies */
import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
/** @name Components */
import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';
import { CarDTO } from '../../dto/CarDTO';
import { getAccessoriesIcons } from '../../utils/getAccessoriesIcon';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';


type Params = {
    car: CarDTO;
    dates: string[]
}

type RentalPeriod = {
    start: string;
    end: string
}

type SchedulingDetailsScreenRouteProp = StackNavigationProp<RootStackParamList, 'SchedulingDetails'>;

export const SchedulingDetails = () => {

    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const [isLoading, setIsLoading] = useState(false);

    const { navigate, goBack } = useNavigation<SchedulingDetailsScreenRouteProp>();

    const handleConfirmRental = async () => {

        setIsLoading(true)

        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates
        ];

        await api.post(`/schedules_byuser`, {
            user_id: 1,
            car,
            startDate: rentalPeriod.start,
            endDate: rentalPeriod.end
        })

        await api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
            .then(() => navigate("SchedulingComplete"))
            .catch(() => {
                Alert.alert("Não foi possivel agendar")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const { params } = useRoute();

    const { car, dates } = params as Params;

    const rentalTotal = Number(dates.length * car.rent.price);

    const handleBack = () => {
        goBack();
    }

    const theme = useTheme();

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])), "dd/MM/yyyy")
        })
    }, [])

    return (
        <Styled.Container>
            <Styled.Header>
                <BackButton
                    onPress={handleBack}
                />
            </Styled.Header>

            <Styled.CarImages>
                <ImageSlider
                    imagesUrl={car.photos}
                />
            </Styled.CarImages>

            <Styled.Content>
                <Styled.Details>

                    <Styled.Description>
                        <Styled.Brand>{car.brand}</Styled.Brand>
                        <Styled.Name>{car.name}</Styled.Name>
                    </Styled.Description>

                    <Styled.Rent>
                        <Styled.Period>{car.rent.period}</Styled.Period>
                        <Styled.Price>{car.rent.price}</Styled.Price>
                    </Styled.Rent>

                </Styled.Details>

                <Styled.Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoriesIcons(accessory.type)}
                            />
                        ))
                    }

                </Styled.Accessories>

                <Styled.RentalPeriod>
                    <Styled.CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </Styled.CalendarIcon>

                    <Styled.DateInfo>
                        <Styled.DateTitle>
                            DE
                        </Styled.DateTitle>
                        <Styled.DateValue>
                            {rentalPeriod.start}
                        </Styled.DateValue>
                    </Styled.DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <Styled.DateInfo>
                        <Styled.DateTitle>
                            ATÉ
                        </Styled.DateTitle>
                        <Styled.DateValue>
                            {rentalPeriod.end}
                        </Styled.DateValue>
                    </Styled.DateInfo>

                </Styled.RentalPeriod>

                <Styled.RentalPrice>
                    <Styled.RentalPriceLabel>
                        TOTAL
                    </Styled.RentalPriceLabel>
                    <Styled.RentalPriceDetails>
                        <Styled.RentalPriceQuota>
                            {`R$ ${car.rent.price} x ${dates.length} diárias`}
                        </Styled.RentalPriceQuota>
                        <Styled.RentalPriceTotal>
                            R$ {rentalTotal}
                        </Styled.RentalPriceTotal>
                    </Styled.RentalPriceDetails>
                </Styled.RentalPrice>
            </Styled.Content>

            <Styled.Footer>
                <Button
                    title="Confirmar"
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                    isLoading={isLoading}
                    enabled={!isLoading}
                    style={{ opacity: isLoading ? .5 : 1 }}
                />
            </Styled.Footer>

        </Styled.Container>
    );
}