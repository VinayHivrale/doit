import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const TaskItem = ({ task, onDelete, onComplete }) => {
  return (
    <View className="flex-row items-center bg-[#1E1E1E] p-4 rounded-lg my-2 shadow-lg mx-4">
      <TouchableOpacity onPress={onComplete} className="mr-4 rounded-md bg-[#d0fcd3]">
        <MaterialIcons
          name={task.completed ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={task.completed ? '#4CAF50' : '#999'}
        />
      </TouchableOpacity>
      <Text className={`flex-1 text-lg ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
        {task.title}
      </Text>
      <TouchableOpacity onPress={onDelete} className="ml-4 bg-[#ffd1d1] rounded-md">
        <MaterialIcons name="delete" size={24} color="#f44336" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
