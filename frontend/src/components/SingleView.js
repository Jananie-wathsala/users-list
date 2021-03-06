import React, { Component } from 'react';
import UserProfile from './UserProfile';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class SingleView extends Component{
  constructor(props){
    super(props);

    this.state={
      isLoaded:false,
      error:null,
      userProfile:[]
    }
  }
 
  componentDidMount(){
    const  userId  = this.props.params.id
    axios
    .get(`http://localhost:8000/api/user/${ userId }`)
    .then(response=>{
      this.setState({
        isLoaded:true,
        userProfile:response.data
      });
    })
    .catch(function(error){
      console.log(error);
        this.setState({
          isLoaded:true,
          error
        })
     
    });
  }
    render(){
      const { error, isLoaded, userProfile } = this.state;
      if(error){
        return <div>Error: {error.message}</div>
      }else if(!isLoaded){
        return <div className="loading col-12"><h3>Loading...<FontAwesomeIcon icon={faSpinner}  spin  /></h3></div>;
      }else{
        return(
          <div>
            <UserProfile profile={userProfile}/>
          </div>
        );
      }
  
    }
}
export default SingleView;
