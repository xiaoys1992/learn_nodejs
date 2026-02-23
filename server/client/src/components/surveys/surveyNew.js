import React, { Component } from 'react';
import SurveyForm from './surveyForm';
import SurveyFormReview from './surveyFormReview';
import {reduxForm} from 'redux-form';

class SurveyNew extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = { new: true };
    // }
    //equivalent with above
    state={showFormReview: false};

renderContent(){
    if(this.state.showFormReview){
        return <SurveyFormReview
        onCancel={() => this.setState({showFormReview: false})}
        />;
    }
    return <SurveyForm 
    onSurveySubmit={() => this.setState({showFormReview: true})}
    />;

};

render(){
    return (
    <div>
        {this.renderContent()}
        </div>)
}

};
export default reduxForm({form: 'surveyForm'})(SurveyNew);