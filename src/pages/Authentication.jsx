import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Authentication() {
	const navigate = useNavigate()

	const [signUp, setSignUp] = useState(false)
	const [loginErrorMessage, setLoginErrorMessage] = useState("")
	const [registerErrorMessage, setRegisterErrorMessage] = useState("")

	useEffect(() => {
		if (Boolean(window.localStorage.getItem("isSignedIn")) == true) {
			navigate("/")
		}
	}, [])

	function handleLoginFormSubmit(event) {
		event.preventDefault()

		axios({
			url: "https://fakestoreapi.com/auth/login",
			method: "post",
			headers: { "content-type": "application/json" },
			data: {
				username: event.target.username.value,
				password: event.target.password.value,
			},
		})
			.then(() => {
				window.localStorage.setItem("isSignedIn", true)
				return navigate("/")
			})
			.catch((error) => {
				if (error.response.status == 401) {
					setLoginErrorMessage(error.response.data)
				}
			})
	}

	function handleRegisterFormSubmit(event) {
		event.preventDefault()

		axios({
			url: "https://fakestoreapi.com/users",
			method: "post",
			headers: { "content-type": "application/json" },
			data: {
				username: event.target.username.value,
				email: event.target.email.value,
				password: event.target.password.value,
			},
		})
			.then(() => {
				window.localStorage.setItem("isSignedIn", true)
				return navigate("/")
			})
			.catch((error) => {
				setRegisterErrorMessage("an error occured")
			})
	}

	function handleToggleSignUp(event) {
		if (event.target.dataset.signup == "true") {
			setSignUp(true)
		} else {
			setSignUp(false)
		}
	}

	return (
		<div className="signinup-container" style={{ display: "block" }}>
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />

			<div className={`absolute top-[2rem] right-[2rem] z-50 ${loginErrorMessage.length < 1 ? "hidden" : ""}`}>
				<div className="max-w-xs text-sm text-white rounded-md shadow-lg mb-3 ml-3 bg-red-500" role="alert">
					<div className="flex p-4">
						{loginErrorMessage}
						<div className="ml-auto"></div>
					</div>
				</div>
			</div>

			<div className={`absolute top-[2rem] right-[2rem] z-50 ${registerErrorMessage.length < 1 ? "hidden" : ""}`}>
				<div className="max-w-xs text-sm text-white rounded-md shadow-lg mb-3 ml-3 bg-red-500" role="alert">
					<div className="flex p-4">
						{registerErrorMessage}
						<div className="ml-auto"></div>
					</div>
				</div>
			</div>

			<div
				className={`container ${signUp ? "right-panel-active" : ""}`}
				style={{
					background: "#fff",
					borderRadius: "10px",
					boxShadow: "0 14px 28px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					overflow: "hidden",
					width: "768px",
					maxWidth: "100%",
					minHeight: "480px",
				}}
				id="container"
			>
				<div className="form-container sign-up-container">
					<h1 className="logo-sign">Fakecommerce</h1>
					<form onSubmit={handleRegisterFormSubmit}>
						<h1>Create Account</h1>
						<input type="text" name="username" placeholder="Username" required />
						<input type="email" name="email" placeholder="Email" required />
						<input type="password" name="password" placeholder="Password" required />

						<button>{"Sign Up"}</button>
					</form>
				</div>
				<div className="form-container sign-in-container">
					<h1 className="logo-sign">Fakecommerce</h1>
					<form onSubmit={handleLoginFormSubmit}>
						<h1>Sign in</h1>
						<input type="text" name="username" placeholder="Username" required />
						<input type="password" name="password" placeholder="Password" required />

						<button>{"Sign In"}</button>
					</form>
				</div>
				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-left">
							<h1>Welcome Back!</h1>
							<p>To keep connected with us please login with your personal info</p>
							<button onClick={handleToggleSignUp} data-signup="false" className="ghost">
								Sign In
							</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1>Hello, Friend!</h1>
							<p>Enter your personal details and start the journey with us</p>
							<button onClick={handleToggleSignUp} data-signup="true" className="ghost">
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
