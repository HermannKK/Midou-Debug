
import React from 'react';
import {  View, ActivityIndicator, Image,  } from 'react-native';
import firebase from "react-native-firebase";
import {Icon} from 'native-base';

export default class AsyncImage extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                loading: true,
                mounted: true,
                image: "../assets/images/Midou.png",
                url: null,
                newURL:null,
                icon: false,
                refresh: this.props.refresh,
            }
    }

    componentDidMount() {
        this.setState({ isMounted: true })
        if(this.props.refresh==false)
            {this.getAndLoadHttpUrl()}
    }

    async getAndLoadHttpUrl() {
        if (this.state.mounted == true && this.state.refresh === false) {
            const ref = firebase.storage().refFromURL(this.props.image);
            ref.getDownloadURL().then(data => {
                this.setState({ url: data })
                if(this.state.url==null){
                 this.setState({ icon: true})
                }
                this.setState({ loading: false })
            }).catch(error => {
                
                this.setState({ loading: false })
            })
        }
    }

    componentWillUnmount() {
        this.setState({ isMounted: false })
    }

    componentWillReceiveProps(props) {
        console.log(props)
        const newProps=props
        const newURL  = newProps.newUrl;
        console.log(newURL)
        if(newURL){
            this.setState({url:newURL }),
            console.log(this.state.newURL)
            this.forceUpdate()
        }
      }

    render() {
        if (this.state.mounted == true) {
            if (this.state.loading == true) {
                if(this.state.icon == true) {
                    return(
                        <View>
                            <Icon name={"user"} type="FontAwesome" style={{color: "white",fontSize: 80}} />
                        </View>       
                    )
                }
                else{
                    return (
                        <View  style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }} >
                            <ActivityIndicator />
                        </View>
                    )
                }   
            }
            else {
                /* if(!this.state.newURL){ */
                    return (
                        <Image style={this.props.style} source={{uri: this.state.url}} />
                    )
                /* }
                else{
                    return (
                        <Image style={this.props.style} source={{uri: this.state.newURL}} />
                    )
                } */
            }
        }
        else {
            return null
        }
    }

}