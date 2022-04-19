import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import * as Styled from './styles';

export const CarDetails = () => {
    return (
        <Styled.Container>
            <Styled.Header>
                <BackButton
                    onPress={() => { }}
                />
            </Styled.Header>

            <Styled.CarImages>
                <ImageSlider
                    imagesUrl={[
                        "https://pngkit.com/png/full/237-2375888_porsche-panamera-s.png"
                    ]}
                />
            </Styled.CarImages>

            <Styled.Content>
                <Styled.Details>

                    <Styled.Description>
                        <Styled.Brand>Audi</Styled.Brand>
                        <Styled.Name>Rs 5</Styled.Name>
                    </Styled.Description>

                    <Styled.Rent>
                        <Styled.Period>Ao dia</Styled.Period>
                        <Styled.Price>R$ 500</Styled.Price>
                    </Styled.Rent>

                </Styled.Details>

                    <Styled.About>
                        Carrin bacana do meccheferson doidera maravilhosa opa fion n sei oq mas ta otimo revoada do tubarão
                    </Styled.About>


            </Styled.Content>

        </Styled.Container>
    );
}