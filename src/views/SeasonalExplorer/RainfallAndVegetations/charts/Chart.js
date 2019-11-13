import React, { Component } from 'react';
import $ from 'jquery';
import kendo from '@progress/kendo-ui';
import connect from 'react-redux/es/connect/connect';
import { Button, ButtonGroup } from 'reactstrap';
import ACTIONS from '../../../../modules/action';
import { Charts } from './charts';

const COUNTRY = 195;
const SERVER = 'https://dataviz.vam.wfp.org';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.charts = new Charts();
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

  renderDownloadCSVButton(varName) {
    if (varName) {
      return (
        <Button
          onClick={() =>
            this.saveGraph(
              `${SERVER}/API/DataExport?var=${varName}&areaName=Peru&adminCode=${COUNTRY}&year=${this.props.year}&dc=${this.props.coverageID}`
            )}
        >
          <i className="fa fa-download" />
          {' '}
        </Button>
      );
    }
  }

  render() {
    return (
      <div className="box box-solid">
        <div className="box-header">
          <h3 className="box-title">
            <i className="fa fa-bar-chart fa-fw" /> 
            {' '}
            {this.props.title}
          </h3>
          <ButtonGroup size="sm" className="float-right">
            {this.renderDownloadCSVButton(this.props.var)}
            <Button
              onClick={() =>
                this.saveChart(
                  `#${this.props.chartType}`,
                  `Peru_${this.props.year}_${this.props.title.replace(' ', '')}.png`
                )}
            >
              {' '}
              <i className="fa fa-file-image-o" />
              {' '}
            </Button>
            <Button onClick={() => this.props.toggleModal(this.props.docKey)}>
              <i className="fa fa-info-circle" />
              {' '}
            </Button>
          </ButtonGroup>
        </div>

        <div id={this.props.chartType} className="chart scrollable-chart" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleModal: (modalName) => dispatch(ACTIONS.SEASONALEXPLORER.toggleModal(modalName))
});

const mapStateToProps = (state) => ({
  rav: state.seasonal.rav
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);
