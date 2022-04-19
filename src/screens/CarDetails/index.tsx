import React from 'react';
import { BackButton } from '../../components/BackButton';

import * as Styled from './styles';

export const CarDetails = () => {
    return (
        <Styled.Container>
            <Styled.Header>
                <BackButton
                    onPress={() => { }}
                />

            </Styled.Header>
        </Styled.Container>
    );
}