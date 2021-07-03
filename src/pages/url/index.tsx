import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";

const PageUrl = () => {
  const router = useRouter();
  const getCustomurl = () => { 
    if (typeof window !== 'undefined') { 
      return window.location.href;
    }
    return "~/url";
  }
  return (
    <Fragment>
      <div className="card" style={{ marginTop: 50 }}>
        <div className="card-header card-header-tabs card-header-secondary">
          Import:
        </div>
        <div className="card-body">
          <div className="tab-content">
            <div className="tab-pane active text-muted">
              You can simply access a json report from another publicly addressable endpoint by encoding it, and putting it in the url above.
              <br />
              <br />
              Example: {getCustomurl()}/SOME_URLENCODED_URL
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PageUrl;
