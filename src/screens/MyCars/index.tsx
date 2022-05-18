import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { CarCard } from "../../components/CarCard";
import { CarDTO } from "../../dto/CarDTO";
import { RootStackParamList } from "../../routes/types";
import { AntDesign } from "@expo/vector-icons"
import { api } from "../../services/api";
import * as Styled from "./styles";
import { LoadAnimation } from "../../components/LoadAnimation";


type MyCarsScreenRouteProp = StackNavigationProp<RootStackParamList, 'MyCars'>;

type CarProps = {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}


export const MyCars = () => {

    const [cars, setCars] = useState<CarProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { navigate, goBack } = useNavigation<MyCarsScreenRouteProp>();

    const theme = useTheme();

    console.log(cars);


    const handleBack = () => {
        goBack();
    };

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get("/schedules_byuser?user_id=1");
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

            {
                isLoading
                    ? <LoadAnimation />
                    : <Styled.Content>
                        <Styled.Appointments>
                            <Styled.AppointmentTitle>Agendamentos feitos</Styled.AppointmentTitle>
                            <Styled.AppointmentQuantity>{cars.length}</Styled.AppointmentQuantity>
                        </Styled.Appointments>

                        <FlatList
                            data={cars}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Styled.CarContent>
                                    <CarCard data={item.car} />
                                    <Styled.CarFooter>
                                        <Styled.CarFooterTitle>Período</Styled.CarFooterTitle>
                                        <Styled.CarFooterPeriod>
                                            <Styled.CarFooterDate>{item.startDate}</Styled.CarFooterDate>
                                            <AntDesign
                                                name="arrowright"
                                                size={20}
                                                color={theme.colors.title}
                                                style={{ marginHorizontal: 10 }}
                                            />
                                            <Styled.CarFooterDate>{item.endDate}</Styled.CarFooterDate>
                                        </Styled.CarFooterPeriod>
                                    </Styled.CarFooter>
                                </Styled.CarContent>
                            )}
                        />
                    </Styled.Content>
            }


        </Styled.Container>
    )
}