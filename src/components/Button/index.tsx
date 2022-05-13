import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import * as Styled from './styles';


interface ButtonProps extends RectButtonProps {
    title: string;
    color?: string;
    isLoading?: boolean;
}

export const Button = ({
    title,
    isLoading = false,
    ...rest
}: ButtonProps) => {
    const theme = useTheme();
    return (
        <Styled.Container {...rest}>
            {
                isLoading
                    ? <ActivityIndicator color={theme.colors.shape} />
                    : <Styled.Title>{title}</Styled.Title>
            }
        </Styled.Container>
    );
}