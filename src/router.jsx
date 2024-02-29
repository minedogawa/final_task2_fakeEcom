import { createBrowserRouter } from "react-router-dom"

import RequireAuth from "./RequireAuth"

import Authentication from "./pages/Authentication"
import Home from "./pages/Home"
import Detail from "./pages/Detail"

export default createBrowserRouter([
	{
		path: "/",
		children: [
			{
				path: "",
				element: (
					<RequireAuth>
						<Home />
					</RequireAuth>
				),
			},
			{
				path: "/:productId",
				element: (
					<RequireAuth>
						<Detail />
					</RequireAuth>
				),
			},
		],
	},

	{
		path: "authentication",
		element: <Authentication />,
	},
])
