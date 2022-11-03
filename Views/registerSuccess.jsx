import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

const RegisterSuccess = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#270041",
        justifyContent: "center",
              textAlign: "center",
        alignSelf:"center"
      }}
    >
      <Image
        source={require("../assets/vlogo2.png")}
        style={{
          alignSelf: "center",
          height: hp("10%"),
          width: wp("70%"),
          top: 100,
        }}
      />
      <Image
        source={require("../assets/Imagen.png")}
        style={{
          alignSelf: "center",
          height: hp("50%"),
          width: wp("100%"),
          top: 150,
        }}
      />
          <View style={{ padding:25 }}>
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            alignSelf: "center",
            fontSize: 30,
            fontWeight: "700",
                      lineHeight: 34,
          
            paddingBottom: 30,
          }}
        >
          ¡Por fin llegaste!
        </Text>
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            lineHeight: 30,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Te damos la bienvenida a Vadi, estás a punto de conocer y participar
          en la nueva economía descentralizada que apoya a las startups más
          innovadoras de Latinoamérica
        </Text>
        <View style={{ backgroundColor: "#fff", marginTop: 30,width:"30%",alignSelf:"center",borderRadius:250 }}>
          <Ionicons
            name="md-enter-outline"
            size={50}
            color="#8D00FF"
            style={{ alignSelf: "center" }}
          />
        </View>
      </View>
    </View>
  );
};

export default RegisterSuccess;

const styles = StyleSheet.create({});