import React,{Component} from "react";
import { BrowserRouter, Route } from 'react-router-dom';  
import 'materialize-css/dist/css/materialize.min.css';  
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from "./Header";
import Landing from "./Landing";


import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/surveyNew";




class App extends Component {
componentDidMount(){

    this.props.fetchUser();


}
    render(){
    return (
        <div className="container">
            <BrowserRouter><div>
                <Header />
                <Route exact path="/surveys" component={Dashboard} />
                <Route exact path="/" component={Landing} />
                <Route path="/surveys/new" component={SurveyNew} />
        
                
                </div></BrowserRouter>
           
            
        </div>
        
            );
        

}};



export default connect(null, actions)(App);
