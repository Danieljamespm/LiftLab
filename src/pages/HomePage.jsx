import { Link } from "react-router"

const HomePage = () => {
    return (

        <>
            <div>HomePage</div>

            <Link to={"/build-routine"}>
                Build Routine
            </Link>
        </>
    )
}

export default HomePage