import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react"
import { StatusBar } from "react-native";
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";
import { RootStackParamList } from "../../routes/types";

import * as Styled from "./styles"


type SplashScreenRouteProp = StackNavigationProp<RootStackParamList, 'Splash'>;

export const Splash = () => {

    const { navigate } = useNavigation<SplashScreenRouteProp>();

    const splashAnimation = useSharedValue(0);

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value,
                [0, 25, 50],
                [1, .3, 0],
            ),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [0, -50],
                        Extrapolate.CLAMP)
                }
            ]
        }
    });

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value,
                [0, 25, 50],
                [0, .3, 1],

            ),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [-50, 0],
                        Extrapolate.CLAMP)
                }
            ]
        }
    });

    const startApp = () => {
        navigate("Home");
    }

    useEffect(() => {
        splashAnimation.value = withTiming(
            50,
            { duration: 3000 },
            () => {
                "worklet"
                runOnJS(startApp)();
            }
        )
    }, [])

    return (
        <Styled.Container>
            <StatusBar barStyle="light-content" />
            <Animated.View style={[brandStyle, { position: "absolute" }]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={[logoStyle, { position: "absolute" }]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>

        </Styled.Container>
    )
}