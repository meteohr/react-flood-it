import { useEffect } from 'react'
import { Updater } from 'use-immer'
import { TileInfo } from '../../FloodIt'
import Tile from '../tile/Tile'
import './FloodItBoard.css'

interface FloodItBoardProps {
    floodColor: string
    tilesState: TileInfo[][]
    setTilesState: Updater<TileInfo[][]>
}

function updateFloodInfo(
    tilesState: TileInfo[][],
    floodColor: string
): TileInfo[][] {
    for (let r = 0; r < tilesState.length; r++) {
        for (let t = 0; t < tilesState[r].length; t++) {
            if (tilesState[r][t].flooded === true) {
                //if not left most tile, check left.
                if (t > 0 && tilesState[r][t - 1].color === floodColor)
                    tilesState[r][t - 1].flooded = true

                //if not right most tile, check right
                if (
                    t < tilesState[r].length - 1 &&
                    tilesState[r][t + 1].color === floodColor
                )
                    tilesState[r][t + 1].flooded = true

                //if not bottom row, check below
                if (
                    r < tilesState.length - 1 &&
                    tilesState[r + 1][t].color === floodColor
                )
                    tilesState[r + 1][t].flooded = true

                //if not top row, check above. Also checking if previously not collect. As we need to move back up a row it it was not.
                //This to check if the tile above this one also needs to be added.
                if (
                    r - 1 >= 0 &&
                    tilesState[r - 1][t].color === floodColor &&
                    tilesState[r - 1][t].flooded !== true
                ) {
                    tilesState[r - 1][t].flooded = true
                    r = r > 1 ? r - 2 : 0
                    break
                }
            }
        }
    }
    return [
        ...tilesState.map((r) =>
            r.map((tile) => ({
                ...tile,
                color: tile.flooded ? floodColor : tile.color,
            }))
        ),
    ]
}

function FloodItBoard({
    floodColor,
    tilesState,
    setTilesState,
}: FloodItBoardProps) {
    useEffect(() => {
        console.log('executing useeffect...')
        setTilesState((draft) => {
            draft = updateFloodInfo(draft, floodColor)
        })
    }, [floodColor])
    return (
        <div className="board">
            {tilesState.map((tileRow, rowIndex) =>
                tileRow.map((tileInfo, colIndex) => (
                    <Tile
                        key={`${rowIndex}_${colIndex}`}
                        tileInfo={tileInfo}
                        floodColor={floodColor}
                        flooded={tilesState[rowIndex][colIndex].flooded}
                    />
                ))
            )}
        </div>
    )
}

export default FloodItBoard
