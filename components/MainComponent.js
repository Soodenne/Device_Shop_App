import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Linking } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Menu from './MenuComponent';
import Devicedetail from './DevicedetailComponent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { baseUrl } from '../share/baseUrl';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function TabNavigatorScreen() {
    const TabNavigator = createBottomTabNavigator();
    return (
        <TabNavigator.Navigator initialRouteName='Login'>
            <TabNavigator.Screen name='Login' component={Login}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<Icon name='sign-in' type='font-awesome' size={size} color={color} />)
                }} />
            <TabNavigator.Screen name='Register' component={Register}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<Icon name='user-plus' type='font-awesome' size={size} color={color} />)
                }} />
        </TabNavigator.Navigator>
    );
}
function LoginNavigatorScreen() {
    const LoginNavigator = createStackNavigator();
    return (
        <LoginNavigator.Navigator initialRouteName='LoginRegister'
            screenOptions={{
                headerStyle: { backgroundColor: '#ff0000' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
            <LoginNavigator.Screen name='LoginRegister' component={TabNavigatorScreen}
                options={({ navigation }) => ({
                    headerTitle: 'Login',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })} />
        </LoginNavigator.Navigator>
    );
}
function HomeNavigatorScreen() {
    const HomeNavigator = createStackNavigator();
    return (
        <HomeNavigator.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: { backgroundColor: '#ff0000' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
            <HomeNavigator.Screen name='Home' component={Home}
                options={({ navigation }) => ({
                    headerTitle: 'Home',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })} />
        </HomeNavigator.Navigator>
    );
}

function MenuNavigatorScreen() {
    const MenuNavigator = createStackNavigator();
    return (
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: { backgroundColor: '#ff0000' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
            <MenuNavigator.Screen name='Menu' component={Menu}
                options={({ navigation }) => ({
                    headerTitle: 'Menu',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })} />
            <MenuNavigator.Screen name='Devicedetail' component={Devicedetail}
                options={{
                    headerTitle: 'Device Detail'
                }} />
        </MenuNavigator.Navigator>
    );
}
function ContactNavigatorScreen() {
    const ContactNavigator = createStackNavigator();
    return (
        <ContactNavigator.Navigator
            initialRouteName='Contact'
            screenOptions={{
                headerStyle: { backgroundColor: '#ff0000' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
            <ContactNavigator.Screen name='Contact' component={Contact}
                options={({ navigation }) => ({
                    headerTitle: 'Contact',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })} />
        </ContactNavigator.Navigator>
    );
}

function AboutNavigatorScreen() {
    const AboutNavigator = createStackNavigator();
    return (
        <AboutNavigator.Navigator
            initialRouteName='About'
            screenOptions={{
                headerStyle: { backgroundColor: '#ff0000' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
            <AboutNavigator.Screen name='About' component={About}
                options={({ navigation }) => ({
                    headerTitle: 'About',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })} />
        </AboutNavigator.Navigator>
    );
}

function CustomDrawerContent(props) {
    const users = props.users;
    const logoutUser = props.logoutUser;
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ backgroundColor: '#ff0000', height: 80, alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ flex: 2 }}>
                    <Image source={{ uri: baseUrl + 'images/logo.png' }} style={{ margin: 10, width: 130, height: 60 }} />
                </View>
                <View style={{ flex: 2, alignItems: 'flex-start', marginTop: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', marginLeft: 20 }}>Welcome,</Text>
                    <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', marginLeft: 20 }}>{users.userinfo.username}</Text>
                </View>
            </View>


            <DrawerItemList {...props} />
            {
                users.logged === false
                    ? (<DrawerItem label='Help' icon={({ focused, color, size }) => <Icon name='help' size={size} color={focused ? '#ff0000' : '#ccc'} />} onPress={() => Linking.openURL('https://reactnavigation.org/docs/getting-started')} />)
                    : (<DrawerItem label={'[' + users.userinfo.username + '] Logout'} icon={({ focused, color, size }) => <Icon name='sign-out' type='font-awesome' size={size} color={focused ? '#ff0000' : '#ccc'} />} onPress={() => { logoutUser(); props.navigation.navigate('HomeScreen'); }} />)
            }
        </DrawerContentScrollView>
    );
}

import Order from './OrderComponent';
function OrderNavigatorScreen() {
    const OrderNavigator = createStackNavigator();
    return (
        <OrderNavigator.Navigator initialRouteName='Order'
            screenOptions={{
                headerStyle: { backgroundColor: '#ff0000' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
            <OrderNavigator.Screen name='Order' component={Order}
                options={({ navigation }) => ({
                    headerTitle: 'Order Device',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })} />
        </OrderNavigator.Navigator>
    );
}

import Favorites from './FavoriteComponent';
function FavoritesNavigatorScreen() {
    const FavoritesNavigator = createStackNavigator();
    return (
        <FavoritesNavigator.Navigator initialRouteName='Favorites'
            screenOptions={{
                headerStyle: { backgroundColor: '#ff0000' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
            <FavoritesNavigator.Screen name='Favorites' component={Favorites}
                options={({ navigation }) => ({
                    headerTitle: 'My Favorites',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })} />
            <FavoritesNavigator.Screen name='Devicedetail' component={Devicedetail}
                options={{ headerTitle: 'Device Detail' }} />
        </FavoritesNavigator.Navigator>
    );
}

function MainNavigatorScreen(props) {
    const users = props.users;
    const logoutUser = props.logoutUser;
    const MainNavigator = createDrawerNavigator();
    return (
        <MainNavigator.Navigator initialRouteName='HomeScreen' drawerContent={(props) => <CustomDrawerContent {...props} users={users} logoutUser={logoutUser} />}>
            {
                users.logged === false
                    ? (<MainNavigator.Screen name='LoginScreen' component={LoginNavigatorScreen} options={{ title: 'Login', headerShown: false, drawerIcon: ({ focused, size }) => (<Icon name='sign-in' type='font-awesome' size={size} color={focused ? '#ff0000' : '#ccc'} />) }} />)
                    : null
            }
            <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen}
                options={{
                    title: 'Home', headerShown: false,
                    drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#ff0000' : '#ccc'} />)
                }} />
            <MainNavigator.Screen name='MenuScreen' component={MenuNavigatorScreen}
                options={{
                    title: 'Menu', headerShown: false,
                    drawerIcon: ({ focused, size }) => (<Icon name='menu' size={size} color={focused ? '#ff0000' : '#ccc'} />)
                }} />
            <MainNavigator.Screen name='AboutScreen' component={AboutNavigatorScreen}
                options={{
                    title: 'About Us', headerShown: false,
                    drawerIcon: ({ focused, size }) => (<Icon name='info' size={size} color={focused ? '#ff0000' : '#ccc'} />)
                }} />
            <MainNavigator.Screen name='ContactScreen' component={ContactNavigatorScreen}
                options={{
                    title: 'Contact Us', headerShown: false,
                    drawerIcon: ({ focused, size }) => (<Icon name='contacts' size={size} color={focused ? '#ff0000' : '#ccc'} />)
                }} />
            {
                users.logged === true
                    ? (<MainNavigator.Screen name='OrderScreen' component={OrderNavigatorScreen} options={{ title: 'Order Devices', headerShown: false, drawerIcon: ({ focused, size }) => (<Icon name='cart-plus' type='font-awesome' size={size} color={focused ? '#ff0000' : '#ccc'} />) }} />)
                    : null
            }
            <MainNavigator.Screen name='FavoritesScreen' component={FavoritesNavigatorScreen}
                options={{
                    title: 'My Favorites', headerShown: false,
                    drawerIcon: ({ focused, size }) => (<Icon name='heart' type='font-awesome' size={size} color={focused ? '#ff0000' : '#ccc'} />)
                }} />
        </MainNavigator.Navigator>
    );
}

// redux
import { connect } from 'react-redux';
import { fetchLeaders, fetchDevices, fetchComments, fetchPromos, logoutUser } from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch) => ({
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchDevices: () => dispatch(fetchDevices()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    logoutUser: () => dispatch(logoutUser())
});
// redux
const mapStateToProps = (state) => {
    return {
        users: state.users
    }
};
class Main extends Component {
    render() {
        return (
            <NavigationContainer>
                <MainNavigatorScreen users={this.props.users} logoutUser={this.props.logoutUser} />
            </NavigationContainer>
        );
    }
    componentDidMount() {
        // redux
        this.props.fetchLeaders();
        this.props.fetchDevices();
        this.props.fetchComments();
        this.props.fetchPromos();
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);