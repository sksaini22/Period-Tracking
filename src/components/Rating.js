import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import tw from 'twrnc';

const Rating = ({ rating, setRating ,name}) => {
  const [selected, setSelected] = useState(rating);

  const handleRatingSelect = (newRating) => {
    setSelected(newRating);
    setRating(newRating);
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((num) => (
        <TouchableOpacity
          key={num}
          onPress={() => handleRatingSelect(num)}
        >
          <List.Icon
            icon={name}
            size={30}
            color={num <= selected ? tw.color('sky-700') : '#fff'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Rating;
