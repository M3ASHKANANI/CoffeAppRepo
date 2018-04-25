import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Thumbnail, Text, Button, Left, Body, Right, List, ListItem, Tab, Tabs } from 'native-base';
import starbucks from '../../images/starbucks.png';
import starbucks2 from '../../images/starbucks.jpg';
import { observer } from "mobx-react";
import CoffeShop from '../../stores/CoffeShop';
import { NativeRouter, Route, Link, Switch } from 'react-router-native'


export default observer ( class CoffeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          detail: {},
          drink: 0,
          option: 0,

        };
    }
    componentWillMount(){
        this.setState({
            detail: this.props.CoffeShop.detail
        })
    }
    addCoffe(){
      // if (CoffeShop.list.name === CoffeShop.detail.name || CoffeShop.list.name === "") {
        console.log("teehee");
          let orders = CoffeShop.orders
          let coffe = {
              drink: this.state.drink,
              option: this.state.option,
              quantity: 1
          }
          if (orders.length > 0) {
            if (orders.findIndex((item) => item.drink === coffe.drink && item.option === coffe.option) === -1) {
                orders.push(coffe)
            } else {
                let index = orders.findIndex((item) => item.drink === coffe.drink && item.option === coffe.option)
                orders[index].quantity += 1
            }
          }
           else {
              orders.push(coffe)
          }
          CoffeShop.orders = orders
          CoffeShop.list = CoffeShop.detail
          }
      // }
  render() {
    return (
        <List>
            <ListItem style={styles.top}>
                <Left>
                    <Text style={styles.text}>
                        {this.state.detail.name + '\n'}
                        <Text note>{this.state.detail.location}</Text>
                    </Text>
                </Left>
                <Body />
                <Right>
                  <Thumbnail bordered source={this.state.detail.image} />
                </Right>
            </ListItem>
            <ListItem >
                <Body >
                    <Text style={styles.middleText}>Choose Drink</Text>
                </Body>
            </ListItem>
            <Tabs initialPage={0} onChangeTab={({ i, ref, from })=> this.setState({drink: i})}>
                <Tab heading="Espresso"/>
                <Tab heading="Latte"/>
            </Tabs>
            <ListItem >
                <Body >
                  <Text style={styles.middleText}>Choose Option</Text>
                </Body>
            </ListItem>
            <Tabs initialPage={0} onChangeTab={({ i, ref, from })=> this.setState({option: i})}>
                <Tab heading="Small"/>
                <Tab heading="Large"/>
            </Tabs>
            <Link Component={Button} full danger onPress={()=> this.addCoffe()}>
                <Text>Add</Text>
            </Link>
        </List>
    );
  }
});

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 15,
        justifyContent:"center",
        alignItems:'center',
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    top:{
        marginLeft: -6,
        backgroundColor: '#ffffcc'
    },
    middleText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        alignSelf: "center"
    }
  });
