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


type CarDetailsScreenRouteProp = StackNavigationProp<RootStackParamList, 'CarDetails'>;

type Params = {
    car: CarDTO
}

export const CarDetails = () => {

    const { navigate, goBack } = useNavigation<CarDetailsScreenRouteProp>();
    const { params } = useRoute();

    const { car } = params as Params;

    const handleConfirmRental = () => {
        navigate("Scheduling")
    }

    const handleGoBack = () => {
        goBack()
    }


    return (
        <Styled.Container>
            <Styled.Header>
                <BackButton
                    onPress={handleGoBack}
                />
            </Styled.Header>

            <Styled.CarImages>
                <ImageSlider
                    imagesUrl={car.photos}
                />
            </Styled.CarImages>

            <Styled.Content>
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

            </Styled.Content>

            <Styled.Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
            </Styled.Footer>

        </Styled.Container>
    );
}