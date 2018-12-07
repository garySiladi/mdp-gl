// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { TableWrapper } from '../table';
import { SectionHeader, SectionTitle } from '../section-header';

const Homepage = () => (
  <div className="homepage">
    <SectionHeader>
      <SectionTitle title="Patients" />
      <Link to="/performance">
        <SectionTitle title="Analysis Performance / Details" />
      </Link>
    </SectionHeader>
    <TableWrapper />
  </div>
);

export default Homepage;
