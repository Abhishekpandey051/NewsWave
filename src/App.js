import Body from "./component/Body";
import Header from "./component/Header";
import { createBrowserRouter,Outlet } from "react-router-dom";
import Whether from "./component/Whether"
import Contact from "./component/Contact"
import Error from "./component/Error";
function App() {
  return (
    <div>
    <Header/>
    <Outlet/>
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Body/>
      },
      {
        path: "/whether",
        element: <Whether/>,
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/project",
        // element: <Project/>
      } 

    ],
    errorElement:<Error/>,
  },
])

export default App;
