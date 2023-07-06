import React, { useEffect, useRef } from "react"
import { utilService } from "../services/util.service.js"
import { useForm } from "../customHooks/useForm.js"
import { userServiceHttp } from "../services/user.service.http.js"

export function Search({ onSetFilter }) {

    onSetFilter = useRef(utilService.debounce(onSetFilter))
    const [filterByToEdit, setFilterByToEdit, handleChange] = useForm(userServiceHttp.getDefaultFilter(), onSetFilter.current)
    let searchedUserName = filterByToEdit.txt
    // useEffect(() => {
    //     if (searchTerm) {
    //         setFilterByToEdit((prevFilterByToEdit) => ({ ...prevFilterByToEdit, userName: searchTerm }))
    //     }
    // }, [searchTerm])
    useEffect(() => {
        if (searchedUserName) {
            setFilterByToEdit((prevFilterByToEdit) => ({ ...prevFilterByToEdit, userName: searchedUserName }))
        }
    }, [searchedUserName])


    return (
        <div className="search">
            <form>
                <label htmlFor="name"></label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}