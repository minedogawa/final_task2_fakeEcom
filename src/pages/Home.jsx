import "../App.css"
import "../index.css"
import { BsPlus, BsEyeFill, BsBag } from "react-icons/bs"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import axios from "axios"

import HeaderAndSideBar from "../components/HeaderAndSidebar"
import Pagination from "../components/Pagination"

export default function Home() {
	const childRef = useRef(null)

	const [products, setProducts] = useState([])
	const [totalItem, setTotalItem] = useState([])
	const [itemPerPage, setItemPerPage] = useState(8)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		axios({
			url: "https://fakestoreapi.com/products",
			method: "get",
		}).then((response) => {
			let products = []

			for (let i = 1; i <= 4; i++) {
				products.push(
					...response.data.map((product) => {
						return {
							...product,
							id: product.id + 20 * (i - 1),
						}
					})
				)
			}

			setProducts(products.slice(currentPage * itemPerPage - itemPerPage, currentPage * itemPerPage))
			setTotalItem(products.length)
		})
	}, [itemPerPage, currentPage])

	function handleAddToCartButtonClick(event) {
		childRef.current.addToCart({
			id: event.target.dataset.productId,
			image: event.target.dataset.productImage,
			title: event.target.dataset.productTitle,
			price: event.target.dataset.productPrice,
		})
	}

	function changeCurrentPage(page) {
		setCurrentPage(page)
	}

	return (
		<>
			<HeaderAndSideBar ref={childRef} />

			<div className="w-[100vw]">
				<div className="absolute top-[2rem] right-[2rem] z-50 hide-after-3">
					<div className="max-w-xs text-sm text-white rounded-md shadow-lg mb-3 ml-3 bg-green-500" role="alert">
						<div className="flex p-4">
							<div className="ml-auto">Signin successful</div>
						</div>
					</div>
				</div>

				<section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20">
					<div className="container mx-auto flex justify-around h-full">
						<div className="flex flex-col justify-center">
							<div className="font-semibold flex items-center uppercase">
								<div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>Hot Trend
							</div>
							<h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">
								Fresh Fashion Finds
								<br />
								<span className="font-light text-lg">new collection</span>
							</h1>
							<a href="#products" className="self-start uppercase font-semibold border-b-2 border-primary text-2xl cursor-pointer">
								Discover More
							</a>
						</div>
					</div>
				</section>

				<section id="products" className="pt-[8rem]">
					<div className="container mx-auto">
						<h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-lg mx-auto">
							{products.map((product, index) => (
								<div key={index} className="p-4">
									<div className="border border-[#e4e4e4] mb-4 relative overflow-hidden group transition rounded-lg">
										<div className="aspect-w-1 aspect-h-1 flex justify-center items-center p-[1rem]">
											<div className="w-[200px] h-[200px] flex justify-center items-center px-3">
												<img className="object-cover max-w-full max-h-full group-hover:scale-110 transition duration-300 rounded-lg" src={product.image} alt={product.title} />
											</div>
										</div>
										<div className="absolute top-1 -right-11 group-hover:right-2 flex flex-row justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
											<button onClick={handleAddToCartButtonClick} style={{ background: "transparent", boxShadow: "none" }} className="border-none p-0" data-product-id={product.id} data-product-title={product.title} data-product-image={product.image} data-product-price={product.price}>
												<div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500 rounded-full" data-product-id={product.id} data-product-title={product.title} data-product-image={product.image} data-product-price={product.price}>
													<BsPlus className="text-3xl" data-product-id={product.id} data-product-title={product.title} data-product-image={product.image} data-product-price={product.price} />
												</div>
											</button>

											<Link to={`/${product.id}`} state={{ product: product }}>
												<div className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl rounded-full">
													<BsEyeFill />
												</div>
											</Link>
										</div>
									</div>
									<div>
										<div className="text-sm capitalize text-black mb-1">{product.category}</div>
										<div>
											<Link to={`/${product.id}`} state={{ product: product }}>
												<h2 className="font-semibold mb-1">{product.title}</h2>
											</Link>
										</div>
										<h2 className="font-semibold">$ {product.price}</h2>
									</div>
								</div>
							))}
						</div>

						<Pagination totalData={totalItem} itemPerPage={itemPerPage} currentPage={currentPage} changeCurrentPage={changeCurrentPage} />
					</div>
				</section>
			</div>
		</>
	)
}
