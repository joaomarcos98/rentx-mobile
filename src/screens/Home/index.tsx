import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StatusBar } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from "@expo/vector-icons";

import Logo from "../../assets/logo.svg";
import { CarCard } from '../../components/CarCard';
import { Loading } from '../../components/Loading';
import { CarDTO } from '../../dto/CarDTO';
import { RootStackParamList } from "../../routes/types"
import { api } from '../../services/api';

import * as Styled from './styles';
import { useTheme } from 'styled-components';


type HomeScreenRouteProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const Home = () => {

    const [cars, setCars] = useState<CarDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { navigate } = useNavigation<HomeScreenRouteProp>()

    const handleCarDetails = (car: CarDTO) => {
        navigate("CarDetails", { car })
    };

    const handleOpenMyCars = () => {
        navigate("MyCars")
    }

    const theme = useTheme();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get("/cars")
                setCars(response.data)
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCars()
    }, [])

    return (
        <Styled.Container>
            <StatusBar
                barStyle='light-content'
                backgroundColor="transparent"
                translucent
            />
            <Styled.Header>
                <Styled.HeaderContent>
                    <Logo
                        height={RFValue(12)}
                        width={RFValue(108)}
                    />
                    <Styled.TotalCars>
                        Total de 12 Carros
                    </Styled.TotalCars>
                </Styled.HeaderContent>
            </Styled.Header>

            {
                isLoading
                    ? <Loading />
                    : <Styled.CarList
                        data={cars}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) =>
                            <CarCard data={item} onPress={() => handleCarDetails(item)} />
                        }
                    />
            }

            <Styled.MyCarsButton onPress={handleOpenMyCars}>
                <Ionicons
                    name="ios-car-sport"
                    size={32}
                    color={theme.colors.shape}
                />
            </Styled.MyCarsButton>

        </Styled.Container>
    );
}