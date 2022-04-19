import React from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import * as Styled from './styles';
import { useTheme } from 'styled-components';


interface BackButtonProps extends BorderlessButtonProps {
    color?: string
}

export const BackButton = ({ color, ...rest }: BackButtonProps) => {

    const theme = useTheme();

    return (
        <Styled.Container {...rest}>
            <MaterialIcons
                name="chevron-left"
                size={24}
                color={color ? color : theme.colors.text}
            />

        </Styled.Container>
    );
}