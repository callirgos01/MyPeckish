import React, { Component } from 'react'
import ReactNative from 'react-native'
const{
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet,
} = ReactNative
import { connect } from 'react-redux'

class Home extends Component {
    searchPressed() {
        this.props.fetchRecipes('bacon,cucumber,banana');
    }

//may be an enhancer?
    recipes() {
        return Object.keys(this.props.searchedRecipes).map( key => this.props.searchedRecipes[key] )
    }

    render() {
        return <View style = {styles.scene}>
            <View style={styles.searchSection}>
                <TouchableHighlight onPress={ () => this.searchPressed() } style={styles.searchButton}>
                    <Text>Fetch Recipes</Text>
                </TouchableHighlight>
            </View>
            <ScrollView style ={styles.scrollSection}>
                {this.recipes().map((recipe) => {
                    return <View key={recipe.id}>
                        <Image source={ { uri: recipe.thumbnail} } style ={styles.resultImage} />
                        <Text style={styles.resultText}>{recipe.title}</Text>
                    </View>
                })}
            </ScrollView>
        </View>
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        marginTop:20,    
    },
    searchSection: {
        height: 30,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 5,
    },
    scrollSecction: {
        flex: 0.8
    },
    resultImage:{
        height: 150,
    },
    resultText: {
        backgroundColor: '#000',
        color: '#FFF',
        height:20,
    }
})

function mapStateToPros(state)
{
    return {
        searchedRecipes: state.searchedRecipes
    }
}
export default connect(mapStateToPros)(Home);