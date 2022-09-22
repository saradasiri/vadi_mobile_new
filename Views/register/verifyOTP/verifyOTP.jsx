import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NunitoSans_400Regular } from "@expo-google-fonts/nunito-sans";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import OTPTextView from "react-native-otp-textinput";
import { useNavigation } from "@react-navigation/native";

const VerifyOTP = (email) => {
  const [otpInput, setOtpInput] = useState("");
  const navigation = useNavigation();

  let [fontsLoad, error] = useFonts({
    NunitoSans_400Regular,
  });

  if (!fontsLoad) {
    return null;
  }

  const handleSubmit = () => {
    // alert("OTP : " + otpInput);
    navigation.navigate("accountLevel")
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.MainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <StatusBar style="auto" />

          <Text style={styles.Label}>Confirma tu correo</Text>
          <Text
            style={[
              styles.Label,
              { fontSize: 20, marginTop: 20, color: "#737373" },
            ]}
          >
            Ingresa el código que enviamos a:
          </Text>
          <Text
            style={[
              styles.Label,
              { fontSize: 16, marginTop: 20, textAlign: "center" },
            ]}
          ></Text>

          <View style={styles.container}>
            <OTPTextView
              handleTextChange={(text) => setOtpInput(text)}
              containerStyle={styles.textInputContainer}
              textInputStyle={styles.roundedTextInput}
              inputCount={6}
              keyboardType="numeric"
            />
          </View>
          <Text
            style={[
              styles.Label,
              { fontSize: 15, textAlign: "center", marginTop: -10 },
            ]}
          >
            No olvides revisar tu bandeja de no deseados
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <TouchableOpacity
            style={[styles.button, { opacity: otpInput.length>5 ? 1 : 0.5 }]}
            // disabled={!(otpInput.length>5)}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>

        <Image
          style={styles.Logo}
          source={require("../../../assets/vlogo.png")}
        />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F2F6FF",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  Label: {
    marginTop: 40,
    fontWeight: "400",
    fontSize: 30,
  },
  button: {
    marginTop: 120,
    height: 50,
    width: 322,
    borderRadius: 5,
    backgroundColor: "#00BFFF",
  },
  buttonText: {
    color: "black",
    fontFamily: "NunitoSans_400Regular",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F6FF",
    padding: 5,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderBottomWidth: 1,
    fontFamily: "NunitoSans_400Regular",
    height: 50,
    width: 42,
  },
  Logo: {
    height: 50,
    width: 180,
    marginTop: 50,
    alignSelf: "center",
  },
});
export default VerifyOTP;
