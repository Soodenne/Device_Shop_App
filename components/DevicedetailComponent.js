import React, { Component } from 'react';
import { View, Text, FlatList, Modal, Button, SafeAreaView, PanResponder, Alert } from 'react-native';
import { Card, Image, Icon, Rating, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import { baseUrl } from '../share/baseUrl';
import StarRating from 'react-native-star-rating';
import * as Animatable from 'react-native-animatable';
import { SliderBox } from 'react-native-image-slider-box';
import { useNavigation } from '@react-navigation/native';

class RenderSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 30,
            height: 0
        };
    }
    render() {
        const images = [
            baseUrl + this.props.device.image,
            baseUrl + this.props.device.image1,
            baseUrl + this.props.device.image2
        ];
        return (
            <Card onLayout={this.onLayout}>
                <SliderBox images={images} parentWidth={this.state.width - 30} />
            </Card>
        );
    }
    onLayout = (evt) => {
        this.setState({
            width: evt.nativeEvent.layout.width,
            height: evt.nativeEvent.layout.height,
        });
    };
}


class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 3,
            author: '',
            comment: ''
        };
    }
    render() {
        return (
            <SafeAreaView>
                <View style={{ justifyContent: 'center', margin: 20 }}>
                    <Rating startingValue={this.state.rating} showRating={true}
                        onFinishRating={(value) => this.setState({ rating: value })} />
                    <View style={{ height: 20 }} />
                    <Input value={this.state.author} placeholder='Author' leftIcon={{ name: 'user-o', type: 'font-awesome' }}
                        onChangeText={(text) => this.setState({ author: text })} />
                    <Input value={this.state.comment} placeholder='Comment' leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
                        onChangeText={(text) => this.setState({ comment: text })} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'blue' }}>
                        <Button title='SUBMIT' color='white'
                            onPress={() => this.handleSubmit()} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'gray', marginTop: 10 }}>
                        <Button title='CANCEL' color='white'
                            onPress={() => this.props.onPressCancel()} />
                    </View>
                </View>
            </SafeAreaView>

        );
    }
    handleSubmit() {
        // alert(this.props.deviceId + ':' + this.state.rating + ':' + this.state.author + ':' + this.state.comment);
        this.props.postComment(this.props.deviceId, this.state.rating, this.state.author, this.state.comment);
        this.props.onPressCancel();
    }
}
class RenderDish extends Component {
    render() {
        // gesture
        const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
            if (dx < -200) return 1; // right to left
            else if (dx > 200) return 2;
            return 0;
        };
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => { return true; },
            onPanResponderEnd: (e, gestureState) => {
                if (recognizeDrag(gestureState) === 1) {
                    Alert.alert(
                        'Add Favorite',
                        'Are you sure you wish to add ' + dish.name + ' to favorite?',
                        [
                            { text: 'Cancel', onPress: () => { /* nothing */ } },
                            { text: 'OK', onPress: () => { this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite() } },
                        ]
                    );
                } else if (recognizeDrag(gestureState) === 2) {
                    this.props.onPressComment();
                }
                return true;
            }
        });
        //render
        const device = this.props.device;
        if (device != null) {
            return (
                <Card {...panResponder.panHandlers}>
                    <Card.Title>{device.name}</Card.Title>
                    <Card.Divider />
                    <Text style={{ margin: 10 }}>{device.description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                        <Icon raised reverse type='font-awesome' color='#f50'
                            name={this.props.favorite ? 'heart' : 'heart-o'}
                            onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
                        <Icon raised reverse name='pencil' type='font-awesome' color='blue'
                            onPress={() => this.props.onPressComment()} />
                    </View>
                </Card >
            );
        }
        return (<View />);
    }
}

class RenderComments extends Component {
    render() {
        const comments = this.props.comments;
        return (
            <Card>
                <Card.Title>Comments</Card.Title>
                <Card.Divider />
                <FlatList data={comments}
                    renderItem={({ item, index }) => this.renderCommentItem(item, index)}
                    keyExtractor={(item) => item.id.toString()} />
            </Card>
        );
    }
    renderCommentItem(item, index) {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                {/* <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Rating startingValue={item.rating} imageSize={16} readonly style={{ flexDirection: 'row' }} />
                </View>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
}

// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        devices: state.devices,
        comments: state.comments,
        favorites: state.favorites
    }
};
//muo goi ham thi phai mapDispatchToProps
import { postFavorite, postComment } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
    postFavorite: (deviceId) => dispatch(postFavorite(deviceId)),
    postComment: (deviceId, rating, author, comment) => dispatch(postComment(deviceId, rating, author, comment))
});

class Devicedetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }
    render() {
        const deviceId = parseInt(this.props.route.params.deviceId);
        const device = this.props.devices.devices[deviceId];
        const comments = this.props.comments.comments.filter((cmt) => cmt.deviceId === deviceId);
        //favorite da la danh sach roi nen ko favorites.favorites
        const favorite = this.props.favorites.some((el) => el === deviceId);
        return (
            <ScrollView>
                <Animatable.View animation='flipInY' duration={2000} delay={1000}>
                    <RenderSlider device={device} />
                </Animatable.View>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <RenderDish device={device} favorite={favorite} onPressFavorite={() => this.markFavorite(deviceId)} onPressComment={() => this.setState({ showModal: true })} />
                </Animatable.View>
                <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
                    <RenderComments comments={comments} />
                </Animatable.View>
                <Modal animationType={'slide'} visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}>
                    <ModalContent deviceId={deviceId}
                        onPressCancel={() => this.setState({ showModal: false })} postComment={this.props.postComment} />
                </Modal>
            </ScrollView>
        );
    }
    markFavorite(deviceId) {
        this.props.postFavorite(deviceId);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Devicedetail);