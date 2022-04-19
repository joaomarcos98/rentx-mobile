import React from 'react';

import * as Styled from './styles';


type ImageSliderProps = {
    imagesUrl: string[];
}

export const ImageSlider = ({ imagesUrl }: ImageSliderProps) => {
    return (
        <Styled.Container>
            <Styled.ImageIndexes>
                <Styled.ImageIndex active />
                <Styled.ImageIndex active={false} />
                <Styled.ImageIndex active={false} />
                <Styled.ImageIndex active={false} />
            </Styled.ImageIndexes>

            <Styled.Content>
                <Styled.CarImage
                    source={{ uri: imagesUrl[0] }}
                    resizeMode="contain"
                />
            </Styled.Content>
        </Styled.Container>
    );
} 