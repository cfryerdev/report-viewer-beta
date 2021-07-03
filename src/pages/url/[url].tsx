import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Summary from "../../components/summary";
import LoaderUrl from "../../components/loaders/loader-url";
import Information from "../../components/information";
import Scenarios from "../../components/scenarios";
import Latency from "../../components/latency";
import Codes from "../../components/codes";
import Errors from "../../components/errors";
import Phases from "../../components/phases";
import GraphLatency from "../../components/graphs/graph-latency";
import GraphReqLoad from "../../components/graphs/graph-reqload";
import GraphCodes from "../../components/graphs/graph-codes";
import GraphTotalCodes from "../../components/graphs/graph-totalcodes";
import { ReportProvider } from "../../contexts/report-context";
import Addons from "../../components/addons";

const PageUrl = () => {
  const router = useRouter();
  const [loaded, isLoaded] = useState(false);
  const [payload, setPayload] = useState({});
  let { url } = router.query;
  return (
    <Fragment>
      <LoaderUrl url={url} shouldFetchData={!loaded && url !== undefined} loadedCallback={(data) => {
        isLoaded(true);
        setPayload(data);
      }}/>
      <ReportProvider payloadFile={payload}>
        <Summary />
        <Information />
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
            <Scenarios />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
            <Latency />
          </div>
        </div>
        <span className="print-pb">&nbsp;</span>
        <Phases />
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
            <Codes />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
            <Errors />
          </div>
        </div>
        <span className="print-pb">&nbsp;</span>
        <GraphLatency />
        <span className="print-pb">&nbsp;</span>
        <GraphReqLoad />
        <span className="print-pb">&nbsp;</span>
        <GraphCodes />
        <span className="print-pb">&nbsp;</span>
        <GraphTotalCodes />
        <span className="print-pb">&nbsp;</span>
        <Addons />
      </ReportProvider>
    </Fragment>
  );
};

export default PageUrl;
