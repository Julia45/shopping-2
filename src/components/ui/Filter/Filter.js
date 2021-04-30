import React, { useState } from "react"
import "./Filter.css"
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'


const Filter = ({ initialFilters, filterProducts, handleSearch, page, user }) => {
  const [filters, setFilters] = useState(initialFilters)
  const [error, setError] = useState(undefined)
  const [search, setSearch] = useState("")
  const history = useHistory();


  const validatePrice = (valuefrom, valueTo) => {
    if (valuefrom.length === 0 || valueTo.length === 0) {
      return ''
    } else if (/[a-zA-Z]/.test(valuefrom) || /[a-zA-Z]/.test(valueTo)) {
      return "Enter Digits Only"
    }
    return ""
  }

  const handleApply = (e) => {
    e.preventDefault()
    setSearch("")
    filterProducts(filters, page)
    setError(validatePrice(filters.priceFrom, filters.priceTo))
  }

  const handleClear = (e) => {
    setFilters(initialFilters)
    setSearch("")
  }

  return (
    <React.Fragment>
      <form>
        <div className="filter-container">

          <div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={filters.available}
                onChange={(e) => { setFilters({ ...filters, availability: e.target.checked }) }}
              />
              <label className="form-check-label">Available only</label>
            </div>

            <div className="d-flex mt-2">
              <label>Gender</label>
              <div className="ms-2 me-2">
                <input type="radio" id="male" className="form-check-input me-1" name="gender" value="male" onChange={(e) => { setFilters({ ...filters, gender: e.target.value }) }} checked={filters.gender === 'male'} />
                <label>Male</label>
              </div>
              <div className="ms-2 me-3" >
                <input type="radio" id="female" className="form-check-input me-1" name="gender" value="female" onChange={(e) => { setFilters({ ...filters, gender: e.target.value }) }} checked={filters.gender === 'female'} />
                <label>Female</label>
              </div>
              <div >
                <input type="radio" id="unisex" className="form-check-input me-1" name="gender" value="unisex" onChange={(e) => { setFilters({ ...filters, gender: e.target.value }) }} checked={filters.gender === 'unisex'} />
                <label>Unisex</label>
              </div>
            </div>
          </div>

          <div className="category-filter filter">
            <label>
              <div>
                Category
             </div>
              <div>
                <select className="form-select" aria-label="Default select example" onChange={(e) => { setFilters({ ...filters, category: e.target.value }) }} value={filters.category}>
                  <option value="none" >none</option>
                  <option value="cheap" >cheap</option>
                  <option value="expensive" >expensive</option>
                  <option value="extra-cheap" >extra-cheap</option>
                </select>
              </div>
            </label>
          </div>

          <div className="rating-filter filter">
            <label>
              <div>
                Rating
             </div>
              <div>
                <input
                  className="form-control"
                  type="number"
                  onChange={(e) => { setFilters({ ...filters, rating: e.target.value }) }}
                  value={filters.rating.value}
                  min="1" max="5" />
              </div>
            </label>
          </div>


          <div className="price-filter filter">
            <div>
              Price
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control priceFrom"
                placeholder="From"
                value={filters.priceFrom}
                onChange={(e) => { setFilters({ ...filters, priceFrom: e.target.value }) }} />
              <input type="text"
                className="form-control priceTo"
                placeholder="To"
                value={filters.priceTo}
                onChange={(e) => { setFilters({ ...filters, priceTo: e.target.value }) }} />
            </div>
            <div style={{ color: "red", fontWeight: "bold", fontSize: "13px" }}>{error}</div>
          </div>

          <div className="filter-actions">
            <button className="btn btn-danger me-3 ms-3" onClick={handleClear} >Clear</button>
            <button className="btn btn-success" onClick={handleApply}>Apply</button>
          </div>
        </div>
      </form>

      <div className="addFunc-container">
        {
          user?.role === "admin" ? (
            <button className="btn btn-outline-primary" onClick={() => { history.push(`/new`) }} >Add Product</button>
          ) : null

        }
        <div className="d-flex">
          <input className="form-control me-2 mt-2" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." aria-label="Search" />
          <button className="btn btn-outline-success mt-2" onClick={() => handleSearch(search, page)} type="submit">Search</button>
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

export default connect(mapStateToProps)(Filter);


