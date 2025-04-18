import { Icon } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import { VStack } from "@chakra-ui/react";

const Feature = ({ title, text, icon }: { title: string; text: string; icon: React.ElementType }) => {
    return (
      <VStack
        align="start"
        p={6}
        bg={useColorModeValue('white', 'gray.800')}
        rounded="xl"
        border="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        _hover={{ shadow: 'lg' }}
        transition="all 0.3s"
      >
        <Icon as={icon} w={10} h={10} color="blue.500" />
        <Text fontWeight="bold" fontSize="lg">
          {title}
        </Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
      </VStack>
    );
  };

export default Feature;