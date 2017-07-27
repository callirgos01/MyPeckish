import React, {Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import { bindActionCreators } from 'redux'
const {
    View,
    Text,
    TouchableHighlight,
} = ReactNative
class AppContainer extends Component {

    addRecipe() {
        this.props.addRecipe();
    }

    render(){
    return <View>
        <Text style={{marginTop:20}}>
            I am App Container! Recipe Count: {this.props.recipeCount}
        </Text>
        <TouchableHighlight onPress={ () =>{this.addRecipe()} }> 
            <Text> Add Recipe </Text>
        </TouchableHighlight>
    </View>
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state)=>{
    return {
        recipeCount: state.recipeCount
    }
}, mapDispatchToProps)(AppContainer);