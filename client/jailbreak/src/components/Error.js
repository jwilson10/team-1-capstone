import { useHistory } from "react-router-dom";

function Error({ msg }) {
  const history = useHistory();

  return (
    <div className="d-flex align-items-center justify-content-center m-1">
      <div className="alert alert-danger">
        ERROR!{" "}
        {history.location.state ? ` - ${history.location.state.msg}` : ""}
        {msg}
      </div>
    </div>
  );
}

export default Error;