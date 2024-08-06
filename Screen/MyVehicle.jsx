import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import axios from "axios";

import { RefreshControl } from "react-native";
import tw from "twrnc";
import { BottomSheet, Button } from "@rneui/themed";
import Toast from "react-native-toast-message";

const CustomRadioButton = ({ label, selected, onSelect }) => (
  <View>
    <TouchableOpacity
      style={[
        tw`bg-white px-3 py-1 border-[1px] rounded-full mt-2 flex flex-row items-center gap-2`,
        { borderColor: selected ? "#007BFF" : "#ccc" },
      ]}
      onPress={onSelect}
    >
      <MaterialCommunityIcons
        name={label == "Car" ? "car" : "motorbike"}
        color={selected ? "#007BFF" : "#000"}
        size={26}
      />
      <Text style={[tw`text-sm`, { color: selected ? "#007BFF" : "#000" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  </View>
);

export default function MyVehicle() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [showVehicle, setShowVehicle] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [IsUpdateVehicleDetails, setIsUpdateVehicleDetails] = useState(false);
  const [IsFetchedVehicledata, setIsFetchedVehicleData] = useState(false);

  const GetVehicleData = async () => {
    try {
      setIsFetchedVehicleData(false);
      axios
        .post("https://customer.theparkvue.com/api/customer-vehicle", {
          customer_id: 1,
          fleet_type: null,
        })
        .then((res) => {
          const { status_code, message, vehicleList } = res.data;
          if (status_code == "1") {
            setShowVehicle(vehicleList);
            setIsFetchedVehicleData(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsFetchedVehicleData(message);
          Toast.show({
            type: "error",
            text1: message,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [vehicle_model, setInputValue] = useState("");
  const [vehicle_number, setVehicleNumber] = useState("");
  const [vehicle_number_old, setvehicle_number_old] = useState("");
  const [temp_vehicle, settemp_vehicle] = useState("");

  const vehicleData = {
    customer_id: 1,
    vehicle_model: vehicle_model,
    vehicle_number: vehicle_number,
    fleet_type: selectedValue,
  };

  const [isLoading, setIsLoading] = useState(false);
  const Addvehicle = async () => {
    try {
      setIsLoading(true);
      axios
        .post("https://customer.theparkvue.com/api/add-vehicle", vehicleData, {
          headers: {
            customer_id: 1,
            token:
              "0bd480dc4cf9949c6d0f878e3ee186bd8bd3cc41864ee63a7174c0bbec16e839",
          },
        })
        .then((res) => {
          const { status_code, message } = res.data;

          // console.log(res.data);
          setIsLoading(false);
          if (status_code == "1") {
            setIsVisible(false);
            GetVehicleData();
            setInputValue(null);
            setSelectedValue(null);
            setVehicleNumber(null);
            Toast.show({
              type: "success",
              text1: message,
            });
          } else {
            Toast.show({
              type: "error",
              text1: message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "success",
        text1: message,
      });
    }
  };

  const UpdateTheVehicleDetails = {
    customer_id: 1,
    vehicle_model: vehicle_model,
    vehicle_number: vehicle_number,
    fleet_type: selectedValue,
    vehicle_number_old: vehicle_number_old,
    temp_vehicle: temp_vehicle,
  };

  const SHowUpdateTimeData = (item) => {
    setInputValue(item.vehicle_model);
    setVehicleNumber(item.vehicle_number);
    setvehicle_number_old(item.vehicle_number);
    setSelectedValue(item.fleet_type);
    setIsUpdateVehicleDetails(true);
  };

  const IsUpdateVehicle = async () => {
    try {
      setIsLoading(true);
      axios
        .post(
          "https://customer.theparkvue.com/api/edit-vehicle",
          UpdateTheVehicleDetails,
          {
            headers: {
              customer_id: 1,
              token:
                "0bd480dc4cf9949c6d0f878e3ee186bd8bd3cc41864ee63a7174c0bbec16e839",
            },
          }
        )
        .then((res) => {
          const { status_code, message } = res.data;
          // console.log(message);
          setIsLoading(false);
          if (status_code == "1") {
            GetVehicleData();
            setIsUpdateVehicleDetails(false);
            setInputValue(null);
            setSelectedValue(null);
            setVehicleNumber(null);
            Toast.show({
              type: "success",
              text1: message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const openTheAddVehicleModel = () => {
    setIsVisible(true),
      setInputValue(null),
      setSelectedValue(null),
      setVehicleNumber(null);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      GetVehicleData();
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    GetVehicleData();
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        style={tw`h-full flex`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={tw`flex flex-row justify-between mx-3 px-3 py-2 items-center rounded-[28px] my-2 bg-[#084B82]`}
        >
          <Text style={tw`text-white font-semibold text-base`}>My Vehicle</Text>
          <TouchableOpacity>
            <AntDesign
              style={tw`bg-white p-1 rounded-full`}
              name="plus"
              onPress={openTheAddVehicleModel}
              color={"#25AE7A"}
              size={26}
            />
          </TouchableOpacity>
        </View>

        <Text style={tw`mt-2 text-base text-[#000000] opacity-50 mx-4`}>
          {showVehicle.length} Vehicle added
        </Text>

        {IsFetchedVehicledata === true ? (
          <ScrollView style={tw`mt-4 mx-3 mb-4`}>
            {showVehicle.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    SHowUpdateTimeData(item);
                  }}
                  key={index}
                >
                  <View
                    style={tw`bg-white flex flex-row py-2 px-2 mb-3 items-center gap-4 rounded-[11px]`}
                  >
                    {item.fleet_type == "bike" ? (
                      <View
                        style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}
                      >
                        <MaterialCommunityIcons
                          name="bike"
                          color={"#FF7700"}
                          size={22}
                        />
                      </View>
                    ) : (
                      <View
                        style={tw`bg-[#DAF8F0] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}
                      >
                        <FontAwesome name="car" color={"#00BC8A"} size={22} />
                      </View>
                    )}
                    <View>
                      <Text style={tw`text-black font-normal text-sm`}>
                        {item.fleet_type}
                      </Text>
                      <Text style={tw`text-black font-semibold text-sm mt-1`}>
                        {item.vehicle_model} :{item.vehicle_number}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <View style={tw`items-center h-full mt-40`}>
            <Button
              style={tw`text-center justify-center items-center`}
              type="Clear"
              loadingProps={{
                size: "40px",
                color: "#084b82",
              }}
              loadingStyle={tw`text-xl`}
              loading
            ></Button>
            <Text style={tw`text-center text-[#084b82] text-base ml-2`}>
              Loading..
            </Text>
          </View>
        )}
        <BottomSheet
          onBackdropPress={() => {
            setIsVisible(false);
          }}
          modalProps={{}}
          isVisible={isVisible}
        >
          <View style={tw`bg-white w-full px-4 py-6 rounded-t-[20px]`}>
            <View style={tw`absolute right-2`}>
              <Button
                onPress={() => setIsVisible(false)}
                buttonStyle={tw`rounded-lg px-4 py-2 text-[#f00]`}
                titleStyle={tw`text-[#f00]`}
                type="Clear"
              >
                Close
                {/* <AntDesign name="closecircleo" color="red" size={32} /> */}
              </Button>
            </View>
            <View style={[tw`px-2`]}>
              <Text style={tw`text-lg font-semibold `}>Add Vehicle</Text>
              <View>
                <Text style={tw`text-sm mt-4`}>Select Vehicle Type</Text>
                <View style={[tw`flex flex-row gap-3`]}>
                  <CustomRadioButton
                    label="Car"
                    value="car"
                    selected={selectedValue === "car"}
                    onSelect={() => setSelectedValue("car")}
                  />
                  <CustomRadioButton
                    label="Bike"
                    value="bike"
                    selected={selectedValue === "bike"}
                    onSelect={() => setSelectedValue("bike")}
                  />
                </View>
                <View>
                  <Text style={tw`text-sm mt-7`}>Vehicle Number</Text>
                  <TextInput
                    style={tw`w-full border-b text-sm items-center h-8 border-b-[#ccc] uppercase`}
                    placeholder="Enter number"
                    value={vehicleData.vehicle_number}
                    onChangeText={(text) => setVehicleNumber(text)}
                    placeholderTextColor="#24242480"
                    keyboardType="text"
                    autoCapitalize="characters"
                    maxLength={10}
                  />
                </View>
                <View>
                  <Text style={tw`text-sm mt-7`}>Vehicle Name</Text>
                  <TextInput
                    style={tw`w-full border-b text-sm items-center h-8 border-b-[#ccc] uppercase`}
                    placeholder="Enter Vehicle Name"
                    value={vehicleData.vehicle_model}
                    onChangeText={(text) => setInputValue(text)}
                    placeholderTextColor="#24242480"
                    keyboardType="text"
                    autoCapitalize="characters"
                    maxLength={40}
                  />
                </View>
                <View>
                  <Button
                    onPress={Addvehicle}
                    loading={isLoading}
                    buttonStyle={tw`bg-[#25AE7A] mt-12 mb-6 py-3 rounded-[23px]`}
                  >
                    <Text style={tw`text-center text-white font-medium`}>
                      Submit
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </BottomSheet>

        {/* for update vehicle  */}
        <BottomSheet
          onBackdropPress={() => {
            setIsUpdateVehicleDetails(false);
          }}
          modalProps={{}}
          isVisible={IsUpdateVehicleDetails}
        >
          <View style={tw`bg-white w-full px-4 py-6 rounded-t-[20px]`}>
            <View style={tw`absolute right-2`}>
              <Button
                onPress={() => setIsUpdateVehicleDetails(false)}
                buttonStyle={tw`rounded-lg px-4 py-2 text-[#f00]`}
                titleStyle={tw`text-[#f00]`}
                type="Clear"
              >
                Close
                {/* <AntDesign name="closecircleo" color="red" size={32} /> */}
              </Button>
            </View>
            <View style={[tw`px-2`]}>
              <Text style={tw`text-lg font-semibold `}>Edit Vehicle</Text>
              <View>
                <Text style={tw`text-sm mt-4`}>Select Vehicle Type</Text>
                <View style={[tw`flex flex-row gap-3`]}>
                  <CustomRadioButton
                    label="Car"
                    value="car"
                    selected={selectedValue === "car"}
                    // onSelect={() => setSelectedValue("car")}
                  />
                  <CustomRadioButton
                    label="Bike"
                    value="bike"
                    selected={selectedValue === "bike"}
                    // onSelect={() => setSelectedValue("bike")}
                  />
                </View>
                <View>
                  <Text style={tw`text-sm mt-7`}>Vehicle Number</Text>
                  <TextInput
                    style={tw`w-full border-b text-sm items-center h-8 border-b-[#ccc] uppercase`}
                    placeholder="Enter number"
                    value={UpdateTheVehicleDetails.vehicle_number}
                    onChangeText={(text) => setVehicleNumber(text)}
                    placeholderTextColor="#24242480"
                    keyboardType="text"
                    autoCapitalize="characters"
                    maxLength={10}
                  />
                </View>
                <View>
                  <Text style={tw`text-sm mt-7`}>Vehicle Name</Text>
                  <TextInput
                    style={tw`w-full border-b text-sm items-center h-8 border-b-[#ccc] uppercase`}
                    placeholder="Enter Vehicle Name"
                    value={UpdateTheVehicleDetails.vehicle_model}
                    onChangeText={(text) => setInputValue(text)}
                    placeholderTextColor="#24242480"
                    autoCapitalize="characters"
                    maxLength={40}
                  />
                </View>
                <View>
                  <Button
                    onPress={IsUpdateVehicle}
                    loading={isLoading}
                    buttonStyle={tw`bg-[#25AE7A] mt-12 mb-6 py-3 rounded-[23px]`}
                  >
                    <Text style={tw`text-center text-white font-medium`}>
                      Submit
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </BottomSheet>
        <View style={tw`absolute top-1 w-full h-full `}>
          <Toast position={"top"}></Toast>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: "100%",
  },
});
