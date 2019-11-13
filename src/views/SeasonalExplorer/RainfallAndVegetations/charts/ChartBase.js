import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import $ from 'jquery';
import kendo from '@progress/kendo-ui';
import { ToastContainer, toast } from 'react-toastify';
import copy from 'clipboard-copy';
import 'react-toastify/dist/ReactToastify.css';
import t from '../../../../i18n';

import { Charts } from './charts';

const COUNTRY = 195;
const SERVER = 'https://dataviz.vam.wfp.org';

class ChartBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.charts = new Charts();
    this.title = this.title || this.props.title;
  }

  saveGraph(url) {
    setTimeout(() => {
      const response = {
        file: url
      };
      // server sent the url to the file!
      // now, let's download:
      window.open(response.file);
      // you could also do:
      // window.location.href = response.file;
    }, 100);
  }

  saveChart(chartId, filename) {
    const chart4p = $(chartId).getKendoChart();
    chart4p.exportImage().done((data) => {
      kendo.saveAs({
        dataURI: data,
        fileName: filename
      });
    });
  }

  toggleInfoModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  getYear() {
    if (this.props.match) {
      const { year } = this.props.match && this.props.match.params;
      return year;
    }
    return this.props.year;
  }

  getCoverageID() {
    if (this.props.match) {
      const { coverageID } = this.props.match && this.props.match.params;
      return coverageID;
    }
    return this.props.coverageID;
  }

  componentDidMount() {
    this.charts.reInit({
      year: this.getYear(),
      coverageID: this.getCoverageID()
    });

    window.onresize = () => {
      this.charts.reInit({
        year: this.getYear(),
        coverageID: this.getCoverageID()
      });
    };
  }

  renderDownloadCSVButton(varName) {
    if (varName) {
      return (
        <Button
          onClick={() =>
            this.saveGraph(
              `${SERVER}/API/DataExport?var=${
                this.var
              }&areaName=Peru&adminCode=${COUNTRY}&year=${this.getYear()}&dc=${this.getCoverageID()}`
            )}
        >
          <i className="fa fa-download" />
          {' '}
        </Button>
      );
    }
  }

  renderInfoModal() {}

  renderToastContainer() {
    if (this.props.match) {
      return <ToastContainer />;
    }
  }

  render() {

    const getTitle = () => {
      return t(this.props.title || this.title, {lang: this.props.language});
    };

    return (
      <div className="box box-solid">
        {this.renderToastContainer()}
        <div className="box-header">
          <h3 className="box-title">
            <i className="fa fa-bar-chart fa-fw" /> 
            {' '}
            {getTitle()}
          </h3>
          <ButtonGroup size="sm" className="float-right" style={{ zIndex: 1000 }}>
            {this.renderDownloadCSVButton(this.var)}
            <Button
              onClick={() =>
                this.saveChart(`#${this.chartType}`, `Peru_${this.getYear()}_${this.title.replace(' ', '')}.png`)}
            >
              {' '}
              <i className="fa fa-file-image-o" />
              {' '}
            </Button>
            <Button onClick={() => this.toggleInfoModal()}>
              <i className="fa fa-info-circle" />
              {' '}
            </Button>
            <Button
              onClick={() => {
                copy(
                  `<iframe width="100%" height="100%" src='${window.location.protocol}//${
                    window.location.host
                  }/#/embed/rev/visualizations/${this.embedChartType}/${this.getYear()}/${this.getCoverageID()}' />`
                ).then(toast('Code to embed has been copied to the clipboard'));
              }}
            >
              <i className="fa fa-clipboard" />
              {' '}
            </Button>
          </ButtonGroup>
        </div>

        {this.renderInfoModal()}
        <div id={this.chartType} className="chart scrollable-chart" />
      </div>
    );
  }
}

export default ChartBase;
