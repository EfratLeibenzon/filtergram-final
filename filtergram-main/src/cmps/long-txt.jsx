import { useEffect, useState } from "react"


export function LongTxt({ txt = 'test', length }) {

    const [isMore, setIsMore] = useState(false)
    const [isShort, setIsShort] = useState(null)

    useEffect(() => {
        setIsShort(txt.length < 119)
    }, [])

    function BtnToggle() {
        setIsMore((prevIsMore) => !prevIsMore)
    }


    return (
        <section className="description-container">

            {!isMore && <p className="short-story-title">{txt.substring(0, length)}</p>}
            {isMore && <p className="long-story-title">{txt}</p>}
            {!isShort && <article>
                {!isMore && <button onClick={BtnToggle}>more</button>}
                {isMore && <button onClick={BtnToggle}>less</button>}
            </article>}

        </section>
    )
}