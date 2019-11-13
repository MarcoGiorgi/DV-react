import React, { Component } from 'react';
import { connect } from 'react-redux';

import t from '../../../i18n';

class HowItWorks extends Component {
  render() {
    return (
      <div className="content-wrapper h100">
        <section className="content h100">
          <div className="row">
            <div className="col-lg-12">
              <div className="col-lg-6">
                <h3>{t('seasonal_explorer.rev.howitworks.overview.title', {lang: this.props.language})}</h3>
                <p className="text-justify">
                  {t('seasonal_explorer.rev.howitworks.overview.text.p1', {lang: this.props.language})}
                  <br />
                  <br />
                  {t('seasonal_explorer.rev.howitworks.overview.text.p2', {lang: this.props.language})}
                  <br />
                </p>
                <p className="text-justify">
                  <strong>{t('seasonal_explorer.rev.howitworks.datacoverage.title')}</strong>
                  <br />
                  {t('seasonal_explorer.rev.howitworks.datacoverage.text', {lang: this.props.language})}
                </p>
              </div>
              <div className="col-lg-6">
                <iframe
                  width="560"
                  height="315"
                  title="WFP-VAM DataVix: Agro-Climatic"
                  src="https://www.youtube.com/embed/DHOHFyy61kY?autoplay=0&rel=0&vq=hd720"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>

              <div className="col-lg-6">
                <h3>{t('seasonal_explorer.rev.howitworks.datasources.title', {lang: this.props.language})}</h3>
                <p className="text-justify">
                  <strong>{t('seasonal_explorer.rev.howitworks.datasources.section.rainfall.title', {lang: this.props.language})}</strong>
                  <br />
                  {t('seasonal_explorer.rev.howitworks.datasources.section.rainfall.text.p1', {lang: this.props.language})}
                  <a href="http://chg.geog.ucsb.edu/data/chirps/" target="_blank" rel="noopener noreferrer">
                    http://chg.geog.ucsb.edu/data/chirps/
                  </a>
                  <br />
                  <br />
                  {t('seasonal_explorer.rev.howitworks.datasources.section.rainfall.text.p2', {lang: this.props.language})}
                </p>
                <p className="text-justify">
                  <strong>{t('seasonal_explorer.rev.howitworks.datasources.section.ndvi.title', {lang: this.props.language})}</strong>
                  <br />
                  {t('seasonal_explorer.rev.howitworks.datasources.section.ndvi.text', {lang: this.props.language})}
                </p>
                <ul>
                  <li>NASA EOSDIS Land Processes Distributed Active Archive Center (LP DAAC)</li>
                  <li>USGS/Earth Resources Observation and Science (EROS) Center</li>
                  <li>Sioux Falls, South Dakota, USA</li>
                </ul>
                <p>
                  <a href="http://reverb.earthdata.nasa.gov" target="_blank" rel="noopener noreferrer">
                    http://reverb.earthdata.nasa.gov
                  </a>
                </p>
                <p className="text-justify">
                  Product codes are: MOD13C1 (Terra) and MYD13C1 (Aqua)
                  <br />
                  Earth Observing System ClearingHOuse (ECHO) / Reverb, Version 10.X
                  <br />
                  Greenbelt, MD: EOSDIS, Goddard Space Flight Center (GSFC) National Aeronautics and Space
                  Administration (NASA)
                </p>
                <p>
                  <strong>Administrative Divisions:</strong>
                </p>
                <ul>
                  <li>
                    <a href="http://www.un.org/en/member-states/" target="_blank" rel="noopener noreferrer">
                      United Nations – Member States
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://www.fao.org/geonetwork/srv/en/metadata.show?id=12691"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Global Administrative Unit Layers (GAUL)
                    </a>
                    ,
                    {' '}
                    <a
                      href="http://www.fao.org/giews/english/shortnews/GAUL1.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Methodology
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language
});

export default connect(
  mapStateToProps,
)(HowItWorks);
