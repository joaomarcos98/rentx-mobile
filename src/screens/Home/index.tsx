import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from "@expo/vector-icons";

import Logo from "../../assets/logo.svg";
import { CarCard } from '../../components/CarCard';
import { Loading } from '../../components/Loading';
import { CarDTO } from '../../dto/CarDTO';
import { RootStackParamList } from "../../routes/types"
import { api } from '../../services/api';

import * as Styled from './styles';
import { useTheme } from 'styled-components';

import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);


type HomeScreenRouteProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const Home = () => {

    const [cars, setCars] = useState<CarDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },
            ]
        }
    })

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        }
    });

    const { navigate } = useNavigation<HomeScreenRouteProp>()

    const handleCarDetails = (car: CarDTO) => {
        navigate("CarDetails", { car })
    };

    const handleOpenMyCars = () => {
        navigate("MyCars")
    }


    const theme = useTheme();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get("/cars")
                setCars(response.data)
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCars()
    }, [])

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => {
            return true
        })
    }, [])

    return (
        <Styled.Container>
            <StatusBar
                barStyle='light-content'
                backgroundColor="transparent"
                translucent
            />
            <Styled.Header>
                <Styled.HeaderContent>
                    <Logo
                        height={RFValue(12)}
                        width={RFValue(108)}
                    />
                    {   !isLoading &&
                        <Styled.TotalCars>
                            Total de {cars.length} Carros
                        </Styled.TotalCars>
                    }
                </Styled.HeaderContent>
            </Styled.Header>

            {
                isLoading
                    ? <Loading />
                    : <Styled.CarList
                        data={cars}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) =>
                            <CarCard data={item} onPress={() => handleCarDetails(item)} />
                        }
                    />
            }

            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: "absolute",
                            bottom: 13,
                            right: 22,
                        }
                    ]}
                >
                    <ButtonAnimated
                        onPress={handleOpenMyCars}
                        style={[styles.button, { backgroundColor: theme.colors.main }]}
                    >
                        <Ionicons
                            name="ios-car-sport"
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>

        </Styled.Container>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    }
})