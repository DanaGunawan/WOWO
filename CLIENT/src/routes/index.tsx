import BaseLayout from "@/layout/base-layout";
import { Route, Routes } from "react-router-dom";
import { authRoutesPaths, protectedRoutesPaths } from "./routes";
import AppLayout from "@/layout/app-layout";
import RouteGuard from "./route-guard";

const AppRoutes = () => {
 return  (<Routes>
    <Route path="/" element={<RouteGuard requiredAuth={false} />} >
      <Route element={<BaseLayout />}>
      {authRoutesPaths?.map((route) => {
       return <Route key={route.path} path={route.path} element={route.element}></ Route>
      })}
      </Route>
      </Route>


    <Route path="/" element={<RouteGuard requiredAuth={true} />} >
      <Route element={<AppLayout />}>
      {protectedRoutesPaths?.map((route) => {
       return <Route key={route.path} path={route.path} element={route.element}></ Route>
      })}
      </Route>
      </Route>
    </Routes>)

};

export default AppRoutes;
