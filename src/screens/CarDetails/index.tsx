import React from 'react';
import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedSvg from "../../assets/speed.svg"
import accelerationSvg from "../../assets/acceleration.svg"
import force from "../../assets/force.svg"
import gasolineSvg from "../../assets/gasoline.svg"
import exchangeSvg from "../../assets/exchange.svg"
import peopleSvg from "../../assets/people.svg"

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

                <Styled.Accessories>
                    <Accessory name="380Km/h" icon={speedSvg} />
                    <Accessory name="3.2s" icon={accelerationSvg} />
                    <Accessory name="800 HP" icon={force} />
                    <Accessory name="Gasolina" icon={gasolineSvg} />
                    <Accessory name="auto" icon={exchangeSvg} />
                    <Accessory name="2 pessoas" icon={peopleSvg} />
                </Styled.Accessories>

                <Styled.About>
                    Carrin bacana do meccheferson doidera maravilhosa opa fion n sei oq mas ta otimo revoada do tubarão
                </Styled.About>

            </Styled.Content>

                <Styled.Footer>
                    <Button title="Confirmar"/>
                </Styled.Footer>

        </Styled.Container>
    );
}