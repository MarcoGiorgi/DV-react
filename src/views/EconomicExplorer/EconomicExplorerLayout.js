import React, { Component } from 'react';
import DefaultLayout from '../../containers/DataVizContainerMapLayout/DataVizContainerMapLayout';

import nav from './_nav';

class EconomicExplorerLayout extends Component {
  render() {
    return <DefaultLayout mainClass="internal" customSidebar={nav} redirectFrom={'/economic-explorer'} redirectTo={'/economic-explorer/food-prices/wholesale-markets'} {...this.props} />;
  }
}

export default EconomicExplorerLayout;
