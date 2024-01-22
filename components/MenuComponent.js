import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Loading from './LoadingComponent';
import { baseUrl } from '../share/baseUrl';
import * as Animatable from 'react-native-animatable';
// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        devices: state.devices
    }
};
class Menu extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.devices.isLoading) {
            return (<Loading />);
        } else if (this.props.devices.errMess) {
            return (<Text>{this.props.errMess}</Text>);
        } else {
            return (
                <FlatList data={this.props.devices.devices}
                    renderItem={({ item, index }) => this.renderMenuItem(item, index)}
                    keyExtractor={(item) => item.id.toString()} />
            );
        }
    }
    renderMenuItem(item, index) {
        const { navigate } = this.props.navigation;
        return (
            <Animatable.View animation='fadeInRightBig' duration={2000}>
                <ListItem key={index} onPress={() => navigate('Devicedetail', { deviceId: item.id })}>
                    <Avatar source={{ uri: baseUrl + item.image }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </Animatable.View>
        );
    }
}
export default connect(mapStateToProps)(Menu);