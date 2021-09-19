import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Text,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import Card from '../../components/UI/Card';
import Loader from '../../components/UI/Loader';
import Colors from '../../constants/Colors';
import { signUp, signIn } from '../../store/actions/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = signUp(email, password);
    } else {
      action = signIn(email, password);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    // <KeyboardAvoidingView
    //   behavior="padding"
    //   keyboardVerticalOffset={50}
    //   style={styles.screen}
    // >
    <LinearGradient colors={['#ff9999', '#ffcc80']} style={styles.gradient}>
      <Image source={require('../../assets/logo/logo.png')} style={{height: 180, width: 230,}} />
      <Text style={{fontSize: 30}}>{isSignUp ? 'REGISTER' : 'LOGIN'}</Text>
      <Card style={styles.authContainer}>
        <ScrollView>
          <View style={styles.formControl}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              placeholder="Ex: nvthuong@gmail.com"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType="email"
              returnKeyType="next"
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.formControl}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              placeholder="*********"
              secureTextEntry
              autoCapitalize="none"
              autoCompleteType="password"
              textContentType="password"
              passwordrules="required: lower; required: upper; required: digit; required: [-]; minlength: 6;"
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          {isSignUp && (
            <View style={styles.formControl}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                value={passwordConfirm}
                placeholder="*********"
                secureTextEntry
                autoCapitalize="none"
                autoCompleteType="password"
                textContentType="password"
                passwordrules="required: lower; required: upper; required: digit; required: [-]; minlength: 6;"
                onChangeText={(text) => setPasswordConfirm(text)}
              />
            </View>
          )}

          <View style={styles.buttonContainer}>
            {!isLoading ? (
              <Button
                title={isSignUp ? 'Sign Up' : 'Sign In'}
                color={Colors.primary}
                onPress={authHandler}
              />
            ) : (
              <Loader />
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={`Switch to ${isSignUp ? 'Sign In' : 'Sign Up'}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignUp((prevState) => !prevState);
              }}
            />
          </View>
        </ScrollView>
      </Card>
    </LinearGradient>
    // </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },  
  label:{
    padding: 15
  },  
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    marginTop: 40
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
