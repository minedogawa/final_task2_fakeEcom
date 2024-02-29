import { IoArrowBackCircle } from "react-icons/io5"

import { useRef } from "react"
import { useLocation, Link } from "react-router-dom"

import HeaderAndSideBar from "../components/HeaderAndSidebar"

export default function Detail() {
	const childRef = useRef(null)
	const location = useLocation()

	function handleAddToCartButtonClick(event) {
		childRef.current.addToCart({
			id: event.target.dataset.productId,
			image: event.target.dataset.productImage,
			title: event.target.dataset.productTitle,
			price: event.target.dataset.productPrice,
		})
	}

	return (
		<>
			<HeaderAndSideBar ref={childRef} />

			<div className="w-[100vw]">
				<section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 max-h-screen flex flex-col items-center relative">
					<Link to="/">
						<div className="w-[100vw] pl-20">
							<IoArrowBackCircle className="text-primary cursor-pointer" size={40} />
						</div>
					</Link>

					<div className="container mx-auto">
						<div className="flex flex-col lg:flex-row items-center">
							<div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
								<img className="max-w-[200px] lg:max-w-xs" src={location.state.product.image} alt={location.state.product.title} />
							</div>
							<div className="flex-1 text-center lg:text-left">
								<h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{location.state.product.title}</h1>
								<div className="text-2xl text-red-500 font-medium mb-6">$ {location.state.product.price}</div>
								<p className="mb-8">{location.state.product.description}</p>
								<button onClick={handleAddToCartButtonClick} className="bg-primary py-4 px-8 text-white" data-product-id={location.state.product.id} data-product-title={location.state.product.title} data-product-image={location.state.product.image} data-product-price={location.state.product.price}>
									Add to cart
								</button>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}
