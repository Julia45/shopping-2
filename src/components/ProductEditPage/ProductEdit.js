import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./ProductEdit.css";

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const history = useHistory();
  const [errors, setErrors] = useState({
    title: "",
    img: "",
    description: "",
    rating: "",
    gender: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  const onCancel = (id) => {
    history.push(`/details/${id}`);
  };

  const onSave = (id) => {
    const nextErrors = {
      img:
        product.img.length === 0
          ? "Required"
          : /^https:\/\/.*\.(jpeg|jpg|png)$/.test(product.img) === false
          ? "Invalid"
          : "",
      rating: product.rating === "" ? "Required" : "",
      gender: product.gender === "" ? "Required" : "",
      category: product.category === "none" ? "Required" : "",
      title: product.title === "" ? "Required" : "",
      description: product.description === "" ? "Required" : "",
      price:
        product.price === 0
          ? "Required"
          : /[a-zA-Z]/.test(product.price.toString())
          ? "Enter Digits"
          : "",
    };

    setErrors(nextErrors);
    const isValid = Object.values(nextErrors).every((value) => value === "");

    if (!isValid) {
      return;
    }

    fetch(`http://localhost:3001/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((response) => {
      response.json().then(() => {
        history.push(`/details/${id}`);
      });
    });
  };

  if (!product) {
    return null;
  }

  const changeRating = (e) => {
    setProduct({
      ...product,
      rating: e.target.value,
    });
  };

  const generateRating = (rating) => {
    return Array.from({ length: rating }).map((value, arrayIndex) => {
      const index = rating - arrayIndex;
      return (
        <>
          <input
            type="radio"
            id={`star-${index}_edit`}
            name="rating"
            value={index}
            checked={product.rating.toString() === `${index}`}
            onChange={changeRating}
          />
          <label
            htmlFor={`star-${index}_edit`}
            title={`Rate - ${index}`}
          ></label>
        </>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="product-data_edit">
          <img src={product.img}></img>
          <div className="rating-area__edit">{generateRating(5)}</div>
          <div className="product-details_edit">
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control mt-3 mb-3"
                value={product.img}
                onChange={(e) => {
                  setProduct({ ...product, img: e.target.value });
                }}
              />
              <div className="text-danger">{errors.img}</div>
            </div>
            <div className="d-flex">
              <div> Price:$ </div>
              <input
                type="text"
                className="form-control ms-2"
                value={product.price}
                onChange={(e) => {
                  setProduct({ ...product, price: e.target.value });
                }}
              ></input>
              <div className="text-danger">{errors.price}</div>
            </div>
            <div className="d-flex mt-2">
              <label>Gender</label>
              <div className="ms-2 me-2">
                <input
                  type="radio"
                  id="male"
                  className="form-check-input me-1"
                  name="gender"
                  value="male"
                  onChange={(e) => {
                    setProduct({ ...product, gender: e.target.value });
                  }}
                  checked={product.gender === "male"}
                />
                <label>Male</label>
              </div>
              <div className="ms-2 me-3">
                <input
                  type="radio"
                  id="female"
                  className="form-check-input me-1"
                  name="gender"
                  value="female"
                  onChange={(e) => {
                    setProduct({ ...product, gender: e.target.value });
                  }}
                  checked={product.gender === "female"}
                />
                <label>Female</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="unisex"
                  className="form-check-input me-1"
                  name="gender"
                  value="unisex"
                  onChange={(e) => {
                    setProduct({ ...product, gender: e.target.value });
                  }}
                  checked={product.gender === "unisex"}
                />
                <label>Unisex</label>
              </div>
              <div className="text-danger">{errors.gender}</div>
            </div>
            <div className="category-filter filter mt-3">
              <div>Category</div>
              <div className="d-flex mt-2">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={product.category}
                  onChange={(e) => {
                    setProduct({ ...product, category: e.target.value });
                  }}
                >
                  <option value="none">none</option>
                  <option value="cheap">cheap</option>
                  <option value="expensive">expensive</option>
                  <option value="extra-cheap">extra-cheap</option>
                </select>
                <div className="text-danger">{errors.category}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-info_add">
          <div className="input-group mb-3 d-block ">
            <div>
              <textarea
                type="text"
                className="form-control title_add fs-3"
                aria-label="Sizing example input"
                placeholder="Title"
                value={product.title}
                onChange={(e) => {
                  setProduct({ ...product, title: e.target.value });
                }}
              />
            </div>
            <div className="text-danger">{errors.title}</div>
          </div>
          <div className="input-group mb-3 d-block ">
            <div>
              <textarea
                type="text"
                className="form-control description_add"
                aria-label="Sizing example input"
                placeholder="Description"
                value={product.description}
                onChange={(e) => {
                  setProduct({ ...product, description: e.target.value });
                }}
              />
            </div>
            <div className="text-danger">{errors.description}</div>
          </div>
        </div>
      </div>
      <div className="product-actions_edit">
        <button
          className="btn btn-success edit-btn"
          onClick={() => onSave(product.id)}
        >
          Save
        </button>
        <button
          className="btn btn-danger edit-btn "
          onClick={() => onCancel(product.id)}
        >
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
};

export default ProductEdit;
