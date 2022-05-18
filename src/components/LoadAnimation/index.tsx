import React from "react";

import LottieView from "lottie-react-native"

import loadingCar from "../../assets/carLoading.json";

import * as Styled from "./styles";

export const LoadAnimation = () => {
    return (
        <Styled.Container>
            <LottieView
                source={loadingCar}
                autoPlay
            />
        </Styled.Container>
    )
}