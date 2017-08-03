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
    constructor(props)
    {
        super(props);
        this.state = { searching:false, ingredientsInput: '' };
    }

    searchPressed() {
        this.setState({searching: true});
        this.props.fetchRecipes(this.state.ingredientsInput).then(() => {
            this.setState({searching:false});
        });
        
    }

//may be an enhancer?
    recipes() {
        return Object.keys(this.props.searchedRecipes).map( key => this.props.searchedRecipes[key] )
    }

    render() {
        return <View style = {styles.scene}>
            <View style={styles.searchSection}>
                <TextInput style={styles.searchInput}
                    returnKeyType='search'
                    placeholder='Ingredients (comma delimeted)'
                    onChangeText={ (ingredientsInput) => { this.setState({ingredientsInput})}}
                    value={this.state.ingredientsInput}
                />
                <TouchableHighlight 
                    renderToHardwareTextureAndroid={true} onPress={ () => this.searchPressed() } style={styles.searchButton}>
                    <Text style={styles.buttonText} >Fetch Recipes</Text>
                </TouchableHighlight>
            </View>
            <ScrollView style ={styles.scrollSection}>
                {!this.state.searching && this.recipes().map((recipe) => {
                    return <View key={recipe.id}>
                        <Image source={ { uri: recipe.thumbnail} } style ={styles.resultImage} />
                        <Text style={styles.resultText}>{recipe.title}</Text>
                    </View>
                })}
                {this.state.searching ? <Text>Searching...</Text>:null }
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
        flex: 0.05,
        minHeight: 30,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 0,
        flexDirection:'row',
    },
    searchInput:{
        flex:0.7,
    },
    searchButton:{
        flex:0.3,
    },
    scrollSection: {
        flex: 0.95
    },
    resultImage:{
        height: 150,
    },
    resultText: {
        backgroundColor: '#000',
        color: '#FFF',
        height:20,
    },
    buttonText: {
        textAlign:'right',
        textAlignVertical:'bottom',
    },
})

function mapStateToPros(state)
{
    return {
        searchedRecipes: state.searchedRecipes
    }
}
export default connect(mapStateToPros)(Home);