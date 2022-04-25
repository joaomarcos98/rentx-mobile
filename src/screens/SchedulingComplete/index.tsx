import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, useWindowDimensions } from "react-native";

import DoneSvg from "../../assets/done.svg";
import LogoSvg from "../../assets/logo_background_gray.svg";
import { ConfirmButton } from '../../components/ConfirmButton';
import { RootStackParamList } from '../../routes/types';

import * as Styled from './styles';


type SchedulingCompleteScreenRouteProp = StackNavigationProp<RootStackParamList, 'SchedulingComplete'>;

export const SchedulingComplete = () => {

    const { navigate } = useNavigation<SchedulingCompleteScreenRouteProp>();

    const handleConfirmRental = () => {
        navigate("Home")
    }


    const { width } = useWindowDimensions()

    return (
        <Styled.Container>
            <StatusBar
                barStyle='light-content'
                translucent
                backgroundColor="transparent"
            />
            <LogoSvg
                width={width}
            />

            <Styled.Content>
                <DoneSvg
                    width={80}
                    height={80}
                />
                <Styled.Title>
                    Carro Alugado!
                </Styled.Title>

                <Styled.Message>
                    Agora você só precisa ir {"\n"}
                    até a concessionária da RENTX {"\n"}
                    pegar seu automóvel.
                </Styled.Message>
            </Styled.Content>

            <Styled.Footer>
                <ConfirmButton title="OK" onPress={handleConfirmRental} />
            </Styled.Footer>

        </Styled.Container>
    );
}