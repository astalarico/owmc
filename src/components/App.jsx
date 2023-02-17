import { useState, useEffect } from "react";
import "../sass/app.scss";

const planetChunkWidth = 16;
const planetChunkHeight = 16;
const planetChunkDepth = 50;
const planetChunkBreadth = 50;

const isColliding = (a, b) => {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
};

function App() {
    const [drilling, setDrilling] = useState(false);
    const [ groundPosition, setGroundPosition ] = useState(1);
    const startDrill = () => {
        setDrilling(true);
        //setDrilling(false)
    };

    useEffect(() => {
        if (drilling) {
            setGroundPosition(groundPosition + 1);
            const groundChunks = document.querySelectorAll(".ground-chunk");
            groundChunks.forEach((chunk) => {
                if (isColliding(document.getElementById("drill-head"), chunk)) {
                    console.log("Drill hit the ground");
                    chunk.classList.add('mined');
                }
            });
            setDrilling(false);
        }
    }, [drilling, groundPosition]);

    const buildGrid = () => {
        const grid = [];
        for (let i = 0; i < planetChunkDepth; i++) {
            for (let j = 0; j < planetChunkBreadth; j++) {
                grid.push(
                    <div
                        style={{
                            width: `${planetChunkWidth}px`,
                            height: `${planetChunkHeight}px`,
                            left: `${j * planetChunkWidth + (j + 1)}px`,
                            top: `${i * planetChunkHeight + (i + 1)}px`,
                        }}
                        className="text-white absolute border border-white ground-chunk"
                    ></div>
                );
            }
        }
        return grid;
    };

    return (
        <div id="game">
            <div className="planet-1 w-[350px] h-[350px] border border-white flex">
                <div className="camera h-full flex-1 relative overflow-hidden">
                    <div id="world">
                        <div id="drill">
                            {drilling && (
                                <div
                                    id="drill-head"
                                    style={{
                                        height: `${318}px`,
                                    }}
                                ></div>
                            )}
                        </div>
                        {}
                        <div
                            style={{
                                bottom: `calc(0px + 18*${groundPosition}px - 1px)`,
                            }}
                            id="ground"
                            className="absolute"
                        >
                            {buildGrid()}
                        </div>
                    </div>
                </div>
                <div className="controls h-full border-l border-white w-[60px] p-2">
                    <div onMouseUp={startDrill} className="button">
                        Drill
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
