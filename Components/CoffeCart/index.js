import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native'
import { Thumbnail, Text, Left, Body, Right, List, ListItem } from 'native-base';
import starbucks from '../../images/starbucks.png';
import starbucks2 from '../../images/starbucks.jpg';
import { observer } from "mobx-react";
import CoffeShop from '../../stores/CoffeShop'

export default observer( class CoffeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [
                {
                    drink: 0,
                    option: 0,
                    quantity: 1
                },
                {
                    drink: 1,
                    option: 1,
                    quantity: 2
                }
            ],
            shop: {
                name: 'StarBucks',
                location: 'Salmiya',
                distance: '5 kilometers',
                image: starbucks,
                background: starbucks2,
                lat: 29.32825632,
                lng: 47.9258696
            },
            drink: 0,
            option: 0,
        };
    }

    renderItem(item,index){
        return (
            <ListItem key={index}>
                <Left>
                    <Text>
                        {item.drink === 0 ? 'Espresso' : 'Latte'}
                        {'\n'}
                        {item.option === 0 ? 'Small' : 'Large'}
                    </Text>
                </Left>
                <Body>
                    <Text>{item.quantity}</Text>
                </Body>
            </ListItem>
        )
    }
    render() {
      console.log(CoffeShop.orders);
        return (
            <List>
                <ListItem  style={styles.top}>
                    <Left>
                        <Text style={styles.text}>
                            {this.state.shop.name + '\n'}
                            <Text note>{this.state.shop.location}</Text>
                        </Text>
                    </Left>
                    <Body/>
                    <Right>
                        <Thumbnail bordered source={this.state.shop.image} />
                    </Right>
                </ListItem>
                {CoffeShop.orders.map(
                (item, index) => this.renderItem(item,index)
                )}
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
