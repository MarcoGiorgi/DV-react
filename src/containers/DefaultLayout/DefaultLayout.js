import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

import wfpLogo from '../../assets/img/brand/wfp-logo-extended-white-es.svg';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));



class DefaultLayout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-spinner sk-spinner-pulse" />
    </div>
  );

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader >
              <img src={wfpLogo} width={260}/>
            </AppSidebarHeader>
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={this.props.customSidebar || navigation(this.props.language)} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className={this.props.mainClass || 'main'}>
              { this.props.location.pathname !== '/dashboard' && <AppBreadcrumb appRoutes={routes(this.props.language)} />}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  <Redirect exact from={this.props.redirectFrom || '/'} to={this.props.redirectTo || '/dashboard'} />
                  {routes(this.props.language).map((route, idx) =>
                    (route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null))}
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language
});

export default connect(
  mapStateToProps,
)(DefaultLayout);
