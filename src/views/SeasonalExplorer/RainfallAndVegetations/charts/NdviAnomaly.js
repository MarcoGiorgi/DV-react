import React from 'react';
import { Button } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import ChartBase from './ChartBase';
import { connect } from 'react-redux';

class NdviAnomaly extends ChartBase {
  constructor(props) {
    super(props);
    this.chartType = 'vimAnomaly-chart';
    this.embedChartType = 'ndvi-anomaly';
    this.var = 'vimanomalies';
    this.title = 'seasonal_explorer.rev.visualizations.chart.ndvi_anomalies.title';
  }

  renderInfoModal() {
    return (
      <Modal show={this.state.showModal} onHide={() => this.toggleInfoModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{this.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This plot shows NDVI anomalies for the selected region and year. A single anomaly is shown calculated based
            on the 10 day data. Unlike rainfall no aggregation at given time spans is required, since vegetation itself
            already integrates the effect of previous rainfall. Anomalies are defined in the same way as for rainfall -
            as the ratio between NDVI for the current year and the average at each time step expressed in percentage
            terms.
          </p>
          <p>
            <b>Example</b>
:
            <br />
A value of 87% of the NDVI anomaly in the second dekad of August means that the NDVI at
            this point in time is 87% of the average. For an average NDVI of 0.6 this would mean a current season NDVI
            of 0.52
          </p>
          <p>
            <b>Interpretation</b>
:
            <br />
            Values below 100% represent vegetation cover deficits, above 100% vegetation cover above average. Note that
            NDVI anomalies are much smoother than those of rainfall, since vegetation is naturally far more stable than
            rainfall. Broadly values between 90% and 110% are considered as being within the range of normal
            variability.
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
)(NdviAnomaly);
