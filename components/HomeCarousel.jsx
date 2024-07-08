import React from "react";
import { View, Text, Dimensions ,StyleSheet ,TouchableOpacity } from "react-native";
import tw from "twrnc";
import Carousel from "react-native-reanimated-carousel";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function MyVehicle() {
  const width = Dimensions.get("window").width;
  return (
    <View style={tw`h-full `}>
      <Carousel
        width={width}
        height={width}
        autoPlay={false}
        data={[...new Array(6).keys()]}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View style={[tw`px-6 py-4 mx-4 mt-6  rounded-[20px] shadow-2xl shadow-[#25AE7A]  bg-white` , styles.card]}>
            <View style={tw`flex flex-row justify-between items-center`}>
            <View>
                <Text style={tw`text-[15px] font-semibold text-black `}>Jaipur Internation Airport</Text>
                <Text style={tw`text-xs text-[#9A9A9A] mt-1`}>Jaipur Internation Airport</Text>
            </View>
            <View style={tw`bg-[#DFF0FF] px-4 py-1 rounded-[13px]`}>
                <Text style={tw`text-lg font-semibold text-[#084B82]`}>₹20</Text>
                <Text style={tw`text-xs text-[#5A5A5A]`}>Per hrs</Text>
            </View>
            </View>
            <View style={tw`flex flex-row justify-between mt-4 mx-2`}>
            <View style={tw`flex flex-row items-center`}>
                <Text style={tw`text-[15px] font-medium text-[#393939] `}>4.5</Text>
                <FontAwesome name="star" color={"#FFBB00"} size={18}/>
            </View>
            <View style={tw`flex flex-row items-center gap-1`}>
                <MaterialIcons style={tw`bg-[#084B82] rounded-1 w-[19px] h-[19px] `} name="directions-run" color={"white"}  size={18}/>
                <Text style={tw`text-sm font-medium text-[#393939] `}>2 km away</Text>
            </View>
            <View style={tw`flex flex-row items-center gap-1 text-center`}>
            <MaterialIcons style={tw`bg-[#084B82] rounded-1 w-[19px] h-[19px] text-center`} name="local-parking" color={"white"}  size={16}/>
            <Text style={tw`text-sm font-medium text-[#0DB756] `}>18 spots</Text>
            </View>
            </View>
            <View>
            <TouchableOpacity style={tw`bg-[#25AE7A]  mt-6 py-3 rounded-[23px]`}>
            <Text style={tw`text-center text-white font-medium`}>Book Now</Text>
          </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:'white'
    },
    map: {
      width: "100%",
      height: "100%",
    },
     card: {
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
        
    },
  });