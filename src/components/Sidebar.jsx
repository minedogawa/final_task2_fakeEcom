import { IoMdArrowForward, IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io"
import { FiTrash2 } from "react-icons/fi"

import { useState, useEffect } from "react"

export default function Sidebar({ isSidebarOpen, cartItems, updateCart, handleToggleIsSidebarOpen }) {
	const [right, setRight] = useState("-1000")
	const [totalPrice, setTotalPrice] = useState(0)

	useEffect(() => {
		let totalPrice = 0
		console.log(isSidebarOpen)

		setRight(isSidebarOpen == true ? "0px" : "-1000px")

		cartItems.forEach((cartItem) => {
			totalPrice += cartItem.price * cartItem.quantity
		})

		setTotalPrice(totalPrice)
	}, [isSidebarOpen, cartItems])

	function handleCloseButtonClick() {
		handleToggleIsSidebarOpen(false)
	}

	function handleAddQuantityButton(event) {
		const product = JSON.parse(window.localStorage.getItem(event.target.dataset.productId))
		window.localStorage.setItem(
			product.id,
			JSON.stringify({
				...product,
				quantity: product.quantity + 1,
			})
		)

		updateCart()
	}

	function handleReduceQuantityButton(event) {
		const product = JSON.parse(window.localStorage.getItem(event.target.dataset.productId))

		if (product.quantity > 1) {
			window.localStorage.setItem(
				product.id,
				JSON.stringify({
					...product,
					quantity: product.quantity - 1,
				})
			)
		} else {
			window.localStorage.removeItem(product.id)
		}

		updateCart()
	}

	function handleDeleteItem(event) {
		window.localStorage.removeItem(event.target.dataset.productId)
		updateCart()
	}

	function handleDeleteAllItem() {
		Object.keys(window.localStorage).forEach((key) => {
			if (key != "isSignedIn") {
				window.localStorage.removeItem(key)
			}
		})

		updateCart()
	}

	function handleCheckout() {
		alert(`Thank you for buying, your total is ${totalPrice}`)

		Object.keys(window.localStorage).forEach((key) => {
			if (key != "isSignedIn") {
				window.localStorage.removeItem(key)
			}
		})

		updateCart()
	}

	return (
		<div style={{ right: right }} className="w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]">
			<div className="flex items-center justify-between py-6 border-b">
				<div onClick={handleCloseButtonClick} className="cursor-pointer w-8 h-8 flex justify-center items-center">
					<IoMdArrowForward className="text-2xl" />
				</div>
			</div>
			<div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
				{cartItems.map((cartItem, index) => (
					<div key={index} className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
						<div className="w-full min-h-[150px] flex items-center gap-x-4">
							<div>
								<img className="max-w-[80px]" src={cartItem.image} alt={cartItem.title} />
							</div>
							<div className="w-full flex flex-col">
								<div className="flex justify-between mb-2">
									<div className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline">{cartItem.title}</div>
									<div onClick={handleDeleteItem} className="text-xl cursor-pointer" data-product-id={cartItem.id}>
										<IoMdClose className="text-gray-500 hover:text-red-500 transition" data-product-id={cartItem.id} />
									</div>
								</div>
								<div className="flex gap-x-2 h-[36px] text-sm">
									<div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
										<div onClick={handleReduceQuantityButton} className="h-full flex-1 flex justify-center items-center cursor-pointer" data-product-id={cartItem.id}>
											<IoMdRemove data-product-id={cartItem.id} />
										</div>
										<div className="h-full flex justify-center items-center px-2">{cartItem.quantity}</div>
										<div onClick={handleAddQuantityButton} className="h-full flex flex-1 justify-center items-center cursor-pointer" data-product-id={cartItem.id}>
											<IoMdAdd data-product-id={cartItem.id} />
										</div>
									</div>
									{/* item price */}
									<div className="flex flex-1 justify-around items-center">$ {cartItem.price}</div>
									{/* final price */}
									<div className="flex flex-1 justify-end items-center text-primary font-medium">{`$ ${parseFloat(cartItem.price * cartItem.quantity).toFixed(2)}`}</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex flex-col gap-y-3  mt-4">
				<div className="flex w-full justify-between items-center">
					<div className="font-semibold">
						<span className="mr-2">Subtotal:</span> $ {parseFloat(totalPrice).toFixed(2)}
					</div>
					<div onClick={handleDeleteAllItem} className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl">
						<FiTrash2 />
					</div>
				</div>
				<button onClick={handleCheckout} className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium">
					Checkout
				</button>
			</div>
		</div>
	)
}
