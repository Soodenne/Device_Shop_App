import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Image, Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import { CONTACT } from '../share/contact';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
import { getDatabase, ref, child, onValue } from 'firebase/database';
class RenderContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            street: '',
            district: '',
            city: '',
            phone: '',
            fax: '',
            email: ''
        }
    }
    render() {
        const contact = this.props.contact;
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <Card>
                    <Card.Title>Contact Information</Card.Title>
                    <Card.Divider />
                    <Text style={{ margin: 10 }}>{this.state.number}, {this.state.street}</Text>
                    <Text style={{ margin: 10 }}>{this.state.district}</Text>
                    <Text style={{ margin: 10 }}>{this.state.city}</Text>
                    <Text style={{ margin: 10 }}>Tel: {this.state.phone}</Text>
                    <Text style={{ margin: 10 }}>Fax: {this.state.fax}</Text>
                    <Text style={{ margin: 10 }}>Email: {this.state.email}</Text>
                    <Button title=' Compose Email' buttonStyle={{ backgroundColor: '#ff0000' }}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.composeMail} />
                </Card>
            </Animatable.View >
        );
    }
    componentDidMount() {
        const dbRef = ref(getDatabase());
        onValue(child(dbRef, 'contact/'), (snapshot) => {
            const value = snapshot.val();
            this.setState({
                number: value.address.number,
                street: value.address.street,
                district: value.address.district,
                city: value.address.city,
                phone: value.phone,
                fax: value.fax,
                email: value.email
            });
        });
    }
    composeMail() {
        MailComposer.composeAsync({
            recipients: ['nguyentuananh050902@icloud.com'],
            subject: 'From AnhNT',
            body: 'Hello my friends ...'
        });
    }
}

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contact: CONTACT
        };
    }
    render() {
        const contact1 = this.state.contact.filter((contact1) => contact1.featured === true)[0];
        return (
            <ScrollView>
                <RenderContact contact={contact1} />
            </ScrollView>
        );
    }
}
export default Contact;