import { colors } from '../../settings'
import { GameStatus } from '../colorProvider/ColorProvider'
import './ColorPicker.css'

interface ColorPickerProps {
    setFloodColor: (color: string) => void
    setStepCounter: (counter: number) => void
    counter: number
    gameStatus: GameStatus
}

const ColorPicker = ({
    setFloodColor,
    setStepCounter,
    counter,
    gameStatus,
}: ColorPickerProps) => {
    return (
        <div className="colorPicker">
            {colors.map((color) => (
                <span
                    key={color}
                    className="picker"
                    onClick={() => {
                        if (gameStatus === GameStatus.running) {
                            setFloodColor(color)
                            setStepCounter(++counter)
                        }
                    }}
                    style={{ backgroundColor: color }}
                />
            ))}
        </div>
    )
}

export default ColorPicker
