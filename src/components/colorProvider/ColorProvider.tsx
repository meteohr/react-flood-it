import { useState } from 'react'
import { useImmer } from 'use-immer'
import { TileInfo } from '../../FloodIt'
import { maxSteps } from '../../settings'
import FloodItBoard from '../board/FloodItBoard'
import ColorPicker from '../colorPicker/ColorPicker'
import './ColorProvider.css'

interface ColorProviderProps {
    tiles: TileInfo[][]
}

export enum GameStatus {
    'running',
    'lost',
    'won',
}

const ColorProvider = ({ tiles }: ColorProviderProps) => {
    const [floodColor, setFloodColor] = useState<string>(tiles[0][0].color)
    const [tilesState, setTilesState] = useImmer<TileInfo[][]>(tiles)
    const [stepCounter, setStepCounter] = useState<number>(0)
    const isBoardFlooded = tilesState.every((row) =>
        row.every((tile) => tile.flooded)
    )
    let gameStatus: GameStatus = GameStatus.running
    if (isBoardFlooded) {
        gameStatus = GameStatus.won
    }
    if (stepCounter >= maxSteps) {
        gameStatus = GameStatus.lost
    }
    return (
        <>
            {gameStatus === GameStatus.won ? (
                <div className="endScreen">
                    You win! <br />
                    <button onClick={() => window.location.reload()}>
                        try again
                    </button>
                </div>
            ) : gameStatus === GameStatus.lost ? (
                <div className="endScreen">
                    You lose! <br />
                    <button onClick={() => window.location.reload()}>
                        try again
                    </button>
                </div>
            ) : (
                ''
            )}
            <div className="stepCounter">
                {stepCounter}/{maxSteps}
            </div>
            <FloodItBoard
                floodColor={floodColor}
                tilesState={tilesState}
                setTilesState={setTilesState}
            />
            <ColorPicker
                counter={stepCounter}
                setStepCounter={setStepCounter}
                setFloodColor={setFloodColor}
                gameStatus={gameStatus}
            />
        </>
    )
}

export default ColorProvider
