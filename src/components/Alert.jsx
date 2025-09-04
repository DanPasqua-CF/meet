import React, { Component } from 'react';

class Alert extends Component {
 constructor(props) {
   super(props);
   this.color = null;
   this.bgColor = null;
 }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px"
    };
  }

  render() {
    const { text } = this.props;
    
    return (
      <div className="Alert">
        {text && <p style={this.getStyle()}>{text}</p>}
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(0, 0, 255)';
    this.bgColor = 'rgb(220, 220, 255)';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 0, 0)';
    this.bgColor = 'rgb(242, 197, 199)';
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 6, 209)';
    this.bgColor = 'rgb(240, 195, 239)';
  }
}

export { InfoAlert, ErrorAlert, WarningAlert };
