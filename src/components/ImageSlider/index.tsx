import React, { useRef, useState } from 'react';
import { FlatList, ListViewBase, ViewToken } from 'react-native';

import * as Styled from './styles';


type ImageSliderProps = {
    imagesUrl: string[];
}

type ChangeImageProps = {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export const ImageSlider = ({ imagesUrl }: ImageSliderProps) => {

    const [imageIndex, setImageIndex] = useState(0);

    const indexChanged = useRef((info: ChangeImageProps) => {
        const index = info.viewableItems[0].index!;

        setImageIndex(index)
    })

    return (
        <Styled.Container>
            <Styled.ImageIndexes>
                {
                    imagesUrl.map((_, index) => (
                        <Styled.ImageIndex
                            key={index}
                            active={index === imageIndex}
                        />
                    ))
                }

            </Styled.ImageIndexes>


            <FlatList
                data={imagesUrl}
                keyExtractor={key => key}
                horizontal
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={indexChanged.current}
                renderItem={({ item }) => (
                    <Styled.Content>
                        <Styled.CarImage
                            source={{ uri: item }}
                            resizeMode="contain"
                        />
                    </Styled.Content>
                )}
            />

        </Styled.Container>
    );
} 