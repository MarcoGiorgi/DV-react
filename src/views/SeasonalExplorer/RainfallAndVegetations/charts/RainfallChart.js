import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import ChartBase from './ChartBase';

class RainfallChart extends ChartBase {
  constructor(props) {
    super(props);
    this.chartType = 'rfh-chart';
    this.var = 'rfh';
    this.title = 'seasonal_explorer.rev.visualizations.chart.rainfall.title';
    this.embedChartType = 'rainfall';
  }

  renderInfoModal() {
    return (
      <Modal show={this.state.showModal} onHide={() => this.toggleInfoModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{this.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This plot shows rainfall amounts for the selected year (dark blue) and for the long term average (20 years,
          1994-2013) in light blue. At a glance, you can perceive the general timing of the rainfall season for the area
          of interest and how the selected year has developed. In particular look for periods with consistently above or
          below average rainfall, particularly during the early stages of the season and during critical times for crop
          development.
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
)(RainfallChart);

