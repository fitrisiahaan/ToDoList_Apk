import React, { useState, useEffect } from "react";
import { Center, Text, Box, ScrollView, Icon, Spinner } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskList } from "../components";

const TaskCompletedScreen = () => {
  const [completedListLength, setCompletedListLength] = useState(0);
  const [allList, setAllList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleStatusChange = (index) => {
    const newList = [...allList];
    newList[index].isCompleted = !newList[index].isCompleted;
    setAllList(newList);
    try {
      AsyncStorage.setItem("@task-list", JSON.stringify(newList));
    } catch (e) {
      console.log("Error update status task: in task-completed.js");
      console.error(e.message);
    } finally {
      setCompletedListLength(newList.filter((item) => item.isCompleted).length);
    }
  };

  const getTaskList = async () => {
    try {
      const value = await AsyncStorage.getItem("@task-list");
      if (value !== null) {
        const allData = JSON.parse(value);
        const completedData = allData.filter((item) => item.isCompleted).length;
        setAllList(allData);
        setCompletedListLength(completedData);
      } else {
        console.log("No tasks");
      }
    } catch (e) {
      console.log("Error get task: in task-completed.js");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <Box mx={3} mt={3} flex={1}>
      {isLoading ? (
        <Center flex={1}>
          <Spinner size="lg" />
        </Center>
      ) : completedListLength === 0 ? (
        <Center flex={1}>
          <Icon as={AntDesign} name="frowno" size={82} color="primary.600" mb={2} />
          <Text fontSize={16} bold={true}>
            No completed listings yet
          </Text>
          <Text fontSize={16}>Hurry up your list!</Text>
        </Center>
      ) : (
        <ScrollView>
          {allList.map((item, index) => {
            if (item.isCompleted) {
              return (
                <Box key={item.title + index.toString()}>
                  <TaskList
                    data={item}
                    onChecked={() => handleStatusChange(index)}
                    onItemPress={() => handleStatusChange(index)}
                  />
                </Box>
              );
            }
            return null;
          })}
        </ScrollView>
      )}
    </Box>
  );
};

export default TaskCompletedScreen;

