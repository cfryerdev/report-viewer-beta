import React, { useState, Fragment } from "react";

export interface LoaderErrorResponse {
  message: string
};

const LoaderUrl = ({ url, loadedCallback, shouldFetchData }) => {
  const [error, setError] = useState("");
  const [loading, isLoading] = useState(true);
  const loadFromUrl = () => {
    if (shouldFetchData) {
      fetch(`/api/loader/${encodeURIComponent(url)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error (${response.status}): An error occurred, please check console/network for more details.`);
          }
          return response.json();;
        })
        .then(response => {
          loadedCallback({ jsonData: response, name: decodeURIComponent(url) });
          isLoading(false);
          setError("");
        })
        .catch((err) => {
          setError(err.message);
          isLoading(false);
          loadedCallback(undefined);
          console.error(err);
        });
    }
  }
  if (error == "") {
    loadFromUrl();
  }
  return (
    <Fragment>
      <a id="import"></a>
      <div className="card" style={{ marginTop: 50 }}>
        <div className="card-header card-header-tabs card-header-secondary">
          Import:
        </div>
        <div className="card-body">
          <div className="tab-content">
            <div className="tab-pane active text-muted">
              You can simply access a json report from another publicly addressable endpoint by encoding it, and putting it in the url above.
            </div>
          </div>
        </div>
      </div>
      { error !== "" &&  
          <div className="alert alert-danger mr-2 ml-2 mt-3 mb-4">
            {error}
          </div>
      }
      { loading &&  
          <div className="alert alert-secondary mr-2 ml-2 mt-3 mb-4">
            <i className="fas fa-spinner fa-pulse"></i> Loading payload from url ...
          </div>
      }
    </Fragment>
  );
};

export default LoaderUrl;
