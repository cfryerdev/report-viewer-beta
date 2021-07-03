import React from "react";

const AddonsSelector = ({ addon, setAddonCallback }) => {
  return (
    <div className="card mb-2">
      <div className="card-header card-header-rose">
        <i className="fas fa-puzzle-piece"></i> Addon Handler (Custom Stats)
      </div>
      <div className="card-body">
        <select
          className="form-control form-select"
          id="a_addon"
          defaultValue={addon}
          onChange={(e) => setAddonCallback(e.target.value)}
        >
          <option value="raw">Raw Data</option>
          <option value="metrics-by-endpoint">Metrics By Endpoint</option>
        </select>
      </div>
      <div className="card-footer">
        <span className="stats">
          Please select from the dropdown above, different ways to view the addon data.
        </span>
      </div>
    </div>
  );
};

export default AddonsSelector;
