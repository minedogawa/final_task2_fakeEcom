import { useState } from "react"
import { Navigate } from "react-router-dom"

export default function RequireAuth({ children }) {
	const [isSignedIn, setIsSignedIn] = useState(Boolean(window.localStorage.getItem("isSignedIn")))

	setInterval(() => {
		setIsSignedIn(Boolean(window.localStorage.getItem("isSignedIn")))
	}, 1000)

	return isSignedIn ? children : <Navigate to="/authentication" />
}
