import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps } from 'react-native';
import { CarDTO } from '../../dto/CarDTO';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    
    background-color: ${({ theme }) => theme.colors.background_primary};
`
export const Header = styled.View`
    width: 100%;
    height: 113px;

    justify-content: flex-end;
    padding: 32px 16px;


    background-color: ${({ theme }) => theme.colors.header};
`

export const HeaderContent = styled.View`

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`


export const TotalCars = styled.Text`
    font-size: ${RFValue(15)}px;

    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
`

export const CarList = styled(FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>)
    .attrs({
        contentContainerStyle: {
            padding: 24
        },
        showsVerticalScrollIndicator: false
    })`
    padding-right: 12px;
`;
