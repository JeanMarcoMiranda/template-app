import React, { ReactNode } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { Navigate } from "react-router-dom"

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  const isLoggedin = useSelector((state: RootState) => state.auth.isLoggedin);

  return isLoggedin ? children : <Navigate to={"/login"}/>
}

export default PrivateRoute