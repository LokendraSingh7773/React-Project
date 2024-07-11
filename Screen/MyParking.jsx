import React, { useState } from 'react';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import { SafeAreaView, StyleSheet ,View , TouchableOpacity , Text , TextInput} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons , AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'twrnc';

const  BottomSheetComponentProps = {};


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

export default function BottomSheetComponent(){
const [isVisible, setIsVisible] = useState(false);
const [selectedValue, setSelectedValue] = useState(null);

const list = [
  { title: 'List Item 1' },
  { title: 'List Item 2' },
  {
    title: 'Cancel',
    containerStyle: { backgroundColor: 'red' },
    titleStyle: { color: 'white' },
    onPress: () => setIsVisible(false),
  },
];

return (
  <SafeAreaView>
    <Button
      title="Open Bottom Sheet"
      onPress={() => setIsVisible(true)}
      buttonStyle={styles.button}
    />
    <BottomSheet modalProps={{}} isVisible={isVisible}>
	<View
          style={tw`bg-white w-full px-4 py-6 rounded-t-[20px]`}
        >
          <TouchableOpacity style={[tw`w-full items-end absolute right-2`]}>
            <Button
              onPress={() => setIsVisible(false)}
              buttonStyle={tw`rounded-full`}
			  color={"#ffffff"}
              type="solid"
            >
              <AntDesign name="closecircleo" color="red" size={32} />
            </Button>
          </TouchableOpacity>
          <View style={[tw`px-2`]}>
            <Text style={tw`text-lg font-semibold `}>Add Vehicle</Text>
            <View>
              <Text style={tw`text-sm mt-4`}>Select Vehicle Type</Text>
              <View style={[tw`flex flex-row gap-3`]}>
                <CustomRadioButton
                  label="Car"
                  selected={selectedValue === "option1"}
                  onSelect={() => setSelectedValue("option1")}
                />
                <CustomRadioButton
                  label="Bike"
                  selected={selectedValue === "option2"}
                  onSelect={() => setSelectedValue("option2")}
                />
              </View>
              <View>
                <Text style={tw`text-sm mt-7`}>Vehicle Number</Text>
                <TextInput
                  style={tw`w-full border-b text-sm items-center h-8 border-b-[#ccc] uppercase`}
                  placeholder="Enter number"
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
                  placeholderTextColor="#24242480"
                  keyboardType="text"
                  maxLength={40}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={tw`bg-[#25AE7A] mt-12 mb-6 py-3 rounded-[23px]`}
                >
                  <Text style={tw`text-center text-white font-medium`}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
    </BottomSheet>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
button: {
  margin: 10,
},
});
