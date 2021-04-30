import React from "react"
import { useHistory } from "react-router-dom";


const NotFoundPage = () => {
  const history = useHistory();

  const onBack = () => {
    history.push("/")
  }
  return (
    <div className="fw-bold text-center" >
      <div className="fs-2 mt-3 mb-5">
        Oops, the page you are looking for doesn't exist
    </div>
      <button className="btn btn-secondary" onClick={onBack}>Return to the main page</button>
    </div>
  )
}

export default NotFoundPage