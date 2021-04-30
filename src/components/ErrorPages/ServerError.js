import React from "react"
import { useHistory } from "react-router-dom";


const ServerError = (props) => {
  const history = useHistory();

  const onBack = () => {
    history.push("/")
  }

  return (
    <div className="fw-bold text-center" >
      <div className="fs-2 mt-3 mb-5">
        It seems some probles happened on the server-side
    </div>
      <button className="btn btn-secondary" onClick={onBack}>Return to the main page</button>
    </div>
  )
}

export default ServerError