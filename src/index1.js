import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var FormComp = React.createClass({
 
 
    getInitialState: function () {
      return {lName: '',fName:'',Name:''};
    },
 
    handleFNameChange:function(event){
      this.setState({fName: event.target.value});
    },
 
    handleLNameChange:function(event){
      this.setState({lName: event.target.value});
    },
 
    handleClick:function(){
        var fullName = this.state.fName + ' ' + this.state.lName;
        this.setState({Name:fullName});
    },
 
    render:function(){
        return(
            <div>
                <h2>TutsPlus - React Form Tutorial</h2>
                <hr />
 
                <label>First Name: </label>
                <input type="text" value = {this.state.fName} onChange={this.handleFNameChange}  />
                <br />
 
                <label>Last Name: </label>
                <input type="text" value = {this.state.lName} onChange={this.handleLNameChange}  />
                <br />
 
                <input type="button" onClick={this.handleClick} value="Submit" />
 
                <hr />
 
                <h3>Your full name is </h3> {this.state.Name}
            </div>
        );
    }
})

ReactDOM.render(
  <FormComp />,
  document.getElementById('root')
);