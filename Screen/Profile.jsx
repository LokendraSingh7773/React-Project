import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { RefreshControl } from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import tw from "twrnc";

export default function MyProfile() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
          style={tw`flex flex-row justify-between mx-3 px-3 py-3 items-center rounded-[28px] my-2 bg-[#084B82]`}
        >
          <Text style={tw`text-white font-semibold text-base`}>
            Profile and Settings
          </Text>
          {/* <TouchableOpacity>
            <AntDesign
              style={tw`bg-white p-1 rounded-full`}
              name="plus"
              color={"#25AE7A"}
              size={26}
              />
          </TouchableOpacity> */}
        </View>

        {/* Main Design */}
        <ScrollView style={tw`px-4`}>
          <View
            style={tw`relative bg-white items-center px-3 mt-12 rounded-[11px] pb-3 h-45`}
          >
            <Avatar
              size={97}
              rounded
              icon={{ name: "user", type: "font-awesome", color: "#3879F0" }}
              containerStyle={tw`bg-white absolute -top-11 border-[5px] border-[#f5f5f5]`}
            />
            <TouchableOpacity style={tw`self-end mt-1`}>
              <MaterialIcons name="edit" color="#000" size={25} />
            </TouchableOpacity>

            <Text style={tw`mt-7 text-[#084B82] font-bold text-lg mb-1`}>
              Ankur Kumar Gupta
            </Text>
            <View style={tw`flex flex-row gap-2 mt-2`}>
              <FontAwesome size={20} name="phone" color={"#8D8D8D"} />
              <Text style={tw`text-[#8D8D8D]`}>+91 9982499155</Text>
            </View>
            <View style={tw`flex flex-row gap-2 mt-1 items-center`}>
              <MaterialCommunityIcons
                size={20}
                name="email"
                color={"#8D8D8D"}
              />
              <Text style={tw`text-[#8D8D8D]`}>
                lokendrasingh0773@gmail.com
              </Text>
            </View>
            <View style={tw`flex flex-row gap-2 mt-1 items-center`}>
              <FontAwesome6 size={20} name="location-dot" color={"#8D8D8D"} />
              <Text style={tw`text-[#8D8D8D]`}>
                Patel Marg ,Mansarovar ,Jaipur , 302020
              </Text>
            </View>
          </View>
          {/* For Green Pass */}
          <View
            style={tw`bg-white rounded-[11px] mt-3 justify-between px-3 pb-3 `}
          >
            <View style={tw`bg-white flex flex-row justify-between`}>
              <View style={tw`flex flex-row items-center gap-2`}>
                <MaterialCommunityIcons
                  size={23}
                  name="ticket-outline"
                  color={"#13A74A"}
                />
                <Text style={tw`text-[#13A74A] text-[15px] font-medium`}>Green Pass</Text>
              </View>
              <View>
                <Button
                  buttonStyle={tw`rounded-lg px-2`}
                  type="none"
                  radius={"xl"}
                  titleStyle={tw`text-[#25AE7A]`}
                >
                  <Feather name="plus" color="#25AE7A" size={25} />
                </Button>
              </View>
            </View>
            <View>
              <Button
                buttonStyle={tw`rounded-[9px] bg-[#13A74A] bg-opacity-15 justify-start px-4 mt-1 py-[10px]`}
              >
                <Text style={tw`text-[#343434] font-medium`}>
                  2 Pass available
                </Text>
              </Button>
            </View>
          </View>

          {/* Help */}
          <TouchableOpacity
            style={tw`flex flex-row items-center gap-3 mt-5 bg-white rounded-[11px] py-[15px] px-3`}
          >
            <Feather name="info" color="#6E6E6E" size={20} />
            <Text style={tw`font-medium text-[#6E6E6E]`}>Help</Text>
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity
            style={tw`flex flex-row items-center gap-3 mt-2 bg-white rounded-[11px] py-[15px] px-3`}
          >
            <MaterialIcons name="privacy-tip" color="#6E6E6E" size={20} />
            <Text style={tw`font-medium text-[#6E6E6E]`}>Privacy Policy</Text>
          </TouchableOpacity>

          {/* FAQ */}
          <TouchableOpacity
            style={tw`flex flex-row items-center gap-3 mt-2 bg-white rounded-[11px] py-[15px] px-3`}
          >
            <Feather name="help-circle" color="#6E6E6E" size={20} />
            <Text style={tw`font-medium text-[#6E6E6E]`}>FAQ</Text>
          </TouchableOpacity>

          {/* Parking History */}
          <TouchableOpacity
            style={tw`flex flex-row items-center gap-3 mt-2 bg-white rounded-[11px] py-[15px] px-3`}
          >
            <Octicons name="history" color="#6E6E6E" size={20} />
            <Text style={tw`font-medium text-[#6E6E6E]`}>Parking History</Text>
          </TouchableOpacity>

          {/* Help */}
          <TouchableOpacity
            style={tw`flex flex-row items-center gap-3 mt-2 bg-white rounded-[11px] py-[15px] px-3`}
          >
            <Feather name="log-out" color="#f00" size={20} />
            <Text style={tw`font-medium text-[#f00]`}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
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
