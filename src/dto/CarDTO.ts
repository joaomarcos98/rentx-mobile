type Accessories = {
    type: "speed" | "acceleration" | "turning_diameter" | "electric_motor" | "exchange" | "seats";
    name: string
}

export type CarDTO = {
    id: string,
    brand: string
    name: string
    about: string
    rent: {
        period: string
        price: number
    },
    fuel_type: string
    thumbnail: string
    accessories: Accessories[],
    photos: string[]

}