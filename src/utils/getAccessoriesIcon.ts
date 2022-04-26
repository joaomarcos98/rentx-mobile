import SpeedSvg from "../assets/speed.svg"
import AccelerationSvg from "../assets/acceleration.svg"
import ForceSvg from "../assets/force.svg"
import GasolineSvg from "../assets/gasoline.svg"
import ExchangeSvg from "../assets/exchange.svg"
import PeopleSvg from "../assets/people.svg"
import EnergySvg from "../assets/energy.svg"
import HybridSvg from "../assets/hybrid.svg"

export const getAccessoriesIcons = (type: string) => {
    const icons = {
        speed: SpeedSvg,
        acceleration: AccelerationSvg,
        turning_diameter: ForceSvg,
        gasoline_motor: GasolineSvg,
        electric_motor: EnergySvg,
        hybrid_motor: HybridSvg,
        exchange: ExchangeSvg,
        people: PeopleSvg,
    }
    return icons[type] || icons["speed"]
}   