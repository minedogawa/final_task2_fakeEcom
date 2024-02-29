import React, { useState, useEffect } from "react"

export default function Pagination({ totalData, itemPerPage, currentPage, changeCurrentPage }) {
	const [paginationComponents, setPaginationComponents] = useState([])

	useEffect(() => {
		let paginationComponents = []

		for (let page = 0; page < Math.ceil(totalData / itemPerPage); page++) {
			// prettier-ignore
			paginationComponents.push(
                <li key={page}>
                    {page + 1 == currentPage ? 
                    <button onClick={handleChangeCurrentPage} data-page={page + 1} className="mx-1 px-6 py-4 rounded shadow text-white bg-black font-bold">{page + 1}</button> : 
                    <button onClick={handleChangeCurrentPage} data-page={page + 1} className={"mx-1 px-6 py-4 rounded shadow text-black bg-white"}>{page + 1}</button>}
                </li>
            )
		}

		setPaginationComponents(paginationComponents)
	}, [totalData, itemPerPage, currentPage])

	function handleChangeCurrentPage(event) {
		changeCurrentPage(event.target.dataset.page)
	}

	return (
		<nav className="py-4">
			<ul className="flex justify-center">{paginationComponents}</ul>
		</nav>
	)
}
