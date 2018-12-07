// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Store } from '../store';
import history from './history';
import { Header } from '../components/header';
import { BackButton } from '../components/back-button';
import { Homepage } from '../components/home-page';
import { Analysis } from '../components/analysis-page';
import { PatientPage } from '../components/patient-page';
import { PerformancePage } from '../components/performance-page';
import { ModelPage } from '../components/model-page';

class App extends React.Component<{}> { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Store>
        <Router history={history}>
          <div>
            <Header />
            <div className="content">
              <Route path="/(.+)" component={BackButton} />
              <div className="content-body">
                <Route exact path="/" component={Homepage} />
                <Route path="/performance" component={PerformancePage} />
                <Route path="/analysis" component={Analysis} />
                <Route path="/patient" component={PatientPage} />
                <Route path="/model/:id" component={ModelPage} />
              </div>
            </div>
          </div>
        </Router>
      </Store>
    );
  }
}

export default App;
