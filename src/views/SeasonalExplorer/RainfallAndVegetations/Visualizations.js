import React, { Component } from 'react';
import { connect } from 'react-redux';
import HorizontalTimeline from 'react-horizontal-timeline';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
 Button, ButtonGroup, Col, Container, Row 
} from 'reactstrap';
import { Charts } from './charts/charts';
import {
  NdviAnomaly,
  NdviChart,
  RainfallAndNDVIAnomalies,
  RainfallAndNDVIChart,
  RainfallAnomalyChart,
  RainfallChart
} from './charts';
import SelectAdmin from './admin/SelectAdmin';
import ACTIONS from '../../../modules/action';

import './style.scss';

import t from '../../../i18n';

const COUNTRY = 195;

class Visualizations extends Component {
  constructor(props) {
    super(props);

    this.charts = new Charts();

    this.values = [];

    this.state = {
      value: 0
    };

    // init the timeline:
    for (let i = new Date().getFullYear(); i > 1980; i--) {
      this.values.push(i.toString());
    }
  }

  getLabel(date) {
    return new Date(date).getFullYear().toString();
  }

  componentWillMount() {
    this.resetPage(false);
  }

  resetPage(refreshGraphs) {
    this.props.resetPage();
    if (refreshGraphs) {
      this.charts.reInit({
        year: this.props.rav.visualizations.year,
        coverageID: this.props.rav.visualizations.coverageID
      });
    }
  }

  render() {
    const self = this;

    const selectAdmin2 = () => {
      if (this.props.rav.visualizations.selectedAdmin1) {
        return (
          <SelectAdmin
            key={this.props.rav.visualizations.selectedAdmin1}
            value={this.props.rav.visualizations.selectedAdmin2}
            countryCode={COUNTRY}
            adminCode={this.props.rav.visualizations.selectedAdmin1.code}
            adminLevel={2}
            text={t('seasonal_explorer.rev.visualizations.button.select_admin2', {lang: this.props.language})}
            data={this.props.rav.visualizations.admin2}
            onSelectAdmin={(admin) => {
              this.charts.changeAdm2(admin);
              this.props.selectedAdmin2(admin);
            }}
          />
        );
      }
    };

    return (
      <div>
        <ToastContainer />
        <div>
          <ButtonGroup>
            <Button onClick={() => this.resetPage(true)} style={{ marginBottom: 20 }}>
              Peru
            </Button>
            <SelectAdmin
              value={this.props.rav.visualizations.selectedAdmin1}
              countryCode={COUNTRY}
              adminCode={COUNTRY}
              adminLevel={1}
              text={t('seasonal_explorer.rev.visualizations.button.select_admin1', {lang: this.props.language})}
              onSelectAdmin={(admin) => {
                  console.log(admin);
                this.charts.changeAdm1(admin);
                this.props.selectedAdmin1(admin);
              }}
            />
            {selectAdmin2()}
          </ButtonGroup>
        </div>
        <ButtonGroup>
          <Button
            onClick={() =>
              this.props.changeCoverageID(3)
              && this.charts.reInit({
                year: this.props.rav.visualizations.year,
                coverageID: 3,
                admin1: this.props.rav.visualizations.selectedAdmin1,
                admin2: this.props.rav.visualizations.selectedAdmin2
              })}
            active={this.props.rav.visualizations.coverageID === 3}
          >
            {t('seasonal_explorer.rev.visualizations.button.cropland', {lang: this.props.language})}
          </Button>
          <Button
            onClick={() =>
              this.props.changeCoverageID(1)
              && this.charts.reInit({
                year: this.props.rav.visualizations.year,
                coverageID: 1,
                admin1: this.props.rav.visualizations.selectedAdmin1,
                admin2: this.props.rav.visualizations.selectedAdmin2
              })}
            active={this.props.rav.visualizations.coverageID === 1}
          >
            {t('seasonal_explorer.rev.visualizations.button.all', {lang: this.props.language})}
          </Button>
          <Button
            onClick={() =>
              this.props.changeCoverageID(2)
              && this.charts.reInit({
                year: this.props.rav.visualizations.year,
                coverageID: 2,
                admin1: this.props.rav.visualizations.selectedAdmin1,
                admin2: this.props.rav.visualizations.selectedAdmin2
              })}
            active={this.props.rav.visualizations.coverageID === 2}
          >
            {t('seasonal_explorer.rev.visualizations.button.pasture', {lang: this.props.language})}
          </Button>
        </ButtonGroup>
        <div style={{ width: '100%', height: '100px', margin: '0 auto' }}>
          <HorizontalTimeline
            styles={{
              outline: '#999999',
              foreground: '#999999',
              background: '#FDFDFD'
            }}
            getLabel={this.getLabel}
            index={this.state.value}
            minEventPadding={20}
            maxEventPadding={20}
            indexClick={(index) => {
              this.setState({ value: index, previous: this.state.value });
              this.props.changeYear(parseInt(this.values[index]));
              this.charts.changeYear(parseInt(this.values[index]));
              // refreshData();
            }}
            values={this.values}
          />
        </div>
        <Container fluid style={{ padding: '0 30px' }}>
          <Row>
            <Col xs="12" sm="12" lg="6">
              <RainfallChart
                year={self.props.rav.visualizations.year}
                coverageID={this.props.rav.visualizations.coverageID}
              />
            </Col>
            <Col xs="12" sm="12" lg="6">
              <RainfallAnomalyChart
                year={self.props.rav.visualizations.year}
                coverageID={this.props.rav.visualizations.coverageID}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" lg="6">
              <NdviChart
                year={self.props.rav.visualizations.year}
                coverageID={this.props.rav.visualizations.coverageID}
              />
            </Col>
            <Col xs="12" sm="12" lg="6">
              <NdviAnomaly
                year={self.props.rav.visualizations.year}
                coverageID={this.props.rav.visualizations.coverageID}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" lg="6">
              <RainfallAndNDVIChart
                year={self.props.rav.visualizations.year}
                coverageID={this.props.rav.visualizations.coverageID}
              />
            </Col>
            <Col xs="12" sm="12" lg="6">
              <RainfallAndNDVIAnomalies
                year={self.props.rav.visualizations.year}
                coverageID={this.props.rav.visualizations.coverageID}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetPage: () => dispatch(ACTIONS.SEASONALEXPLORER.resetPage()),
  changeYear: (newYear) => dispatch(ACTIONS.SEASONALEXPLORER.changeYear(newYear)),
  changeCoverageID: (newCoverageID) => dispatch(ACTIONS.SEASONALEXPLORER.changeCoverageID(newCoverageID)),
  toggleModal: (modalName) => dispatch(ACTIONS.SEASONALEXPLORER.toggleModal(modalName)),
  selectedAdmin1: (newAdmin1) => dispatch(ACTIONS.SEASONALEXPLORER.selectAdmin1(newAdmin1)),
  selectedAdmin2: (newAdmin2) => dispatch(ACTIONS.SEASONALEXPLORER.selectAdmin2(newAdmin2))
});

const mapStateToProps = (state) => ({
  language: state.language,
  rav: state.seasonal.rav
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visualizations);
