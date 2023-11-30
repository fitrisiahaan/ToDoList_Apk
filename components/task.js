import { Text, HStack, IconButton, Icon, Box, Checkbox, Pressable } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

const TaskList = (props) => {
  const { data, onChecked, onDeleted, deletedIcon, onItemPress } = props;

  return (
    <Pressable onPress={onItemPress}>
      <Box
        px={3}
        py={4}
        bg={data.isCompleted ? "primary.500" : "#fff"}
        my="7.5px"
        borderRadius={5}
      >
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <Checkbox
            isChecked={data.isCompleted}
            onChange={onChecked}
            accessibilityLabel="This is a dummy checkbox"
            value={data.title}
            aria-label="This is a dummy checkbox"
          />
          <Text
            width="100%"
            fontSize={16}
            flexShrink={1}
            textAlign="left"
            mx="10px"
            strikeThrough={data.isCompleted}
          >
            {data.title}
          </Text>
          {deletedIcon && (
            <IconButton
              size="sm"
              colorScheme="trueGray"
              icon={
                <Icon
                  as={FontAwesome5}
                  name="trash"
                  size="sm"
                  color={data.isCompleted ? "#fff" : "red.700"}
                />
              }
              onPress={onDeleted}
            />
          )}
        </HStack>
      </Box>
    </Pressable>
  );
};

export default TaskList;

