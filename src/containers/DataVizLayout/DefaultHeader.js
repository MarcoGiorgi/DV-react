import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/logo.svg';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{
 src: logo, width: 200, height: 80, alt: 'Food Security Analysis' 
}}
          minimized={{
 src: sygnet, width: 30, height: 30, alt: 'Food Security Analysis' 
}}
        />

        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
