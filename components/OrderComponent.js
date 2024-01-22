import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, Button, Alert, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';
class ModalContent extends Component {
    render() {
        return (
            <View style={styles.modal}>
                <Text style={styles.modalTitle}>Your Order</Text>
                <Text style={styles.modalText}>Device Order: {this.props.devices}</Text>
                <Text style={styles.modalText}>Order Quantity: {this.props.orderquantity}</Text>
                <Text style={styles.modalText}>Ship: {this.props.ship}</Text>
                <Text style={styles.modalText}>Date and Time: {format(this.props.date, 'dd/MM/yyyy - HH:mm')}</Text>
                <Button title='Close' color='#ff0000' onPress={() => this.props.onPressClose()} />
            </View>
        );
    }
}
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: 'Asus TUF GAMING Screen',
            orderquantity: 1,
            date: new Date(),
            ship: false,
            showModal: false
        }
    }
    render() {
        return (
            <ScrollView>
                <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Your Device You Order:</Text>
                    </View>
                    <View>
                        <Picker style={styles.formItem} selectedValue={this.state.devices} onValueChange={(value) => this.setState({ devices: value })}>
                            <Picker.Item label='Asus TUF GAMING Screen' value='Asus TUF GAMING Screen' />
                            <Picker.Item label='DareU Keyboard' value='DareU Keyboard' />
                            <Picker.Item label='Gaming Rapoo VH520C Headphone' value='Gaming Rapoo VH520C Headphone' />
                            <Picker.Item label='Logitech G502 X Plus LightSpeed White Mouse' value='Logitech G502 X Plus LightSpeed White Mouse' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Order Quantity</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.orderquantity}
                            onValueChange={(value) => this.setState({ orderquantity: value })}
                        >
                            {Array.from({ length: 99 }, (_, index) => (
                                <Picker.Item key={index + 1} label={(index + 1).toString()} value={(index + 1).toString()} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Economy delivery/Express delivery</Text>
                        <Switch style={styles.formItem} value={this.state.ship} onValueChange={(value) => this.setState({ ship: value })} />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Delivery Time</Text>
                        <Icon name='schedule' size={36} onPress={() => this.setState({ showDatePicker: true })} />
                        <Text style={{ marginLeft: 10 }}>{format(this.state.date, 'dd/MM/yyyy - HH:mm')}</Text>
                        <DateTimePickerModal mode='datetime' isVisible={this.state.showDatePicker}
                            onConfirm={(date) => this.setState({ date: date, showDatePicker: false })}
                            onCancel={() => this.setState({ showDatePicker: false })} />
                    </View>
                    <View style={styles_button.buttonContainer}>
                        <TouchableOpacity
                            style={styles_button.button}
                            onPress={() => this.handleOrder()}
                        >
                            <Text style={styles_button.buttonText}>Order</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal animationType={'slide'} visible={this.state.showModal}
                        onRequestClose={() => this.setState({ showModal: false })}>
                        <ModalContent devices={this.state.devices} orderquantity={this.state.orderquantity} date={this.state.date}
                            onPressClose={() => this.setState({ showModal: false })} />
                    </Modal>
                </Animatable.View>
            </ScrollView>

        );
    }
    handleOrder() {
        console.log('Selected Device:', this.state.devices); // Kiểm tra giá trị của devices
        const selectedDevice = this.state.devices; // Lấy tên thiết bị được chọn
        const deliveryType = this.state.ship ? 'Express delivery' : 'Economy delivery'; // Dựa vào giá trị của ship để chọn loại giao hàng

        const orderDetails = `Device Order: ${selectedDevice}\nOrder Quantity: ${this.state.orderquantity}\nDelivery Type: ${deliveryType}\nDate and Time: ${this.state.date.toISOString()}`;

        Alert.alert(
            'Your Order',
            orderDetails,
            [
                { text: 'Cancel', onPress: () => this.resetForm() },
                {
                    text: 'OK', onPress: () => {
                        this.addOrderToCalendar(this.state.date);
                        this.presentLocalNotification(this.state.date);
                        this.resetForm();
                    }
                },
            ]
        );
    }


    resetForm() {
        this.setState({
            devices: 'Asus TUF GAMING Screen',
            orderquantity: 1,
            date: new Date(),
            ship: false,
            showModal: false
        });
    }
    async presentLocalNotification(date) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true })
            });
            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your Order',
                    body: 'Order for ' + date + ' requested',
                    sound: true,
                    vibrate: true
                },
                trigger: null
            });
        }
    }
    async addOrderToCalendar(date) {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const defaultCalendarSource = { isLocalAccount: true, name: 'Expo Calendar' };
            const newCalendarID = await Calendar.createCalendarAsync({
                title: 'Expo Calendar',
                color: 'blue',
                entityType: Calendar.EntityTypes.EVENT,
                sourceId: defaultCalendarSource.id,
                source: defaultCalendarSource,
                name: 'internalCalendarName',
                ownerAccount: 'personal',
                accessLevel: Calendar.CalendarAccessLevel.OWNER,
            });
            const eventId = await Calendar.createEventAsync(newCalendarID, {
                title: 'The date the device arrives',
                startDate: date,
                endDate: new Date(date.getTime() + 2 * 60 * 60 * 1000),
                timeZone: 'Asia',
                location: 'TP.HCM'
            });
            alert('Your new event ID is: ' + eventId);
        }
    }
}

export default Order;

const styles = StyleSheet.create({
    formRow: { alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row', margin: 20 },
    formLabel: { fontSize: 18, flex: 2 },
    formItem: { flex: 1 },
    modal: { justifyContent: 'center', marginLeft: 20, marginRight: 20, marginTop: 50 },
    modalTitle: { fontSize: 24, fontWeight: 'bold', backgroundColor: '#ff0000', textAlign: 'center', color: 'white', marginBottom: 20 },
    modalText: { fontSize: 18, margin: 10 }
});
const styles_button = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20, // Có thể điều chỉnh khoảng cách giữa nút và các thành phần khác tùy ý
    },
    button: {
        backgroundColor: '#ff0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff', // Màu viền có thể điều chỉnh tùy ý
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});