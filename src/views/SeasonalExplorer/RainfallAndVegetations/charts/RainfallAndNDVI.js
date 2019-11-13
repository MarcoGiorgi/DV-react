import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import ChartBase from './ChartBase';


class RainfallAndNDVIChart extends ChartBase {
  constructor(props) {
    super(props);
    this.chartType = 'mix-chart';
    this.embedChartType = 'rainfall-ndvi';
    this.title = 'seasonal_explorer.rev.visualizations.chart.rainfall_ndvi.title';
  }

  renderInfoModal() {
    return (
      <Modal show={this.state.showModal} onHide={() => this.toggleInfoModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{this.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This plot shows both Rainfall and NDVI values for the selected year and their average, i.e. brings together
            the two plots on the left. This allows a user to understand the relationship in the timings of rainfall and
            vegetation variation as the season unfolds. In particular for areas with well defined dry and wet seasons,
            users should see a well-defined linkage between the rainfall and the vegetation seasonal cycle.
          </p>
          <p>The average data provides an idea of the usual seasonal cycle and its timings:</p>
          <ul>
            <li>Early rainfall followed by increases in NDVI.</li>
            <li>Peak in rainfall preceding the peak in NDVI.</li>
            <li>NDVI decreasing after the rainfall drops off at the end of the season.</li>
          </ul>
          <p>
            For very wet locations, with year round rainfall, users will see little if any linkage between the two and
            may see a very flat NDVI curve with high values. Users can then compare the current season with the average
            one in terms of these.
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
)(RainfallAndNDVIChart);
