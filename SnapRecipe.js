import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Svg, { Rect, G, Text as SVGText } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

type Props = {};

type State = {
  canDetectText: boolean,
};

export default class SnapRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textBlocks: [],
    };
  }

  textRecognized = object => {
    const { textBlocks } = object;
    this.setState({ textBlocks });
  };

  setRef = ref => () => (this.camera = ref);

  renderBlock = textBlock => (
    <G key={textBlock.value + textBlock.bounds.origin.x}>
      <Rect
        x={textBlock.bounds.origin.x}
        y={textBlock.bounds.origin.y}
        width={textBlock.bounds.size.width}
        height={textBlock.bounds.size.height}
        fill="rgba(0,0,0,0)"
        strokeWidth="1"
        stroke="rgb(255,0,0)"
        />
      <SVGText fill="red" x={textBlock.bounds.origin.x} y={textBlock.bounds.origin.y}>
        {textBlock.value}
      </SVGText>
    </G>
  );

  snapRecipe() {
    console.log(this.state.textBlocks)
    textValues = this.state.textBlocks.map(t => t.value)
    this.props.navigation.navigate(
      'AddRecipe',
      {
        textBlocks: textValues,
      }
    )
  }

  render() {
    const { textBlocks = [] } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={this.setRef}
          style={{ flex: 1, width, justifyContent: 'flex-end' }}
          type={RNCamera.Constants.Type.back}
          onTextRecognized={this.textRecognized}
          >
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>

            <TouchableOpacity onPress={this.snapRecipe.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Snap Recipe </Text>
            </TouchableOpacity>

          </View>
        </RNCamera>
        <Svg style={{ position: 'absolute', height: height - 40, width, top: 0, left: 0 }}>
          {textBlocks.map(block => this.renderBlock(block))}
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
  },
});
