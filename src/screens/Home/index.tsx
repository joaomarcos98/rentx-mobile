import React from 'react';
import { StatusBar } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from "../../assets/logo.svg";
import { CarCard } from '../../components/CarCard';

import * as Styled from './styles';

export const Home = () => {

    const carData = {
        brand: "Porsche",
        name: "Panamera",
        rent: {
            period: "Ao dia",
            price: 340
        },
        thumbnail: "https://pngkit.com/png/full/237-2375888_porsche-panamera-s.png"
    }

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

            <Styled.CarList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => <CarCard data={carData} />}
            />


            {/* <CarCard data={carData} /> */}

        </Styled.Container>
    );
}