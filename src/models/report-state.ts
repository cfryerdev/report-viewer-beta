import ReportPayload from "./report-payload";

export default class ReportState {
  loadReport: Function;
  hasCustomMetrics: Boolean;
  isLoaded: Boolean;
  resetReport: Function;
  loadFromUrl: Function;
  report?: {
    name: String,
    version: Number,
    results?: ReportPayload
  };

  constructor(
    _loadReport: Function,
    _resetReport: Function,
    _loadFromUrl: Function,
    _hasCustomMetrics: Boolean
  ) {
    this.loadReport = _loadReport;
    this.resetReport = _resetReport;
    this.loadFromUrl = _loadFromUrl;
    this.hasCustomMetrics = false; 
    this.isLoaded = false; 
    const obj = {
      name: '',
      version: null,
      results: new ReportPayload()
    }
    this.report = obj;
  }
};