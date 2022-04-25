import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as Styled from './styles';


interface ButtonProps extends RectButtonProps {
    title: string;
    color?: string;
}

export const Button = ({
    title,
    ...rest
}: ButtonProps) => {
    return (
        <Styled.Container {...rest}>
            <Styled.Title>{title}</Styled.Title>
        </Styled.Container>
    );
}