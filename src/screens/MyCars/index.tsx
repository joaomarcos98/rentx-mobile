import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { CarCard } from "../../components/CarCard";
import { CarDTO } from "../../dto/CarDTO";
import { RootStackParamList } from "../../routes/types";
import { api } from "../../services/api";
import * as Styled from "./styles";


type MyCarsScreenRouteProp = StackNavigationProp<RootStackParamList, 'MyCars'>;

type CarProps = {
    car: CarDTO
}


export const MyCars = () => {

    const [cars, setCars] = useState<CarProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { navigate, goBack } = useNavigation<MyCarsScreenRouteProp>();

    const theme = useTheme();


    const handleBack = () => {
        goBack();
    };

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get("/schedules_byuser?user_id=1`");
                setCars(response.data)
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false)
            }
        }
        fetchCars()
    }, [])

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

            </Styled.Header>

            <Styled.Content>
                <Styled.Appointments>
                    <Styled.AppointmentTitle>Agendamentos feitos</Styled.AppointmentTitle>
                    <Styled.AppointmentQuantity>09</Styled.AppointmentQuantity>
                </Styled.Appointments>

                <FlatList
                    data={cars}
                    keyExtractor={({ car }) => car.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <CarCard data={item.car} />}
                />
            </Styled.Content>
        </Styled.Container>
    )
}