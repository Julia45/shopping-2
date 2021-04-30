import React, { useState } from "react"
import './ProductDetails.css'
import { useParams } from "react-router-dom";
import { useEffect } from "react"
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'


const ProductDetails = ({ user }) => {
  const { id } = useParams();
  const [product, setProduct] = useState()
  const history = useHistory();
  const [buyError, setBuyError] = useState("")
  const [buyErrorClass, setbuyErrorClass] = useState("")

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
        setbuyErrorClass("reject")
        return null
      }
      setBuyError("Bought successsfully")
      setbuyErrorClass("approve")
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
    let stars = []
    for (let i = 0; i < rating; i++) {
      stars.push(<span className="active" key={i}></span>)
    }
    return stars
  }


  return (
    <React.Fragment>
      <div className="container">
        <div className="product-data">
          <div className="product-image">
            <img src={product ? product.img : null}></img>
            <div className="rating-mini">{product ? generateStars(product.rating) : null}</div>
          </div>
          <div className="product-infoDetails">
            <div className="mt-2"><strong>Price:</strong> ${product ? product.price : null}</div>
            <div className="mt-2"><strong>Gender:</strong> {product ? product.gender : null}</div>
            <div className="mt-2"><strong>Category:</strong> {product ? product.category : null}</div>
          </div>
        </div>

        <div className="product-dataDetails">
          <div className="prod-title">
            <div className="fs-3">{product ? product.title : null}</div>
            {
              user.role === "admin" && <button onClick={() => editProduct(product ? product.id : null)} className="btn btn-warning">Edit</button>
            }
          </div>
          <div className="prod-description mt-3 mb-3">{product ? product.description : null}</div>
        </div>
      </div>
      <div className="btn-container">
        <div className={buyErrorClass}>{buyError}</div>
        <div>
          <button onClick={onHandleBuy} className="btn btn-primary details-btn ">Buy</button>
          <button onClick={onHandleBack} className="btn btn-secondary details-btn">Back</button>
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ProductDetails);