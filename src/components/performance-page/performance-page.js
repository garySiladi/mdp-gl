// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TitledSection } from '../titled-section';
import { Graph } from '../chart';
import { SectionHeader, SectionTitle } from '../section-header';
import { fetchPerformanceData, receivedPerformanceData } from '../../api';
import { PerformanceDataType } from '../../store';

type Props = {
  +actions: {
    +dispatchReceivedPerformanceData: Function,
  },
  +performance: Array<PerformanceDataType>,
}

class PerformancePage extends React.Component<{}> {
  componentWillMount() {
    fetchPerformanceData(this.props.actions.dispatchReceivedPerformanceData);
  }
  props: Props;
  render() {
    return (
      <div className="performance">
        <SectionHeader>
          <Link to="/">
            <SectionTitle title="Patients" />
          </Link>
          <SectionTitle title="Analysis Performance / Details" />
        </SectionHeader>
        <div className="graph-section">
          {this.props.performance.map(entry => (
            <div key={entry.title}>
              <TitledSection title={entry.title}>
                <Graph values={entry.values} medianValues={entry.medianValues} />
              </TitledSection>
              <TitledSection title={'Horizontal Axis'} key={'Horizontal Axis'}>
                <div>
                  {entry.title.includes('Accuracy') ?
                    'Number of epochs.' :
                    'Shows the number of already passed epochs at a given point.'
                  }
                </div>
              </TitledSection>
              <TitledSection title={'Vertical Axis'} key={'Vertical Axis'}>
                <div>
                  {entry.title.includes('Accuracy') ?
                    'The portion of correctly classified examples.' :
                    'Average error of the algorithm.'
                  }
                </div>
              </TitledSection>
              <TitledSection title={'Continuous Objective'} key={'Continuous Objective'}>
                <div>
                  {entry.title.includes('Accuracy') ?
                    'To increase the amount of correct classifications.' :
                    'To continually improve and decrease the error rate.'
                  }
                </div>
              </TitledSection>
              <TitledSection title={'Final Goal'} key={'Final Goal'}>
                <div>
                  {entry.title.includes('Accuracy') ?
                    'To increase accuracy as much as possible.' :
                    'To reach as low error value as possible.'
                  }
                </div>
              </TitledSection>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

PerformancePage.defaultProps = {
  performance: [],
};

const mapStateToProps = ({ performance }) => ({
  performance,
});

const mapDispatchToProps = dispatch => ({
  actions:
    bindActionCreators({
      dispatchReceivedPerformanceData: receivedPerformanceData,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PerformancePage);
