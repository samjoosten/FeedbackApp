import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Slider,
    Image,
    ImageBackground
} from 'react-native';
import Svg,{
    Path
} from 'react-native-svg';
import PropTypes from 'prop-types';
const size = 75;
const size75 = size*100/185;
const size50 = size*75/125;
import * as scale from 'd3-scale';
const d3 = {
    scale
};
var points = [
    [1,1],
    [25,10]
];

var multiLine = d3.scale.scaleLinear()
    .domain(
        points.map(function(p){return p[0];})
    )
    .range (
        points.map(function(p){return p[1];})
    );
export default class Smile50 extends Component {
    constructor() {
        super();
        this.state = {
            val: 1,
            smile: 1
        }
        this.getVal = this.getVal.bind(this)
    }

    slidingChange(val) {
        this.setState({ val })
    }
    getVal(val){
        this.setState({ val })
        this.setState({ smile: val })
        var value = parseInt(multiLine(this.state.val));
        this.props.onNewSmiley(value)
    }
    render() {
        const val = this.state.smile;
        const dVal = "M6 10 Q19 "+val+" 32 10";
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    How do you feel about the App?
                </Text>

                <ImageBackground
                    style={{width: size, height: size}}
                    source={require('../../facenomouth.png')}
                >
                    <Svg
                        height={size75}
                        width={size75}
                        style={{alignSelf: "center", marginTop: size50}}
                    >
                        <Path
                            d={dVal}
                            fill="none"
                            stroke="red"
                            strokeWidth="3"
                        />
                    </Svg>
                </ImageBackground>
                <Text style={styles.rating}>
                    { parseInt(multiLine(this.state.val)) }
                </Text>
                <Slider
                    style={{ width: 200, transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                    step={1}
                    minimumValue={1}
                    maximumValue={25}
                    value={this.state.val}
                    onValueChange={val => this.slidingChange(val)}
                    onSlidingComplete={ smile => this.getVal(smile)}
                />
            </View>
        );
    }
}

Smile50.propTypes = {
    onNewSmiley: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 20,
    },
    rating: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        marginTop: 10,
        fontWeight: "bold"
    },
});