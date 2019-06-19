import React, { Component } from 'react';

import api from '../../services/api';
import { isAuthenticated } from '../../services/auth';

import StyledMain from './style';
import Tool from '../../components/Tool';
import ActionsBar from '../../components/ActionsBar';

class Home extends Component {
  state = {
    tools: [],
    searchFor: '',
    authContent: false,
    searchByTag: false,
    searching: false,
    errorMessage: ''
  };

  async componentDidMount() {
    if (isAuthenticated()) this.setState({ authContent: true });
    try {
      const tools = await api.get('/tools');
      this.setState({ tools: tools.data });
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  }

  inputChangedHandler = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  searchHandler = async e => {
    e.preventDefault();

    this.setState({ searching: true });

    const searchFor = this.state.searchFor;

    if (this.state.searchByTag) {
      try {
        const tools = await api.get(`/tools?tag=${searchFor}`);
        this.setState({ tools: tools.data, searching: false });
      } catch (error) {
        const errorMessage = error.response.data.message;
        this.setState({ errorMessage, searching: false });
      }
    } else {
      try {
        const tools = await api.get(`/tools?title=${searchFor}`);
        this.setState({ tools: tools.data, searching: false });
      } catch (error) {
        const errorMessage = error.response.data.message;
        this.setState({ errorMessage, searching: false });
      }
    }
  };

  deleteToolHandler = () => {};

  render() {
    const { tools, errorMessage, searchFor, searchByTag, authContent, searching } = this.state;

    const error = <p>{errorMessage}</p>;

    return (
      <StyledMain>
        <h1>VUTTR</h1>
        <h3>Very Useful Tools to Remember</h3>
        <ActionsBar
          searchFor={searchFor}
          searchByTag={searchByTag}
          searching={searching}
          inputChanged={this.inputChangedHandler}
          onSearch={this.searchHandler}
          showButton={authContent}
        />
        {tools
          ? tools.map(tool => (
              <Tool
                key={tool._id}
                title={tool.title}
                link={tool.link}
                description={tool.description}
                tags={tool.tags}
                showButton={authContent}
                onDelete={this.deleteToolHandler}
              />
            ))
          : error}
      </StyledMain>
    );
  }
}

export default Home;