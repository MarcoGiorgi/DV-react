import {
 Button, Card, CardBody, CardHeader, Collapse 
} from 'reactstrap';
import React from 'react';

const COUNTRY = 195;
const SERVER = 'https://dataviz.vam.wfp.org';

export class AbstractLayer {
  constructor() {
    this.layers = {};
  }

  getCountryCode() {
    return COUNTRY;
  }

  getServerAddress() {
    return SERVER;
  }

  createLayerContent(stateManager, title, layername, content) {
    return (
      <Card style={{ width: 274 }}>
        <CardHeader>
          <Button
            block
            color="link"
            className="text-left m-0 p-0"
            onClick={() => stateManager.toggleLegend(layername)}
            aria-expanded={stateManager.state.legend[layername]}
            aria-controls="collapseOne"
          >
            <h5 className="m-0 p-0">{title}</h5>
          </Button>
        </CardHeader>
        <Collapse
          isOpen={stateManager.state.legend[layername]}
          data-parent="#accordion"
          id="collapseOne"
          aria-labelledby="headingOne"
        >
          <CardBody>{content}</CardBody>
        </Collapse>
      </Card>
    );
  }
}
