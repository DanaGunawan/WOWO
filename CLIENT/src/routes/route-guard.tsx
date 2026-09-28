import { Outlet } from "react-router-dom"


interface props  {
    requiredAuth ?: boolean
}

const RouteGuard = ({requiredAuth} : props) => {
    console.log(requiredAuth)
    return  <Outlet />
}

export default RouteGuard