import { Image, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import TaskItem from '../components/TaskItem'; // Import TaskItem component
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from '@expo/vector-icons';
import img from '../assets/images/todo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks from AsyncStorage', error);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks to AsyncStorage', error);
      }
    };

    saveTasks();
  }, [tasks]);

  const addTask = () => {
    if (taskTitle.trim()) {
      const newTask = { id: Date.now().toString(), title: taskTitle, completed: false };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completeTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <SafeAreaView className="bg-[#101010] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex p-3 items-center justify-center">
          {/* Header */}
          <View className="h-[1.5rem] w-full flex justify-center items-center rounded-xl bg-[#1C1C1C]">
            <Text className="text-rose-200 shadow-xl text-5xl font-bold p-8">
              Let's Do it
            </Text>
          </View>

          {/* Task Input */}
          <View className="flex-row items-center mx-4 my-4 p-4 bg-[#1C1C1C] rounded-lg shadow-md w-full">
            <TextInput
              className="flex-1 p-4 text-lg text-white bg-[#2C2C2C] rounded-lg"
              placeholder="Enter a task..."
              placeholderTextColor="#888"
              value={taskTitle}
              onChangeText={setTaskTitle}
            />
            <TouchableOpacity onPress={addTask} className="ml-4 p-4 bg-[#2C2C2C] rounded-lg">
              <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {tasks.length === 0 ? (
            <View className="items-center justify-center">
              <Image className="m-6 h-40 w-40" source={img} />
              <Text className="text-rose-200 text-2xl text-center">
                No tasks yet!{"\n"}Add your first task to get started!
              </Text>
            </View>
          ) : (
            <ScrollView className="w-full h-full">
              {/* Task List */}
              {tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={() => deleteTask(task.id)}
                  onComplete={() => completeTask(task.id)}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#121212" style="light" />
    </SafeAreaView>
  );
};

export default Index;
