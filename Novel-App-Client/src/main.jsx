import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router";
import {MainLayout} from "./leyauts/MainLayout.jsx";
import {HomePage} from "./routes/HomePage.jsx";
import NotFound from "./routes/NotFound.jsx";
import ReadingList from "./routes/ReadingList.jsx";
import Forum from "./routes/Forum.jsx";
import Series from "./routes/Series.jsx";
import Read from "./routes/Read.jsx";
import Write from "./routes/Write.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Search from "./routes/Search.jsx";
import Login from './componets/login.jsx';

const routes = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
              path:"*",
              element: <NotFound />,
            },
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: <Login />

            },
            {
                path:"/:slug",
                element: <ReadingList />,
            },
            {
              path: "/series/:seriesId",
              element: <Series />,
            },
            {
              path:"/read/:seriesId/chapter/:chapterId",
              element: <Read />,
            },
            {
                path:"/write",
                element: <Write />,
            },
            {
                path: "/forum",
                element: <Forum />,
            },
            {
                path:"/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/search/:search",
                element: <Search />,
            }
        ]
    }
]);


createRoot(document.getElementById('root')).render(

  <StrictMode>
      <RouterProvider router={routes} />
  </StrictMode>
)
