import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import GasolineSvg from "../../assets/gasoline.svg";

import * as Styled from './styles';


type CarData = {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    },
    thumbnail: string;
}

interface CarCardProps extends RectButtonProps {
    data: CarData
}

export const CarCard = ({ data, ...rest }: CarCardProps) => {
    return (
        <Styled.Container {...rest}>
            <Styled.Details>
                <Styled.Brand>
                    {data.brand}
                </Styled.Brand>
                <Styled.Name>
                    {data.name}
                </Styled.Name>

                <Styled.About>
                    <Styled.Rent>
                        <Styled.Period>
                            {data.rent.period}
                        </Styled.Period>
                        <Styled.Price>{`R$ ${data.rent.price}`}</Styled.Price>
                    </Styled.Rent>

                    <Styled.Type>
                        <GasolineSvg />
                    </Styled.Type>
                </Styled.About>
            </Styled.Details>

            <Styled.CarImage source={{ uri: data.thumbnail }}
                resizeMode="contain"
            />
        </Styled.Container>
    );
}

