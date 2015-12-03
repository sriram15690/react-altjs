import React from 'react';

export default class TextBox extends React.Component {
	constructor(props) {
    	super(props);
    	this.onChange = props.onChange ? props.onChange.bind(null, this) : null;
  	}
	render (){
		return(
				<div className="form-group">
				
				<label htmlFor={this.props.name}>
					{this.props.labelName}
				</label>

				<input type="text"  required="true" className="form-control" ref={this.props.name} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
				
				</div>
			);
	}
};

