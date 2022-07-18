import { TileInfo } from '../../FloodIt'
import './Tile.css'

interface TileProps {
    floodColor?: string
    tileInfo: TileInfo
    flooded: boolean
}

function Tile({ floodColor, tileInfo, flooded }: TileProps) {
    let backgroundColor = flooded ? floodColor : tileInfo.color

    return <span style={{ backgroundColor }} className="tile" />
}

export default Tile
