import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import ChartBase from './ChartBase';


class NdviChart extends ChartBase {
  constructor(props) {
    super(props);
    this.chartType = 'vim-chart';
    this.embedChartType = 'ndvi';
    this.var = 'vim';
    this.title = 'seasonal_explorer.rev.visualizations.chart.ndvi.title';
  }

  renderInfoModal() {
    return (
      <Modal show={this.state.showModal} onHide={() => this.toggleInfoModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{this.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This plot shows NDVI values for the selected year and for a medium term average (12 years, 2002-2013). At a
          glance, you can perceive the general timing of the growing season for the area of interest and how the
          selected year has developed. In particular look for periods with consistently above or below average NDVI,
          particularly during the early stages of the season and during critical times for crop development.
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
)(NdviChart);
