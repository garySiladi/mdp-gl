// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { fetchPatients, receivedPatients, selectPatient } from '../../api';
import TableViewer from './table-viewer';
import PageSize from './page-size';
import SearchBar from './search-bar';
import { Icon } from '../image';
import type { Patient } from '../../store';

type Props = {
  +actions: {
    +dispatchReceivedPatients: Function,
    +dispatchSelectedPatient: Function,
  },
  +data: {
    patientList: Array<Patient>,
  }
};

class TableWrapper extends React.Component<> {
  static filterResults(list = [], keyword) {
    return list.filter(patient => patient.name.includes(keyword));
  }

  constructor(props) {
    super(props);
    this.state = {
      searchedValue: '',
      pageSize: 20,
      page: 1,
    };
  }

  componentWillMount() {
    fetchPatients(this.props.actions.dispatchReceivedPatients);
  }

  props:Props
  render() {
    const { data: { patientList }, actions } = this.props;
    const { searchedValue, page, pageSize } = this.state;
    const filteredResults = TableWrapper.filterResults(patientList, searchedValue);
    const from = ((page - 1) * pageSize) + 1;
    const to = page * pageSize > filteredResults.length ? filteredResults.length : page * pageSize;
    return (
      <div>
        <div className="table-header">
          <PageSize onChange={e => { this.setState({ pageSize: Number(e.target.value) }); }} />
          <SearchBar onChange={e => { this.setState({ searchedValue: e.target.value }); }} />
          <div className="icon-aligner">
            <Icon name="printer" />
          </div>
        </div>
        <TableViewer
          data={filteredResults.slice(from - 1)}
          handleSelectPatient={actions.dispatchSelectedPatient}
          pageSize={pageSize}
        />
        <div className="table-footer">
          <span className="pagination-info">
            {`Showing ${ from } to ${ to } of ${ filteredResults.length } patients`}
          </span>
          <span className="pagination-buttons">
            {
              Array(Math.ceil(filteredResults.length / pageSize)).fill().map((_, i) => (
                <button
                  key={String(i)}
                  className={classnames({
                    'selected-page': i + 1 === page,
                  })}
                  onClick={() => { this.setState({ page: i + 1 }); }}
                >
                  {i + 1}
                </button>
              ))
            }
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch => ({
  actions:
    bindActionCreators({
      dispatchReceivedPatients: receivedPatients,
      dispatchSelectedPatient: selectPatient,
    }, dispatch),
});

TableWrapper.defaultProps = {
  actions: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableWrapper);
