import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, ListView } from 'react-native';
import coffee from '../../images/coffee.jpg';
import { NativeRouter, Route, Link, Switch } from 'react-router-native'
import list from './list';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, List, ListItem, } from 'native-base';
import { observer } from "mobx-react";
import openMap from 'react-native-open-maps';

export default observer ( class CoffeList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          listViewData: list,
        };
    }
    setDetail(data){
        this.props.CoffeShop.detail = data
        console.log(data);
    }
      Mymap(data){
        openMap({ latitude: data.lat, longitude: data.lng });
      }
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
        <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={(data,index) =>
            <Link  transparent component={Button} to="/CoffeDetail" onPress={() => this.setDetail(data)} >
                <ImageBackground  source={data.background} style={{height: 180, width: null, flex: 1}} key={data.name + "-" + index} >
                    <ListItem style={{ backgroundColor: "transparent", borderTopWidth: 0,borderRightWidth: 0,borderLeftWidth: 0,borderBottomWidth: 0 }}>
                        <Card style={{ backgroundColor: "transparent", borderTopWidth: 0,borderRightWidth: 0,borderLeftWidth: 0,borderBottomWidth: 0 }}>
                                <Link  transparent component={Button} to="/CoffeDetail" onPress={() => this.setDetail(data)} >
                            <CardItem style={{ backgroundColor: "transparent" }}>
                                <Left>
                                    <Thumbnail bordered source={data.image} />
                                    <Body>
                                        <Text style={styles.text}>{data.name}</Text>
                                        <Text note style={styles.text}>{data.distance}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                                    </Link>
                        </Card>
                        <View style={styles.divider}></View>
                    </ListItem>
                </ImageBackground>
        </Link>}
            renderLeftHiddenRow={data =>
                <Button full onPress={() => Mymap(data);}>
                <Icon active name="navigate" />
                </Button>}
            disableLeftSwipe
            leftOpenValue={75}
        />
    );
  }
});

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 15,
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
  });
