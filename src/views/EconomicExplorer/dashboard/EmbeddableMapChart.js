import React, {Component} from 'react';
import MapChart from "./MapChart";
import * as moment from 'moment';
import '../style.scss';
import {Col, Row} from "reactstrap";

class EmbeddableMapChart extends Component {
  render() {

    const {startDate, categoryCode, categoryName, width, height} = this.props.match.params;

    const parsedStartDate = moment(startDate, 'DD-MM-YYYY').toDate();
    return (
      <Row>
        <Col style={{textAlign: "-webkit-center"}}>
          <MapChart
            width={width || 650}
            height={height || 580}
            category={{code: categoryCode, name: categoryName}}
            startDate={parsedStartDate}
            title={`Lima M.: Regiones que abastecen de ${categoryName} al Mercado del Productores de Santa Anita durante ${moment(parsedStartDate).format('MMMM')} del ${moment(parsedStartDate).subtract(1, 'year').format('YYYY')}`}
          />
        </Col>
      </Row>
    )
  }
}

export default EmbeddableMapChart;
