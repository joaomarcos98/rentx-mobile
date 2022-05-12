import { CarDTO } from "../dto/CarDTO";

export type RootStackParamList = {
    Home: {
        car: CarDTO;
    };
    Dashboard: {
        option: string;
    };
    CarDetails: {
        car: CarDTO;
    };
    Scheduling: {
        car: CarDTO
    };
    SchedulingDetails: {
        car: CarDTO;
        dates: string[]
    };
    SchedulingComplete: {
        name: string
    };
    MyCars: {
        name: string
    }
};