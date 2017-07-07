'use strict';

import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Navigator,
	TouchableHighlight,
	TouchableOpacity,
	WebView
} from 'react-native';

import NavigationExperimental from 'react-native-deprecated-custom-components';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

/*
PushFromRight
FloatFromRight
FloatFromLeft
FloatFromBottom
FloatFromBottomAndroid
FadeAndroid
HorizontalSwipeJump
HorizontalSwipeJumpFromRight
VerticalUpSwipeJump
VerticalDownSwipeJump
*/ 

class SampleApp extends Component {
	constructor(props) {
		super(props);	
	}
	//<ScrollableTabView>
	//</ScrollableTabView>
	render() {
		return (
			<ScrollView>
				<View>
					 <PageFirst />
				</View>
				<View>
					<Text> Test </Text>  
				</View>				
				<View>
					<PlayTrack />
				</View>	
			</ScrollView>			
		);
	}
}

class AppContainer extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<ScrollableTabView>
				<PageOne tabLabel="PageOne" />
			</ScrollableTabView>
		);
	}
}

class PlayTrack extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			html: 'http://video.itunes.apple.com/apple-assets-us-std-000001/Video5/v4/1c/6e/85/1c6e85ed-e4a6-f9be-b7bd-ceaa0faf3077/mzvf_7073124460975954476.640x476.h264lc.U.p.m4v'
		};
		
		if (props.data) {
			this.state = {
				url: props.data.url,
				html: 'https://www.facebook.com/wikrcom/videos/1118835278260392/'
			}
		}
    }

    render() {
        return (
            <WebView
                source={{uri: this.state.html}}
				mediaPlaybackRequiresUserAction={false}
				style={{height: 200, width: 350}}
            />
        )
    }
}

class PageOne extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'First Scene', index: 0},
			{title: 'Second Scene', index: 1},
			{title: 'Three Scene', index: 2},
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <PageFirst routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <PageTwo routes={this.routes} navigator={navigator} />
					break;			
			case 2: return <PageThree routes={this.routes} navigator={navigator} />
					break;
 		}
 	}	
	
	render() {
		return (
            <NavigationExperimental.Navigator
                initialRoute={this.routes[0]}
                initialRouteStack={this.routes}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack) =>
                    NavigationExperimental.Navigator.SceneConfigs.FloatFromBottomAndroid}
            />
		)
	}
}

class PageFirst extends Component {
	constructor(props) {
		super(props);
	}
	
	_handlePress2() {
		this.props.navigator.push({index: 1});
	}		
	
	_handlePress3() {
		this.props.navigator.push({index: 2});
	}		
	
	render() {
		return (
			<View style={[styles.container, {backgroundColor: 'green'}]}>
				<Text style={styles.welcome}>This is page one!</Text>
				<TouchableOpacity onPress={this._handlePress2.bind(this)}>
					<View style={{paddingVertical: 20, paddingHorizontal: 20, backgroundColor: 'black'}}>
						<Text style={styles.welcome}>Go to page 2</Text>
					</View>
				</TouchableOpacity>		
				
				<View style={{margin: 10}}></View>	
				
				<TouchableOpacity onPress={this._handlePress3.bind(this)}>
					<View style={{paddingVertical: 20, paddingHorizontal: 20, backgroundColor: 'black'}}>
						<Text style={styles.welcome}>Go to page 3</Text>
					</View>
				</TouchableOpacity>	
			</View>
		)
	}
}

class PageTwo extends Component {
	constructor(props) {
		super(props);	
	}
	
	_handlePress1() {
		this.props.navigator.pop();
	}	
	
	_handlePress() {
		//this.props.navigator.pop();
		this.props.navigator.push(this.props.routes[2]);
	}
		
  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'purple'}]}>
        <Text style={styles.welcome}>This is page two!</Text>
		
        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Go to page three</Text>
          </View>
        </TouchableOpacity>
		
		<View style={{margin: 10}}></View>	
		
		<TouchableOpacity onPress={this._handlePress1.bind(this)}>
			<View style={{paddingVertical: 20, paddingHorizontal: 20, backgroundColor: 'black'}}>
				<Text style={styles.welcome}>Go back</Text>
			</View>
		</TouchableOpacity>	
       </View>
    )
  }
}

class PageThree extends Component {
	constructor(props) {
		super(props);	
	}
	
	_handlePress1() {
		this.props.navigator.pop();
	}	
	
	_handlePress() {
		this.props.navigator.popToTop(0);
		//this.props.navigator.push(this.props.routes[0]);
	}
		
  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'blue'}]}>
        <Text style={styles.welcome}>This is page three!</Text>

		<TouchableOpacity onPress={this._handlePress1.bind(this)}>
			<View style={{paddingVertical: 20, paddingHorizontal: 20, backgroundColor: 'black'}}>
				<Text style={styles.welcome}>Go to page 2</Text>
			</View>
		</TouchableOpacity>	
		
		<View style={{margin: 10}}></View>	
		
        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Go back</Text>
          </View>
        </TouchableOpacity>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});

module.exports = SampleApp;
