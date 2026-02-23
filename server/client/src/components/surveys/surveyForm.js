//surveyform is a form for user input
import _ from 'lodash';
import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import surveyField from './surveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


const FIELDS =formFields;

class SurveyForm extends Component {
    renderFields(){
        return _.map(FIELDS, ({label, name}) => {
            return (
                <Field key={name} type="text" name={name} component={surveyField} label={label} />
            );
        });
        
            }


render(){
    return (
    <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
             {this.renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">
        Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">Next
        <i className="material-icons right">done</i>
        </button>
        </form>
    </div>)
}

};

function validate(values){
    const errors = {};
    errors.recipients = validateEmails(values.recipients||'');
    _.each(FIELDS, ({name}) => {
        if(!values[name]){
            errors[name] = 'You must provide a value';
        }
    });
   
    return errors;
}
export default reduxForm(
    {form: 'surveyForm', validate: validate,
        destroyOnUnmount: false
    }
  
)(SurveyForm);