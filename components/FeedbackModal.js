import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, TextInput, StyleSheet, Dimensions, Image} from 'react-native';
import PropTypes from 'prop-types'
import ImagePicker from 'react-native-image-picker';
import Smile50 from './smileform/SmileyForm'

export default class FeedbackModal extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            text: '',
            smile: 1,
            image: ''
        };
        this.submit = this.submit.bind(this);
        this.newSmiley = this.newSmiley.bind(this);
        this.imagePickerHandler = this.imagePickerHandler.bind(this);

    }



    toggleModal = () => {
        this.setState({modalVisible: !this.state.modalVisible});
    }

    submit() {
        if (this.state.text) {
            console.log(this.state.smile);
            this.setState({modalVisible: false});
            this.props.onNewFeedback(this.state.text, this.state.smile, this.state.image);
            this.setState({text: ''})
        } else {
            Alert.alert("Please fill in the textfield")
        }

    }

    imagePickerHandler() {
        const options = {
            title: "Select Screenshot",
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = {uri: response.uri};

                this.setState({
                    image: source
                });
            }
        });
    }

    newSmiley(value) {
        this.setState({smile: value})
    }

    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onBackdropPress={() => {
                        this.toggleModal();
                    }}>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.modalHeader}>Give us your thoughts!</Text>

                            <TextInput style={styles.txtInput}
                                       numberOfLines = {4}
                                       multiline={true} onChangeText={(text) => this.setState({text})}
                                       value={this.state.text} blurOnSubmit={true}/>
                            <TouchableHighlight style={[styles.button, {backgroundColor: 'orange'}]}
                                                onPress={this.imagePickerHandler}
                                                underlayColor="#74b9ff">
                                <Text style={styles.btnText}>Choose Photo</Text>
                            </TouchableHighlight>
                            <Image source={this.state.image} style={styles.image}/>
                            <Smile50 onNewSmiley={this.newSmiley}/>
                            <TouchableHighlight style={[styles.button, {backgroundColor: '#0984e3'}]}
                                                onPress={this.submit}
                                                underlayColor="#74b9ff">
                                <Text style={styles.btnText}>Submit!</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.button, {backgroundColor: '#d63031'}]}
                                                onPress={() => {
                                                    this.setState({modalVisible: false})
                                                }}
                                                underlayColor="#74b9ff">
                                <Text style={styles.btnText}>Close</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

FeedbackModal.propTypes = {
    onNewFeedback: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 100,
        marginBottom: 30
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 5
    },
    modalHeader: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center'
    },
    txtInput: {
        borderColor: 'gray',
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        width: Dimensions.get('window').width - 50,
        height: 100
    },
    button: {
        margin: 5,
        padding: 10,
        alignSelf: 'center',
        width: Dimensions.get('window').width - 50,
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    },
    image: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70
    }
})

