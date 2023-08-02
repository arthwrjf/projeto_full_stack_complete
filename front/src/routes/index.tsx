import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Dashboard } from "../pages/Dashboard"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { Register } from "../pages/Register"

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Login/>}/> 
            <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
        </Routes>
    )
}