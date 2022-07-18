import './App.css'
import { colors } from './settings'
import ColorProvider from './components/colorProvider/ColorProvider'

export interface TileInfo {
    color: string
    rowIndex: number
    colIndex: number
    flooded: boolean
}

function FloodIt() {
    const cols = 10
    const rows = 10
    const tiles: TileInfo[][] = []

    for (let rowIndex = 0; rowIndex < cols; rowIndex++) {
        const row = []
        for (let colIndex = 0; colIndex < rows; colIndex++) {
            row.push({
                color: colors[Math.floor(Math.random() * colors.length)],
                rowIndex: colIndex,
                colIndex: rowIndex,
                flooded: rowIndex === 0 && colIndex === 0,
            })
        }
        tiles.push(row)
    }

    return (
        <div className="App">
            <h1>Flood It</h1>
            <ColorProvider tiles={tiles} />
        </div>
    )
}

export default FloodIt
