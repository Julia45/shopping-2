import { React } from "react";
import Product from "../Product/Product"
import "./Products.css"
import { useHistory } from "react-router-dom";


const Products = ({ products, deleteProductHandler}) => {
  const history = useHistory();

  const detailsProduct = (id) => {
    history.push(`/details/${id}`)
  }

  return (
    <div className="products-container">
      {products.map((product, index) => {
        return (
          <Product available={product.available} img={product.img} rating={product.rating} price={product.price} key={index} id={product.id} title={product.title} description={product.description} detailsProduct={() => detailsProduct(product.id)} deleteProduct={() => { deleteProductHandler(product.id, index) }}></Product>
        )
      })}
    </div>
  )
}

export default Products

