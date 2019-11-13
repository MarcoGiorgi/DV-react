import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import ChartBase from './ChartBase';

class RainfallAnomalyChart extends ChartBase {
  constructor(props) {
    super(props);
    this.chartType = 'rfhAnomaly-chart';
    this.embedChartType = 'rainfall-anomaly';
    this.var = 'rfhanomalies';
    this.title = 'seasonal_explorer.rev.visualizations.chart.rainfall_anomalies.title';
  }

  renderInfoModal() {
    return (
      <Modal show={this.state.showModal} onHide={() => this.toggleInfoModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{this.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This plot shows rainfall anomalies for the selected region and year. Two anomalies are shown, with time
            spans of one and three months. By anomaly we mean a comparison with the long term average: here we show the
            ratio between rainfall for the current year and the average, expressed in percentage terms - this is done
            for rainfall of one month and three months duration.
          </p>
          <p>
            <b>Example</b>
:
            <br />
A value of 73% of the three month anomaly in the second dekad of August means that the
            rainfall for the three month period ending in August 20 has been 73% of the average. For an average amount
            of 120mm this would mean a current 3 month rainfall of 87.6mm.
          </p>
          <p>
            <b>Interpretation</b>
:
            <br />
            Values below 100% represent rainfall deficits, above 100% rainfall surplus. Note that 1 month anomalies are
            more erratic than 3 month anomalies and will reach more extreme values as you would expect. Values between
            90% and 110% are considered as being within the range of normal variability for both anomalies.
          </p>
          <p>
            <b>Note</b>
: For locations with very low rainfall or during dry-season periods, anomalies can take extreme
            values: e.g. if on average you get 2mm and in one particular month you get 8mm, the one month anomaly will
            be 400%.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.toggleInfoModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language
});

export default connect(
  mapStateToProps,
)(RainfallAnomalyChart);

