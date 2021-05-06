import React from "react";
import "./Product.css";
import { connect } from "react-redux";

const Product = ({
  user,
  title,
  description,
  price,
  deleteProduct,
  detailsProduct,
  img,
  rating,
  available,
}) => {
  const generateStars = (rating) => {
    return Array.from({ length: rating }).map((index) => (
      <span className="active" key={index}></span>
    ));
  };

  let inAvailableClass = available
    ? "product-container"
    : "product-container inactive";

  return (
    <div className={inAvailableClass}>
      <div className="product-img">
        <img src={img}></img>
      </div>
      <div className="rating-mini">{generateStars(rating)}</div>
      <div className="product-info">
        <div className="fs-4">{title}</div>
        <div className="description">{description}</div>
      </div>
      <div className="product-details">
        <div>
          <strong>${price}</strong>
        </div>
        <div className="product-actions">
          {user.role === "admin" && (
            <button className="btn btn-danger me-3" onClick={deleteProduct}>
              Delete
            </button>
          )}
          <button className="btn btn-info" onClick={detailsProduct}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Product);
