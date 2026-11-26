
import "../styles/loading.scss";

const Loading = ({ message = "Please wait..." }) => {
  return (
    <div className="loading-screen">
      <div className="loading-card">

        <div className="loader">
          <div className="loader-ring"></div>
          <div className="loader-ring inner"></div>
          <div className="loader-dot"></div>
        </div>

        <h2>Just a moment</h2>

        <p>{message}</p>

        <div className="loading-progress">
          <span></span>
        </div>

        <small>Please don't close this page</small>

      </div>
    </div>
  );
};

export default Loading;
