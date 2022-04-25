/** @name Style */
import * as Styled from './styles';
/** @name Dependencies */
import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
/** @name Components */
import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
/** @name Svgs */
import speedSvg from "../../assets/speed.svg"
import accelerationSvg from "../../assets/acceleration.svg"
import force from "../../assets/force.svg"
import gasolineSvg from "../../assets/gasoline.svg"
import exchangeSvg from "../../assets/exchange.svg"
import peopleSvg from "../../assets/people.svg"
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';


type SchedulingDetailsScreenRouteProp = StackNavigationProp<RootStackParamList, 'SchedulingDetails'>;

export const SchedulingDetails = () => {

    const { navigate } = useNavigation<SchedulingDetailsScreenRouteProp>();

    const handleConfirmRental = () => {
        navigate("SchedulingComplete")
    }

    const theme = useTheme();

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

            <Styled.Content>
                <Styled.Details>

                    <Styled.Description>
                        <Styled.Brand>Audi</Styled.Brand>
                        <Styled.Name>Rs 5</Styled.Name>
                    </Styled.Description>

                    <Styled.Rent>
                        <Styled.Period>Ao dia</Styled.Period>
                        <Styled.Price>R$ 500</Styled.Price>
                    </Styled.Rent>

                </Styled.Details>

                <Styled.Accessories>
                    <Accessory name="380Km/h" icon={speedSvg} />
                    <Accessory name="3.2s" icon={accelerationSvg} />
                    <Accessory name="800 HP" icon={force} />
                    <Accessory name="Gasolina" icon={gasolineSvg} />
                    <Accessory name="auto" icon={exchangeSvg} />
                    <Accessory name="2 pessoas" icon={peopleSvg} />
                </Styled.Accessories>

                <Styled.RentalPeriod>
                    <Styled.CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </Styled.CalendarIcon>

                    <Styled.DateInfo>
                        <Styled.DateTitle>
                            DE
                        </Styled.DateTitle>
                        <Styled.DateValue>
                            18/04/2022
                        </Styled.DateValue>
                    </Styled.DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <Styled.DateInfo>
                        <Styled.DateTitle>
                            DE
                        </Styled.DateTitle>
                        <Styled.DateValue>
                            18/04/2022
                        </Styled.DateValue>
                    </Styled.DateInfo>

                </Styled.RentalPeriod>

                <Styled.RentalPrice>
                    <Styled.RentalPriceLabel>
                        TOTAL
                    </Styled.RentalPriceLabel>
                    <Styled.RentalPriceDetails>
                        <Styled.RentalPriceQuota>
                            R$ 580 x 3 diárias
                        </Styled.RentalPriceQuota>
                        <Styled.RentalPriceTotal>
                            R$ 2.900
                        </Styled.RentalPriceTotal>
                    </Styled.RentalPriceDetails>
                </Styled.RentalPrice>

            </Styled.Content>

            <Styled.Footer>
                <Button title="Confirmar" onPress={handleConfirmRental} />
            </Styled.Footer>

        </Styled.Container>
    );
}