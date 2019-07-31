import React, { Component } from 'react';

class filterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityFilter: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      activityFilter: e.target.value,
    });
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div>
        <label htmlFor="filter">Filter by Activity: </label>
        <input
          type="text"
          id="filter"
          value={this.state.activityFilter}
          onChange={this.handleChange}/>
      </div>
    );
  }
}

export default filterForm;
