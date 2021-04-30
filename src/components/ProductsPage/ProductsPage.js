import React from "react"
import Filter from "../ui/Filter/Filter"
import Products from '../ui/Products/Products'
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const history = useHistory();
  const [pagination, setPagination] = useState({
    canPrev: true,
    canNext: true
  })
  const [filters] = useState({
    availability: false,
    gender: "unisex",
    category: "none",
    rating: "",
    priceFrom: "",
    priceTo: ""
  })

  useEffect(() => {
    let url = `http://localhost:3001/products?_page=${page}&_limit=6`
    fetch(url)
      .then(response => {
        let link = response.headers.get('Link')
        setPagination({
          canNext: link.includes('rel="next"'),
          canPrev: link.includes('rel="prev"'),
        })
        return response.json()
      })
      .then(data => {
        setProducts(data)
      })
      .catch(err => {
        history.push("/500")
      })
  }, [page])


  const deleteProductHandler = (itemID, index, page) => {
    return fetch(`http://localhost:3001/products/${itemID}?_page=${page}&_limit=6`, {
      method: 'delete'
    })
      .then(response => response.json())
      .then(() => {
        let newArrayOfProducts = [...products];
        newArrayOfProducts.splice(index, 1)
        setProducts(newArrayOfProducts)
      })
  }

  const handleSearch = (search, page) => {
    let url = new URL("http://localhost:3001/products/"), params = {
      _page: page,
      _limit: 6
    }
    if (search.length > 0) {
      params.q = search;
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then(response => {
        let link = response.headers.get('Link')
        setPagination({
          canNext: link.includes('rel="next"'),
          canPrev: link.includes('rel="prev"'),
        })
        return response.json()
      })
      .then(data => {
        setProducts(data)
      })
  }

  const filterProducts = (filters, page) => {
    let url = new URL("http://localhost:3001/products/"), params =
    {
      available: filters.availability,
      gender: filters.gender,
      _page: page,
      _limit: 6
    }

    if (filters.rating !== "") {
      params.rating = filters.rating
    }

    if (filters.category !== "none") {
      params.category = filters.category
    }

    if (filters.priceFrom) {
      params.price_gte = filters.priceFrom;
    }

    if (filters.priceTo) {
      params.price_lte = filters.priceTo;
    }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then(response => {
        let link = response.headers.get('Link')
        setPagination({
          canNext: link.includes('rel="next"'),
          canPrev: link.includes('rel="prev"'),
        })
        return response.json()
      })
      .then(data => {
        setProducts(data)
      })
  }

  const nextPageHandler = () => {
    setPage(page + 1)
  }

  const prevPageHandler = () => {
    setPage(page - 1)
  }

  return (
    <div className="App">
      <Filter
        initialFilters={filters}
        filterProducts={filterProducts}
        handleSearch={handleSearch}
        page={page}
      ></Filter>
      {
        products.length === 0 ? <div className="fs-2  text-center">Nothing found</div> : (
          <Products filters={filters}
            products={products}
            deleteProductHandler={deleteProductHandler}
          ></Products>
        )
      }


      <div className="padinationContainer">
        <button onClick={prevPageHandler} className="page-link" disabled={!pagination.canPrev}><span aria-hidden="true">&laquo;</span></button>
        <div className="page">{page}</div>
        <button onClick={nextPageHandler} disabled={!pagination.canNext} className="page-link" ><span aria-hidden="true">&raquo;</span></button>
      </div>

    </div>
  )


}

export default ProductsPage