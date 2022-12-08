import {
  StyleSheet,
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Pressable,
  Button,
  ToastAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useRef, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NunitoSans_400Regular } from "@expo-google-fonts/nunito-sans";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import CountryPicker from "react-native-country-picker-modal";
// import DateTimePicker from "@react-native-community/datetimepicker";
import Tabs1234 from "../../../src/tabs1234";
import globalStyles from "../../../globalStyles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addFund,
  addFirstName,
  addLastName,
  addName,
  addBirth,
  addNationality,
  addCountryBirth,
  addCurp,
  addRfc,
  addTax,
  addPhone,
  addOccupation,
  addCountryCode,
} from "../../../src/redux/actions";

const CompleteProfile1 = (formik) => {
  const dispatch = useDispatch();
  const { range, lower, upper } = useSelector((state) => state.userReducer);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState("");
  const calAge = (value) => {
    const birthDate = new Date(value);
    const difference = Date.now() - birthDate.getTime();
    const cal = new Date(difference);
    const ageCal = Math.abs(cal.getUTCFullYear() - 1970);
    setAge(ageCal);
    if (ageCal < 18) {
      ToastAndroid.show(
        "You must be of legal age to continue.",
        ToastAndroid.SHORT
      );
    }
    if (ageCal < 0) {
      ToastAndroid.show("Please select a valid Date", ToastAndroid.SHORT);
    }
  };

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  const [age, setAge] = useState("");
  const { values, errors, touched } = formik;
  const navigation = useNavigation();

  const [countryBirth, setCountryBirth] = useState(values.countryBirth);
  const [nationality, setNationality] = useState(values.nationality);
  const [countryCode, setCountryCode] = useState("52");

  useEffect(() => {
    values.countryBirth = countryBirth;
    values.nationality = nationality;
    if (countryBirth === "MX" && nationality === "MX") {
      values.tax = "";
    }
    if (countryBirth === "MX" || nationality === "MX") {
      (values.curp = ""), (values.rfc = "");
    }
  }, [countryBirth, nationality]);

  useEffect(() => {
    setAge("");
    setCountryBirth("MX");
    setNationality("MX");
  }, [range]);

  let [fontsLoad, error] = useFonts({
    NunitoSans_400Regular,
  });

  if (!fontsLoad) {
    return null;
  }

  const handleFormSubmit = (values) => {
    dispatch(addFund(values.fund));
    dispatch(addFirstName(values.firstName));
    dispatch(addLastName(values.secondName));
    dispatch(addName(values.name));
    dispatch(addBirth(date));
    dispatch(addNationality(nationality));
    dispatch(addCountryBirth(values.countryBirth));
    dispatch(addCurp(values.curp));
    dispatch(addRfc(values.rfc));
    dispatch(addTax(values.tax));
    dispatch(addPhone(values.phone));
    dispatch(addOccupation(values.occupation));
    dispatch(addCountryCode(countryCode));

    if (values.fund < lower || values.fund > upper) {
      ToastAndroid.show(
        `Your Investment Range is : ${range}`,
        ToastAndroid.SHORT
      );
    }
    if (values.fund < 100) {
      ToastAndroid.show("Minimum Amount is 100", ToastAndroid.SHORT);
    }
    if (values.fund >= lower && values.fund >= 100 && values.fund <= upper) {
      navigation.navigate("completeProfile2");
    }
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={globalStyles.MainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <StatusBar style="auto" />
          <Tabs1234 range={range} value="1" />

          <View style={{ paddingTop: 25 }}>
            <Text
              style={[
                globalStyles.text,
                {
                  textAlign: "center",
                  marginLeft: 0,
                  color: errors.fund && touched.fund ? "red" : "#737373",
                  fontSize: 17,
                },
              ]}
            >
              Indicate the amount you are going to fund
            </Text>
            <View>
              <TextInput
                name="fund"
                placeholder="Fund"
                keyboardType="numeric"
                onChangeText={(text) => {
                  formik.handleChange("fund")(text.replace(/\D/g, ""));
                }}
                onBlur={formik.handleBlur("fund")}
                value={values.fund}
                autoCapitalize="none"
                style={[
                  globalStyles.inputStyle,
                  {
                    borderColor:
                      errors.fund && touched.fund
                        ? "red"
                        : "rgba(18, 3, 58, 0.1)",
                  },
                ]}
              />
            </View>
            {errors.fund && touched.fund && (
              <Text style={globalStyles.error}>{errors.fund}</Text>
            )}
          </View>

          <View>
          <Text style={[globalStyles.Label, { textAlign: "center" }]}>Personal Data</Text>
          </View>

          <View style={{ paddingTop: 25 }}>
            <Text
              style={[
                globalStyles.text,
                {
                  color:
                    errors.firstName && touched.firstName ? "red" : "#737373",
                },
              ]}
            >
              First Name
            </Text>
            <View>
              <TextInput
                name="firstName"
                placeholder="Juan"
                onChangeText={(text) => {
                  formik.handleChange("firstName")(text.trim());
                }}
                onBlur={formik.handleBlur("firstName")}
                value={values.firstName}
                autoCapitalize="none"
                style={[
                  globalStyles.inputStyle,
                  {
                    borderColor:
                      errors.firstName && touched.firstName
                        ? "red"
                        : "rgba(18, 3, 58, 0.1)",
                  },
                ]}
              />
            </View>
            {errors.firstName && touched.firstName && (
              <Text style={globalStyles.error}>{errors.firstName}</Text>
            )}
          </View>

          <View style={{ paddingTop: 25 }}>
            <Text
              style={[
                globalStyles.text,
                {
                  color:
                    errors.secondName && touched.secondName ? "red" : "#737373",
                },
              ]}
            >
              Second Name
            </Text>
            <View>
              <TextInput
                name="secondName"
                placeholder="garcia"
                onChangeText={(text) => {
                  formik.handleChange("secondName")(text.trim());
                }}
                onBlur={formik.handleBlur("secondName")}
                value={values.secondName}
                autoCapitalize="none"
                style={[
                  globalStyles.inputStyle,
                  {
                    borderColor:
                      errors.secondName && touched.secondName
                        ? "red"
                        : "rgba(18, 3, 58, 0.1)",
                  },
                ]}
              />
            </View>
            {errors.secondName && touched.secondName && (
              <Text style={globalStyles.error}>{errors.secondName}</Text>
            )}
          </View>

          <View style={{ paddingTop: 25 }}>
            <Text
              style={[
                globalStyles.text,
                { color: errors.name && touched.name ? "red" : "#737373" },
              ]}
            >
              Name(s)
            </Text>
            <View>
              <TextInput
                name="name"
                placeholder="Juan gonzalez garcia"
                onChangeText={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                value={values.name}
                autoCapitalize="none"
                style={[
                  globalStyles.inputStyle,
                  {
                    borderColor:
                      errors.name && touched.name
                        ? "red"
                        : "rgba(18, 3, 58, 0.1)",
                  },
                ]}
              />
            </View>
            {errors.name && touched.name && (
              <Text style={globalStyles.error}>{errors.name}</Text>
            )}
          </View>

          <View style={{ paddingTop: 25 }}>
            <Text style={[globalStyles.text, { color: "#737373" }]}>
              Date of Birth
            </Text>
            <TouchableOpacity
              onPress={() => setDatePicker(true)}
              style={[
                globalStyles.inputStyle,
                {
                  borderColor: "rgba(18, 3, 58, 0.1)",
                },
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.datetext,
                  { color: age < 18 ? "#B9B9B9" : "black" },
                ]}
              >
                {age < 18 ? "DD / MM / YYYY" : date.toDateString()}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={datePicker}
              mode="date"
              onConfirm={(value) => {
                setDate(value);
                setDatePicker(false);
                calAge(value);
              }}
              onCancel={() => {
                setDatePicker(false);
              }}
            />
          </View>

          <View style={{ paddingTop: 25 }}>
            <Text
              style={[
                globalStyles.text,
                {
                  color:
                    errors.countryBirth && touched.countryBirth
                      ? "red"
                      : "#737373",
                },
              ]}
            >
              Country of Birth
            </Text>
            <View
              style={[
                globalStyles.inputStyle,
                {
                  borderColor: "rgba(18, 3, 58, 0.1)",
                },
              ]}
            >
              <View style={{ paddingTop: 10 }}>
                <CountryPicker
                  withFilter
                  countryCode={countryBirth}
                  withFlag
                  withCountryNameButton
                  withAlphaFilter={false}
                  withCountryButton={false}
                  withCallingCode
                  onSelect={(country) => {
                    const { cca2 } = country;
                    setCountryBirth(cca2);
                  }}
                  style={{ fontSize: 24, width: 322, paddingBottom: 50 }}
                />
              </View>
            </View>
            {errors.countryBirth && touched.countryBirth && (
              <Text style={globalStyles.error}>{errors.countryBirth}</Text>
            )}
          </View>

          <View style={{ paddingTop: 25 }}>
            <Text
              style={[
                globalStyles.text,
                {
                  color:
                    errors.nationality && touched.nationality
                      ? "red"
                      : "#737373",
                },
              ]}
            >
              Nationality
            </Text>
            <View
              style={[
                globalStyles.inputStyle,
                {
                  borderColor: "rgba(18, 3, 58, 0.1)",
                },
              ]}
            >
              <View style={{ paddingTop: 10 }}>
                <CountryPicker
                  withFilter
                  countryCode={nationality}
                  withFlag
                  withCountryNameButton
                  withAlphaFilter={false}
                  withCountryButton={false}
                  withCallingCode
                  onSelect={(country) => {
                    const { cca2, callingCode } = country;
                    setNationality(cca2);
                    setCountryCode(callingCode);
                  }}
                  style={{ fontSize: 24, width: 322 }}
                />
              </View>
            </View>
            {errors.nationality && touched.nationality && (
              <Text style={globalStyles.error}>{errors.nationality}</Text>
            )}
          </View>

          {countryBirth === "MX" && nationality === "MX" && (
            <View style={{ paddingTop: 25 }}>
              <Text
                style={[
                  globalStyles.text,
                  { color: errors.curp && touched.curp ? "red" : "#737373" },
                ]}
              >
                CURP
              </Text>
              <View>
                <TextInput
                  name="curp"
                  keyboardType="numeric"
                  placeholder="Your CURP Number"
                  onChangeText={(text) => {
                    formik.handleChange("curp")(text.replace(/\D/g, ""));
                  }}
                  onBlur={formik.handleBlur("curp")}
                  value={values.curp}
                  autoCapitalize="none"
                  style={[
                    globalStyles.inputStyle,
                    {
                      borderColor:
                        errors.curp && touched.curp
                          ? "red"
                          : "rgba(18, 3, 58, 0.1)",
                    },
                  ]}
                />
              </View>
              {errors.curp && touched.curp && (
                <Text style={globalStyles.error}>{errors.curp}</Text>
              )}
            </View>
          )}

          {countryBirth === "MX" && nationality === "MX" ? (
            <View style={{ paddingTop: 25 }}>
              <Text
                style={[
                  globalStyles.text,
                  { color: errors.rfc && touched.rfc ? "red" : "#737373" },
                ]}
              >
                RFC
              </Text>
              <View>
                <TextInput
                  name="rfc"
                  keyboardType="numeric"
                  placeholder="Your RFC Number"
                  onChangeText={(text) => {
                    formik.handleChange("rfc")(text.replace(/\D/g, ""));
                  }}
                  onBlur={formik.handleBlur("rfc")}
                  value={values.rfc}
                  autoCapitalize="none"
                  style={[
                    globalStyles.inputStyle,
                    {
                      borderColor:
                        errors.rfc && touched.rfc
                          ? "red"
                          : "rgba(18, 3, 58, 0.1)",
                    },
                  ]}
                />
              </View>
              {errors.rfc && touched.rfc && (
                <Text style={globalStyles.error}>{errors.rfc}</Text>
              )}
            </View>
          ) : null}

          {countryBirth !== "MX" || nationality !== "MX" ? (
            <View style={{ paddingTop: 25 }}>
              <Text
                style={[
                  globalStyles.text,
                  { color: errors.tax && touched.tax ? "red" : "#737373" },
                ]}
              >
                TAX ID
              </Text>
              <View>
                <TextInput
                  name="tax"
                  keyboardType="numeric"
                  placeholder="Your RFC Number"
                  onChangeText={(text) => {
                    formik.handleChange("tax")(text.replace(/\D/g, ""));
                  }}
                  onBlur={formik.handleBlur("tax")}
                  value={values.tax}
                  autoCapitalize="none"
                  style={[
                    globalStyles.inputStyle,
                    {
                      borderColor:
                        errors.tax && touched.tax
                          ? "red"
                          : "rgba(18, 3, 58, 0.1)",
                    },
                  ]}
                />
              </View>
              {errors.tax && touched.tax && (
                <Text style={globalStyles.error}>{errors.tax}</Text>
              )}
            </View>
          ) : null}

          <View style={{ paddingTop: 25 }}>
            <Text
              style={[
                globalStyles.text,
                { color: errors.phone && touched.phone ? "red" : "#737373" },
              ]}
            >
              Phone Number{" "}
            </Text>
            <View>
              <TextInput
                name="phone"
                placeholder="8110000000"
                maxLength={10}
                onChangeText={(text) => {
                  formik.handleChange("phone")(text.replace(/\D/g, ""));
                }}
                onBlur={formik.handleBlur("phone")}
                value={values.phone}
                keyboardType="numeric"
                autoCapitalize="none"
                style={[
                  globalStyles.inputStyle,
                  {
                    borderColor:
                      errors.phone && touched.phone
                        ? "red"
                        : "rgba(18, 3, 58, 0.1)",
                  },
                ]}
              />
            </View>
            {errors.phone && touched.phone && (
              <Text style={globalStyles.error}>{errors.phone}</Text>
            )}
          </View>

          {range === "$60,000 - $1,20,000" ? (
            <View style={{ marginTop: 25 }}>
              <Text
                style={[
                  globalStyles.text,
                  {
                    color:
                      errors.occupation && touched.occupation
                        ? "red"
                        : "#737373",
                  },
                ]}
              >
                Occupation
              </Text>
              <Pressable
                style={[
                  globalStyles.inputStyle,
                  {
                    borderColor:
                      errors.occupation && touched.occupation
                        ? "red"
                        : "rgba(18, 3, 58, 0.1)",
                  },
                ]}
                onPress={open}
              >
                <Picker
                  ref={pickerRef}
                  selectedValue={values.occupation}
                  onValueChange={formik.handleChange("occupation")}
                  onBlur={formik.handleBlur("occupation")}
                  value={values.occupation}
                >
                  <Picker.Item label="--- Select Occupation ---" value="" />
                  <Picker.Item
                    label="Artistic Activities"
                    value="Artistic Activities"
                  />
                  <Picker.Item label="Agriculture" value="Agriculture" />
                  <Picker.Item label="Livestock" value="Livestock" />
                  <Picker.Item label="Fishing" value="Fishing" />
                  <Picker.Item label="Commerce" value="Commerce" />
                  <Picker.Item label="Student" value="Student" />
                  <Picker.Item label="Employee" value="Employee" />
                  <Picker.Item
                    label="Entrepreneurship"
                    value="Entrepreneurship"
                  />
                  <Picker.Item label="Home" value="Home" />
                  <Picker.Item label="Teacher" value="Teacher" />
                  <Picker.Item label="Professional" value="Professional" />
                  <Picker.Item label="Public Servant" value="Public Servant" />
                  <Picker.Item
                    label="Systems and Communications"
                    value="Systems and Communications"
                  />
                  <Picker.Item
                    label="Self-Employed Worker"
                    value="Self-Employed Worker"
                  />
                  <Picker.Item label="Various Trades" value="Various Trades" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </Pressable>
              {errors.occupation && touched.occupation && (
                <Text style={globalStyles.error}>{errors.occupation}</Text>
              )}
            </View>
          ) : null}

          <TouchableOpacity
            disabled={!(formik.isValid && formik.dirty && age)}
            onPress={() => {
              handleFormSubmit(values);
            }}
            style={[
              globalStyles.button,
              {
                marginTop: 50,
              },
              { opacity: formik.isValid && formik.dirty ? 1 : 0.5 },
            ]}
          >
            <Text style={globalStyles.buttonText}>Next</Text>
          </TouchableOpacity>
          <Image
            style={[globalStyles.Logo, { marginBottom: 50 }]}
            source={require("../../../assets/vlogo.png")}
          />
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    height: 50,
    width: 322,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingTop: 12,
    paddingLeft: 30,
  },
  datetext: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "NunitoSans_400Regular",
    alignSelf: "flex-start",
    top: 12,
  },
});
export default CompleteProfile1;
