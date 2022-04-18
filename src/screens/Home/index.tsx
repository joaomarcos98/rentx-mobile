import React from 'react';
import { StatusBar } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from "../../assets/logo.svg";

import * as Styled from './styles';

export const Home = () => {
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

        </Styled.Container>
    );
}