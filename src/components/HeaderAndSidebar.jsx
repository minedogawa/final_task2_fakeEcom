import { useState, useEffect, forwardRef, useImperativeHandle } from "react"

import Header from "./Header"
import Sidebar from "./Sidebar"

const HeaderAndSideBar = forwardRef((props, ref) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [totalQuantity, setTotalQuantity] = useState(0)
	const [updateCart, setUpdateCart] = useState(new Date().getMilliseconds())

	useImperativeHandle(ref, () => ({
		addToCart(product) {
			let productToStore

			if (window.localStorage.getItem(product.id) == null) {
				productToStore = JSON.stringify({
					...product,
					price: parseFloat(product.price),
					quantity: 1,
				})
			} else {
				const storedProduct = JSON.parse(window.localStorage.getItem(product.id))
				productToStore = JSON.stringify({
					...storedProduct,
					quantity: storedProduct.quantity + 1,
				})
			}

			window.localStorage.setItem(product.id, productToStore)
			handleUpdateCart()

			alert("Product added to cart!")
		},
	}))

	useEffect(() => {
		let cartItems = []
		let totalQuantity = 0

		Object.entries(window.localStorage).forEach(([id, cartItem]) => {
			if (id != "isSignedIn") {
				let parsedCartItem = JSON.parse(cartItem)

				totalQuantity += parsedCartItem.quantity
				cartItems.push(parsedCartItem)
			}
		})

		setCartItems(cartItems)
		setTotalQuantity(totalQuantity)
	}, [updateCart])

	function handleUpdateCart() {
		setUpdateCart(new Date().getMilliseconds())
	}

	function handleToggleIsSidebarOpen(status) {
		setIsSidebarOpen(status)
	}

	return (
		<>
			<Header handleToggleIsSidebarOpen={handleToggleIsSidebarOpen} cartItemsCount={totalQuantity} />
			<Sidebar isSidebarOpen={isSidebarOpen} cartItems={cartItems} updateCart={handleUpdateCart} handleToggleIsSidebarOpen={handleToggleIsSidebarOpen} />
		</>
	)
})

export default HeaderAndSideBar
