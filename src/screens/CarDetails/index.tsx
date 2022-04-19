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
        </Styled.Container>
    );
}