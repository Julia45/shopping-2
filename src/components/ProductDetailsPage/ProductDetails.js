import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import './ProductDetails.css'


const ProductDetails = ({ user }) => {
  const { id } = useParams();
  const [product, setProduct] = useState()
  const history = useHistory();
  const [buyError, setBuyError] = useState("")

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data)
      })
  }, [id])

  const onHandleBuy = () => {
    if (product) {
      if (!product.available) {
        setBuyError("The Product is not in stock")
        return null
      }
      setBuyError("Bought successsfully")
      setTimeout(() => {
        history.push(`/`)
      }, 2000)
    }
  }

  const editProduct = (id) => {
    history.push(`/edit/${id}`)
  }

  const onHandleBack = () => {
    history.push(`/`)
  }

  const generateStars = (rating) => {
    return Array.from({ length: rating }).map(index => <span className="active" key={index}></span>)
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="product-data">
          <div className="product-image">
            {product ? <img src={product.img}></img> : null}
            <div className="rating-mini">
              {product ? generateStars(product.rating) : null}
            </div>
          </div>
          <div className="product-infoDetails">
            <div className="mt-2">
              <strong>Price:</strong> ${product ? product.price : null}
            </div>
            <div className="mt-2">
              <strong>Gender:</strong> {product ? product.gender : null}
            </div>
            <div className="mt-2">
              <strong>Category:</strong> {product ? product.category : null}
            </div>
          </div>
        </div>

        <div className="product-dataDetails">
          <div className="prod-title">
            <div className="fs-3">{product ? product.title : null}</div>
            {user.role === "admin" && (
              <button
                onClick={() => editProduct(product ? product.id : null)}
                className="btn btn-warning"
              >
                Edit
              </button>
            )}
          </div>
          <div className="prod-description mt-3 mb-3">
            {product ? product.description : null}
          </div>
        </div>
      </div>
      <div className="btn-container">
        <div
          className={`${product && !product.available ? "reject" : "approve"}`}
        >
          {buyError}
        </div>
        <div>
          <button
            onClick={onHandleBuy}
            className="btn btn-primary details-btn "
          >
            Buy
          </button>
          <button
            onClick={onHandleBack}
            className="btn btn-secondary details-btn"
          >
            Back
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ProductDetails);