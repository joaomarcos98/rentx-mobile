import React from 'react';

import * as Styled from './styles';


type ButtonProps = {
    title: string;
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