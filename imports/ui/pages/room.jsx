import React from 'react';

import Layout from '/imports/ui/layout/layout';

export default class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Layout name="dashboard">
        <div className="container">
          This is a game!
        </div>
      </Layout>
    );
  }
}

Room.propTypes = { };

Room.defaultProps = { };
