import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions';

class SurveyList extends Component {
    componentDidMount(){
        this.props.fetchSurveys();
    }
    renderSurveys(){
        return this.props.surveys.reverse().map(survey => {
            return <div className="card darken-1" key={survey._id}>
                <div className="card-content">
                <span className="card-title">{survey.title}</span>
                <p>{survey.body}</p>
                <p className="right">
                    Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                    </p>
                    <a>{survey.yes} Yes</a>
                    <a>{survey.no} No</a>
    
                </div>
                
            </div>;
        });
    }
    render(){
        return <div>
            {this.renderSurveys()}
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {surveys: state.surveys};
}
export default connect(mapStateToProps, {fetchSurveys})(SurveyList);