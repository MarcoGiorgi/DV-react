import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import ChartBase from './ChartBase';

class RainfallAndNDVIAnomalies extends ChartBase {
  constructor(props) {
    super(props);
    this.chartType = 'mixAnomalies-chart';
    this.embedChartType = 'rainfall-ndvi-anomaly';
    this.title = 'seasonal_explorer.rev.visualizations.chart.rainfall_ndvi_anomalies.title';
  }

  renderInfoModal() {
    return (
      <Modal show={this.state.showModal} onHide={() => this.toggleInfoModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{this.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This plot shows both rainfall and NDVI anomalies together for the selected region and year, i.e. brings
            together the two plots on the above right. By default only the 3 month rainfall anomaly is shown, but users
            can switch on the 1 month anomaly (and switch off the 3 month anomaly) should they wish.
          </p>
          <p>
            The aim of the plot is to make more evident the linkages between rainfall and NDVI variations from their
            average. Users should expect to see a rainfall deficit (below 100%) to be followed by the NDVI dropping
            below average (100%). And the reverse for above average rainfall.
          </p>
          <p>
            However, there will be significant variations in the strength and clarity of these linkages. In wetter
            climates such linkage may simply not exist at all as variations in vegetation growth depend on drivers other
            than rainfall. But in drier semi-arid climates, where rainfall is the limiting factor for vegetation growth,
            such linkages should be strong and evident. The time lag between a rainfall anomaly and the corresponding
            NDVI anomaly (the vegetation response to that rainfall variation) also varies across regions. As a rule of
            thumb, a one month lag may be expected.
          </p>
          <p>
            Which of the two rainfall anomalies (1 or 3 months) links better with NDVI anomalies is also variable and
            has to do with the type of soil and vegetation. The 3 month rainfall anomaly on balance should provide the
            better relationship, but users are encouraged to experiment.
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
)(RainfallAndNDVIAnomalies);
