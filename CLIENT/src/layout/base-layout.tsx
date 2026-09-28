import { Outlet } from "react-router-dom";


const BaseLayout = () => {
  return (
    <div className="flex flex-col w-full h-auto">
      <div className="h-full w-full flex item-center justify-center ">
        <div className="w-full mx-auto h-auto">
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
