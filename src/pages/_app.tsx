import React from "react";
import App from 'next/app';
import { ThemeProvider } from "../contexts/theme-context";
import PageLayout from "../layout";

import "../assets/styles/main.scss";

class ReportViewerApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ThemeProvider>
    )
  }
}

export default ReportViewerApp;