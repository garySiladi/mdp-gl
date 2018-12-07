// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import { formatDate } from '../../util';

type TableViewerDataProps = {
  +id: string,
  +name: string,
  +phone: string,
  +studyCount: string,
  +lastStudyDate: string,
};

type TableViewerProps = {
  +data: Array<TableViewerDataProps>,
  handleSelectPatient: () => void,
  +pageSize: number,
};

const TableViewer = ({ data, handleSelectPatient, pageSize }: TableViewerProps) => (
  <div className="table-viewer">
    <ReactTable
      data={data}
      columns={[
        {
          Header: 'Patient',
          accessor: 'name',
        },
        {
          Header: 'Patient ID',
          accessor: 'id',
        },
        {
          Header: 'Studies',
          accessor: 'studyCount',
          className: 'study-count',
          headerClassName: 'study-count',
        },
        {
          Header: 'Last Study',
          accessor: 'lastStudyDate',
          className: 'last-study',
          headerClassName: 'last-study',
          Cell: row => (
            <div>
              {formatDate(row.original.lastStudyDate)}
            </div>
          ),
        },
        {
          Header: '',
          className: 'patient-link',
          headerClassName: 'patient-link patient-link-header',
          Cell: row => (
            <div>
              <Link
                to={`/patient/${ row.original.id }`}
                className="link-button"
                onClick={() => handleSelectPatient(row.original)}
              >
                Detail
              </Link>
            </div>
          ),
        },
      ]}
      style={{
        height: '60vh',
      }}
      pageSize={pageSize > data.length ? data.length : pageSize}
      showPaginationBottom={false}
      className="-highlight"
      noDataText="No Patients Found!"
    />
  </div>
);

TableViewer.defaultProps = {
  data: [],
  handleSelectPatient: () => {},
};

export default TableViewer;
