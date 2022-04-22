import React from 'react';
import { useWindowDimensions } from "react-native";

import DoneSvg from "../../assets/done.svg";
import LogoSvg from "../../assets/logo_background_gray.svg";
import { ConfirmButton } from '../../components/ConfirmButton';

import * as Styled from './styles';

export const SchedulingComplete = () => {

    const { width } = useWindowDimensions()

    return (
        <Styled.Container>
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
                <ConfirmButton title="OK" onPress={()=> console.log("opas")
                }/>
            </Styled.Footer>

        </Styled.Container>
    );
}