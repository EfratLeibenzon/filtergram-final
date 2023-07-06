
import { useState } from "react"

export function EditImg({ imgUrl, setImgStyle }) {
    const [currStyle, setCurrStyle] = useState({ filter: 'none' })

    function onSetStyle(currFilter) {
        setCurrStyle({ filter: currFilter })
    }

    return (
        <div className="edit-img flex column">
            <header className="flex row space-between">
                <span></span>
                <span> Edit</span>
                <button onClick={() => setImgStyle(currStyle)}>next</button>
            </header>
            <main className="flex row">
                <section id="img-preview-container" className="img-preview-container">
                    <img src={imgUrl} style={currStyle} />
                </section>
                <section className="img-editors flex column">
                    <p>Filters</p>
                    <section className="filter-btns">
                        <button className="filter-btn">
                            <img onClick={() => onSetStyle('none')} src="https://res.cloudinary.com/duxmabf4n/image/upload/v1686396746/vhq0nld9nnhfas7oyqiq.jpg" alt="" style={{ filter: 'none' }} />
                            <p>original</p>
                        </button>
                        <button className="filter-btn">
                            <img onClick={() => onSetStyle('grayscale(1)')} src="https://res.cloudinary.com/duxmabf4n/image/upload/v1686396746/vhq0nld9nnhfas7oyqiq.jpg" alt="" style={{ filter: 'grayscale(1)' }} />
                            <p>gray</p>
                        </button>
                        <button className="filter-btn">
                            <img onClick={() => onSetStyle('sepia(0.7)')} src="https://res.cloudinary.com/duxmabf4n/image/upload/v1686396746/vhq0nld9nnhfas7oyqiq.jpg" alt="" style={{ filter: 'sepia(0.7)' }} />
                            <p>sepia</p>
                        </button>
                        <button className="filter-btn">
                            <img onClick={() => onSetStyle('saturate(2)')} src="https://res.cloudinary.com/duxmabf4n/image/upload/v1686396746/vhq0nld9nnhfas7oyqiq.jpg" alt="" style={{ filter: 'saturate(2)' }} />
                            <p>saturate</p>
                        </button>
                        <button className="filter-btn">
                            <img onClick={() => onSetStyle('contrast(2)')} src="https://res.cloudinary.com/duxmabf4n/image/upload/v1686396746/vhq0nld9nnhfas7oyqiq.jpg" alt="" style={{ filter: 'contrast(2)' }} />
                            <p>contrast</p>
                        </button>
                        <button className="filter-btn">
                            <img onClick={() => onSetStyle('opacity(0.5)')} src="https://res.cloudinary.com/duxmabf4n/image/upload/v1686396746/vhq0nld9nnhfas7oyqiq.jpg" alt="" style={{ filter: 'opacity(0.5)' }} />
                            <p>opacity</p>
                        </button>
                        <button className="filter-btn">
                            <img onClick={() => onSetStyle('hue-rotate(90deg)')} src="https://res.cloudinary.com/duxmabf4n/image/upload/v1686396746/vhq0nld9nnhfas7oyqiq.jpg" alt="" style={{ filter: 'hue-rotate(90deg)' }} />
                            <p>hue90</p>
                        </button>
                        <button className="filter-btn">
                            <img onClick={() => onSetStyle('hue-rotate(270deg)')} src="https://res.cloudinary.com/duxmabf4n/image/upload/v1686396746/vhq0nld9nnhfas7oyqiq.jpg" alt="" style={{ filter: 'hue-rotate(270deg)' }} />
                            <p>hue270</p>
                        </button>
                        <button className="filter-btn">
                            <img onClick={() => onSetStyle('invert(1)')} src="https://res.cloudinary.com/duxmabf4n/image/upload/v1686396746/vhq0nld9nnhfas7oyqiq.jpg" alt="" style={{ filter: 'invert(1)' }} />
                            <p>invert</p>
                        </button>
                        <button className="filter-btn">
                            <img onClick={() => onSetStyle('brightness(1.5)')} src="https://res.cloudinary.com/duxmabf4n/image/upload/v1686396746/vhq0nld9nnhfas7oyqiq.jpg" alt="" style={{ filter: 'brightness(1.5)' }} />
                            <p>brighter</p>
                        </button>
                        <button className="filter-btn">
                            <img onClick={() => onSetStyle('brightness(0.5)')} src="https://res.cloudinary.com/duxmabf4n/image/upload/v1686396746/vhq0nld9nnhfas7oyqiq.jpg" alt="" style={{ filter: 'brightness(0.5)' }} />
                            <p>darker</p>
                        </button>
                        <button className="filter-btn">
                            <img onClick={() => onSetStyle('blur(1.5px)')} src="https://res.cloudinary.com/duxmabf4n/image/upload/v1686396746/vhq0nld9nnhfas7oyqiq.jpg" alt="" style={{ filter: 'blur(1.5px)' }} />
                            <p>blur</p>
                        </button>
                    </section>
                </section>

            </main>
        </div>
    )
}