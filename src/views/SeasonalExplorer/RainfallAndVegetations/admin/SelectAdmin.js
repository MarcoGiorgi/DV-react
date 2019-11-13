import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import {
 Button, Popover, PopoverBody, PopoverHeader, Container, Row, Col 
} from 'reactstrap';

import { GeoJSON, Map } from 'react-leaflet';

import axios from 'axios';

import CustomScroll from 'react-custom-scroll';

import 'leaflet/dist/leaflet.css';

class SelectAdmin extends Component {
  constructor(props) {
    super(props);
    this.id = SelectAdmin.id();
    this.state = {
      popoverOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  static id() {
    return `_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  componentDidMount() {
    if (this.props.data) {
      return;
    }
    const self = this;

    // axios.get('https://dataviz.vam.wfp.org//API/GetGeoAdmins?adm0=195&admcode=195')
    axios
      .get(
        `https://dataviz.vam.wfp.org//API/GetGeoAdmins?adm0=${this.props.countryCode}&admcode=${this.props.adminCode}`
      )
      .then((response) => {
        self.setState({
          data: response.data
        });
      });

    // Load Admin1
    axios
      .get(`https://dataviz.vam.wfp.org//api/getadmins?al=${this.props.adminLevel}&ac=${this.props.adminCode}`)
      .then((response) => {
        self.setState({
          admin1: response.data
        });
      });
  }

  componentDidUpdate() {
    if (this.refs.geojson) {
      const latlngbounds = this.refs.geojson.leafletElement.getBounds(); //  new L.latLngBounds(self.layers.admin1.getBounds());
      this.refs.map.leafletElement.fitBounds(latlngbounds);
    }
  }

  keyFunction() {
    return Date.now().toString();
  }

  onHover(admincode) {
    // console.log(`Hi ${admincode}`);
    this.setState({
      hoveredAdmin: admincode
    });
  }

  render() {
    const self = this;

    const style = (feature) => {
      if (this.state.hoveredAdmin === feature.properties.Code) {
        return {
          // color: 'rgb(175, 232, 255)',
          fillColor: 'rgb(175, 232, 255)',
          color: 'rgb(124, 181, 236)',
          opacity: 1,
          weight: 1
        };
      }
      return {
        color: 'rgb(124, 181, 236)',
        fillColor: 'rgb(124, 181, 236)',
        stroke: 'rgb(red)',
        weight: 1
      };
    };

    const data = () => {
      const geodata = (this.props.data && this.props.data.geodata) || self.state.data;

      if (geodata) {
        const json = geodata;
        return <GeoJSON ref="geojson" data={json} style={style} />;
      }
    };

    const admin1 = () => {
      const admin1 = self.state.admin1 || (this.props.data && this.props.data.admins);

      if (admin1) {
        return admin1.map((
          value // id : value.admincode
        ) => (
          <li key={value.admincode}>
            <a
              href="#"
              onMouseOver={() => this.onHover(value.admincode)}
              onClick={(evt) => {
                evt.preventDefault();
                this.toggle();
                // this.setState({ selectedAdmin1: { code: value.admincode, name: value.name } });
                this.props.onSelectAdmin && this.props.onSelectAdmin({ code: value.admincode, name: value.name });
              }}
            >
              {value.name}
            </a>
          </li>
        ));
      }
    };

    const position = [-11.262, -77.712];
    return (
      <div>
        <Button id={this.id} onClick={this.toggle}>
          {(this.props.value && this.props.value.name) || this.props.text}
        </Button>
        <Popover placement="right" isOpen={this.state.popoverOpen} target={this.id} toggle={this.toggle}>
          <PopoverHeader>Make your selection</PopoverHeader>
          <PopoverBody>
            <Container>
              <Row>
                <Col sm={3}>
                  <CustomScroll scrollTo={450} heightRelativeToParent="450px" allowOuterScroll={false}>
                    <ul>{admin1()}</ul>
                  </CustomScroll>
                </Col>
                <Col sm={3}>
                  <Map ref="map" center={position} zoom={4.5} style={{ width: 520, height: 450 }}>
                    {data()}
                  </Map>
                </Col>
              </Row>
            </Container>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rav: state.seasonal.rav
});

export default connect(mapStateToProps)(SelectAdmin);
