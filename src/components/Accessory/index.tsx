import React from 'react';
import { SvgProps } from 'react-native-svg';

import * as Styled from './styles';


type AccessoryProps = {
    name: string;
    icon: React.FC<SvgProps>
}

export const Accessory = ({
    name,
    icon: Icon
}: AccessoryProps) => {
    return (
        <Styled.Container>
            <Icon width={32} height={32} />
            <Styled.Name>{name}</Styled.Name>
        </Styled.Container>
    );
}