// App.js 

import React, { useState } from 'react'; 
import { 
	View, Text, TouchableOpacity, 
	StyleSheet 
} from 'react-native'; 

const CustomRadioButton = ({ label, selected, onSelect }) => ( 
	<TouchableOpacity 
		style={[styles.radioButton, 
		{ borderColor: selected ? '#007BFF' : '#FFF' }]} 
		onPress={onSelect} 
	> 
		<Text style={[styles.radioButtonText, 
		{ color: selected ? '#000' : '#000' }]}> 
			{label} 
		</Text> 
	</TouchableOpacity> 
); 



const App = () => { 
	const [selectedValue, setSelectedValue] = useState(null); 

	return ( 
		<View style={styles.container}> 
			<CustomRadioButton 
				label="ReactJS"
				selected={selectedValue === 'option1'} 
				onSelect={() => setSelectedValue('option1')} 
			/> 
			<CustomRadioButton 
				label="NextJs"
				selected={selectedValue === 'option2'} 
				onSelect={() => setSelectedValue('option2')} 
			/> 
			<CustomRadioButton 
				label="React Native"
				selected={selectedValue === 'option3'} 
				onSelect={() => setSelectedValue('option3')} 
			/> 
		</View> 
	); 
}; 

const styles = StyleSheet.create({ 
	container: { 
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center', 
		backgroundColor: '#F5F5F5', 
	}, 
	radioButton: { 
		paddingVertical: 12, 
		paddingHorizontal: 16, 
		borderRadius: 8, 
		marginVertical: 8, 
		borderWidth: 1, 
		backgroundColor: '#fff', 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between', 
		width: 280, 
	}, 
	radioButtonText: { 
		fontSize: 16, 
	}, 
}); 

export default App;
