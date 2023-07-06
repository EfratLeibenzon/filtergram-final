
export function CreateStoryTitle({ storyToEdit, onSaveStory }) {

    // function handleChange({ target }) {
    function handleChange(ev) {
        console.log('ev', ev.key)
        if (ev.key === 'Enter') storyToEdit.current.txt += '\n'
        storyToEdit.current.txt = ev.target.value
    }

    function onSubmitTitle(ev) {
        ev.preventDefault()
        onSaveStory()
    }

    return (
        <div className="edit-story-title flex column">
            <header className="flex row space-between">
                <span></span>
                <p>Create new post</p>
                <button onClick={onSubmitTitle}>Share</button>
            </header>
            <main className="flex row">
                <section id="img-preview2" className="img-preview">
                    <img src={storyToEdit.current.img.url} style={storyToEdit.current.img.style} alt="" />
                </section>
                <section className="edit-story-form flex column">
                    <section className="user-section flex row">
                        <img className="mini-user-img" src={storyToEdit.current.by.userImg.url} style={storyToEdit.current.by.userImg.style} />
                        <p>{storyToEdit.current.by.userName}</p>
                    </section>
                    <input className="texterea"
                        onChange={handleChange} onKeyUp={handleChange}
                        type="texterea" name="txt"
                        placeholder="Write a caption..."
                        style={{ height: 'scrollHeight' }} />
                    {/* <texterea rows="4" cols="50" wrap="hard" onChange={handleChange} name="txt" placeholder="Write a caption..." /> */}

                    <span id="span"></span>
                </section>
            </main>
        </div>
    )
}
