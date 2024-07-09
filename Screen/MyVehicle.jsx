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
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
  Button,
} from "react-native";
import axios from "axios";
import tw from "twrnc";

export default function MyVehicle() {
  const [showVehicle, setShowVehicle] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const GetVehicleData = async () => {
    try {
      axios
        .post("https://parkvue.microcrm.in/api/customer-vehicle", {
          customer_id: 1,
          fleet_type: null,
        })
        .then((res) => {
          const { status_code, message, vehicleList } = res.data;

          if (status_code == "1") {
            setShowVehicle(vehicleList);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetVehicleData();
  }, []);

  return (
    <SafeAreaView>
      <View
        style={tw`flex flex-row justify-between mx-3 px-3 py-2 items-center rounded-[28px] my-2 bg-[#084B82]`}
      >
        <Text style={tw`text-white font-semibold text-base`}>My Vehicle</Text>
        <TouchableOpacity>
          <AntDesign
            style={tw`bg-white p-1 rounded-full`}
            name="plus"
            color={"#25AE7A"}
            size={26}
          />
        </TouchableOpacity>
      </View>

      <Text style={tw`mt-2 text-base text-[#000000] opacity-50 mx-4`}>
        {showVehicle.length} Vehicle added
      </Text>
      <ScrollView style={tw`mt-4 mx-3 mb-25`}>
        {showVehicle.map((item, index) => {
          return (
            <TouchableOpacity key={index}>
              <View
                style={tw`bg-white flex flex-row py-2 px-2 mb-3 items-center gap-4 rounded-md`}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={tw`bg-[#256db5] absolute bottom-6 w-full`}>
          <View>
            <Text>Hello World!</Text>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)}>
        <Button style={tw`bg-black`} title="open Drawer"> </Button>
      </Pressable>
    </SafeAreaView>
  );
}
