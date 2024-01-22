import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Loading from './LoadingComponent';
import { baseUrl } from '../share/baseUrl';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as Animatable from 'react-native-animatable';
// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        devices: state.devices,
        favorites: state.favorites
    }
};
import { deleteFavorite } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
    deleteFavorite: (deviceId) => dispatch(deleteFavorite(deviceId))
});

class Favorites extends Component {
    render() {
        if (this.props.devices.isLoading) {
            return (<Loading />);
        } else if (this.props.devices.errMess) {
            return (<Text>{this.props.devices.errMess}</Text>);
        } else {
            const devices = this.props.devices.devices.filter((dish) => this.props.favorites.some((el) => el === dish.id));
            return (
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                    <SwipeListView data={devices}
                        renderItem={({ item, index }) => this.renderMenuItem(item, index)}
                        renderHiddenItem={({ item, index }) => this.renderHiddenItem(item, index)}
                        keyExtractor={(item) => item.id.toString()}
                        rightOpenValue={-100} />
                </Animatable.View>
            );
        }

    }
    renderMenuItem(item, index) {
        const { navigate } = this.props.navigation;
        return (
            <ListItem key={index} onPress={() => navigate('Dishdetail', { deviceId: item.id })}>
                <Avatar source={{ uri: baseUrl + item.image }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }
    renderHiddenItem(item, index) {
        return (
            <View style={{ alignItems: 'center', backgroundColor: '#DDD', flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15 }}>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, bottom: 0, right: 0, width: 100, backgroundColor: 'red' }}
                    onPress={() => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete this favorite dish: ' + item.name + '?',
                            [
                                { text: 'Cancel', onPress: () => { /* nothing */ } },
                                { text: 'OK', onPress: () => this.props.deleteFavorite(item.id) }
                            ]
                        );
                    }}>
                    <Text style={{ color: '#FFF' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);