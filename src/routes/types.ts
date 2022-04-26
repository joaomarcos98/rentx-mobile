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
        name: string
    };
    SchedulingDetails: {
        name: string
    };
    SchedulingComplete: {
        name: string
    }
};