import React from 'react';
import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import * as Styled from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dto/CarDTO';
import { getAccessoriesIcons } from '../../utils/getAccessoriesIcon';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';


type CarDetailsScreenRouteProp = StackNavigationProp<RootStackParamList, 'CarDetails'>;

type Params = {
    car: CarDTO
}

export const CarDetails = () => {

    const { navigate, goBack } = useNavigation<CarDetailsScreenRouteProp>();
    const { params } = useRoute();

    const theme = useTheme();

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y
        console.log(event.contentOffset.y);
    })

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 80],
                Extrapolate.CLAMP
            )
        }
    });

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0]
            )
        }
    })

    const { car } = params as Params;

    const handleConfirmRental = () => {
        navigate("Scheduling", { car })
    }

    const handleGoBack = () => {
        console.log("lala");
        
        goBack()
    }



    return (
        <Styled.Container>
            <StatusBar
                barStyle='dark-content'
                translucent
                backgroundColor="transparent"
            />

            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary }]}
            >
                <Styled.Header>
                    <BackButton
                        onPress={handleGoBack}
                        style={styles.back}
                    />
                </Styled.Header>

                <Animated.View
                    style={sliderCarsStyleAnimation}
                >
                    <Styled.CarImages>
                        <ImageSlider
                            imagesUrl={car.photos}
                        />
                    </Styled.CarImages>
                </Animated.View>
            </Animated.View>


            <Animated.ScrollView
                contentContainerStyle={{
                    padding: 24,
                    alignItems: "center",
                    paddingTop: 160
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Styled.Details>

                    <Styled.Description>
                        <Styled.Brand>{car.brand}</Styled.Brand>
                        <Styled.Name>{car.name}</Styled.Name>
                    </Styled.Description>

                    <Styled.Rent>
                        <Styled.Period>{car.rent.period}</Styled.Period>
                        <Styled.Price>R$ {car.rent.price}</Styled.Price>
                    </Styled.Rent>

                </Styled.Details>

                <Styled.Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoriesIcons(accessory.type)}
                            />
                        ))
                    }
                </Styled.Accessories>

                <Styled.About>
                    {car.about}
                </Styled.About>

            </Animated.ScrollView>

            <Styled.Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
            </Styled.Footer>

        </Styled.Container>
    );
}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        overflow: "hidden",
        zIndex: 1
    },
    back: {
        marginTop: 24,
        zIndex: 2
    }
})