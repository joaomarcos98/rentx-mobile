import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { CarDTO } from '../../dto/CarDTO';
import { getAccessoriesIcons } from '../../utils/getAccessoriesIcon';

import * as Styled from './styles';

interface CarCardProps extends RectButtonProps {
    data: CarDTO
}

export const CarCard = ({ data, ...rest }: CarCardProps) => {

    const MotorIcon = getAccessoriesIcons(data.fuel_type)

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
                        <MotorIcon />
                    </Styled.Type>
                </Styled.About>
            </Styled.Details>

            <Styled.CarImage source={{ uri: data.thumbnail }}
                resizeMode="contain"
            />
        </Styled.Container>
    );
}

