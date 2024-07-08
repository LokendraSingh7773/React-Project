import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";

export default function MyVehicle() {
  const [Vehiclelist , setvehicleList] = React.useState(1,2,3,4,5)
  return (
    <View>
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
      <Text style={tw`mt-2 text-base text-[#000000] opacity-50 mx-4`}>4 Vehicle added</Text>
      <ScrollView style={tw`mt-4 mx-3 mb-25`}>
        
        <View  style={tw`bg-white flex flex-row py-2 px-2 mb-2 items-center gap-4 rounded-md`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
        <View  style={tw`bg-white flex flex-row py-2 px-2 items-center gap-4 rounded-md  mb-2`}>
          <View style={tw`bg-[#F8E8DA] items-center rounded-[11px] min-h-[55px] min-w-[55px] justify-center`}>
            <FontAwesome name="car" color={"#FF7700"} size={22}/>
          </View>
          <View>
            <Text style={tw`text-black font-normal text-sm`}>Bike</Text>
            <Text style={tw`text-black font-semibold text-sm mt-1`}>Hyundai Creta :RJ14LS7773 </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
