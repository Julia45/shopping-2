import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ProductAdd.css";

const ProductAdd = () => {
  const history = useHistory();
  const img =
    "https://previews.123rf.com/images/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg";

  const [errors, setErrors] = useState({
    title: "",
    img: "",
    description: "",
    rating: "",
    gender: "",
    category: "",
    price: "",
  });

  const [product, setProduct] = useState({
    title: "",
    img: img,
    description: "",
    available: true,
    rating: "",
    gender: "",
    category: "none",
    price: 0,
  });

  const onCancel = () => {
    history.push(`/`);
  };

  const onSave = () => {
    const nextErrors = {
      img:
        product.img.length === 0
          ? "Required"
          : /^https?:\/\/.*\.(jpeg|jpg|png)$/.test(product.img) === false
          ? "Invalid"
          : "",
      rating: product.rating === "" ? "Required" : "",
      gender: product.gender === "" ? "Required" : "",
      category: product.category === "none" ? "Required" : "",
      title: product.title === "" ? "Required" : "",
      description: product.description === "" ? "Required" : "",
      price:
        product.price === ""
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

    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((response) => {
      response.json().then(() => {
        history.push("/");
      });
    });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="product-data_add">
          <img style={{ width: "50%" }} src={product.img}></img>
          <div className="rating-area">
            <input
              type="radio"
              id="star-5"
              name="rating"
              value="5"
              checked={product.rating === "5"}
              onChange={(e) => {
                setProduct({ ...product, rating: e.target.value });
              }}
            />
            <label htmlFor="star-5" title="Оценка «5»"></label>
            <input
              type="radio"
              id="star-4"
              name="rating"
              value="4"
              checked={product.rating === "4"}
              onChange={(e) => {
                setProduct({ ...product, rating: e.target.value });
              }}
            />
            <label htmlFor="star-4" title="Оценка «4»"></label>
            <input
              type="radio"
              id="star-3"
              name="rating"
              value="3"
              checked={product.rating === "3"}
              onChange={(e) => {
                setProduct({ ...product, rating: e.target.value });
              }}
            />
            <label htmlFor="star-3" title="Оценка «3»"></label>
            <input
              type="radio"
              id="star-2"
              name="rating"
              value="2"
              checked={product.rating === "2"}
              onChange={(e) => {
                setProduct({ ...product, rating: e.target.value });
              }}
            />
            <label htmlFor="star-2" title="Оценка «2»"></label>
            <input
              type="radio"
              id="star-1"
              name="rating"
              value="1"
              checked={product.rating === "1"}
              onChange={(e) => {
                setProduct({ ...product, rating: e.target.value });
              }}
            />
            <label htmlFor="star-1" title="Оценка «1»"></label>
            <div className="text-danger mt-2 me-2">{errors.rating}</div>
          </div>
          <div className="d-flex ">
            <div className="product-details_add">
              <input
                type="text"
                className="form-control mt-3"
                value={product.img}
                onChange={(e) => {
                  setProduct({ ...product, img: e.target.value });
                }}
              />
              <div className="text-danger">{errors.img}</div>
              <div className="d-flex mt-3">
                <div> Price:$ </div>
                <input
                  type="text"
                  className="form-control ms-2"
                  value={product.price}
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
                  }}
                />
                <div className="text-danger">{errors.price}</div>
              </div>
              <div className="d-flex mt-2">
                <label>Gender</label>
                <div className="ms-2 me-2">
                  <input
                    type="radio"
                    id="male"
                    className="form-check-input"
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
                    className="form-check-input"
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
                    className="form-check-input"
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
        <button className="btn btn-success add-btn" onClick={onSave}>
          Save
        </button>
        <button className="btn btn-danger add-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
};

export default ProductAdd;
