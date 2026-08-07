import { Link } from "react-router"
import { useState } from "react"




const BuildRoutine = () => {

    const [searchText, setSearchText] = useState('')
    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    return (

        <>
            <div>BuildRoutine</div>

            <Link to={"/"}>
                Back to Home
            </Link>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={searchText}
                    placeholder="Search Exercise"
                    onChange={(e) => setsearchText(e.target.value)}
                />

                <button>
                    Search
                </button>

            </form>
        </>
    )
}

export default BuildRoutine