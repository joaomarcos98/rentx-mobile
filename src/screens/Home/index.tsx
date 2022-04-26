import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StatusBar } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from "../../assets/logo.svg";
import { CarCard } from '../../components/CarCard';
import { Loading } from '../../components/Loading';
import { CarDTO } from '../../dto/CarDTO';
import { RootStackParamList } from "../../routes/types"
import { api } from '../../services/api';

import * as Styled from './styles';


type HomeScreenRouteProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const Home = () => {

    const [cars, setCars] = useState<CarDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { navigate } = useNavigation<HomeScreenRouteProp>()

    const carData = {
        brand: "Porsche",
        name: "Panamera",
        rent: {
            period: "Ao dia",
            price: 340
        },
        thumbnail: "https://pngkit.com/png/full/237-2375888_porsche-panamera-s.png"
    }

    const handleCarDetails = () => {
        navigate("CarDetails")
    }

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get("/cars")
                setCars(response.data)
                console.log(response);
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
                            <CarCard data={item} onPress={handleCarDetails} />
                        }
                    />
            }

        </Styled.Container>
    );
}