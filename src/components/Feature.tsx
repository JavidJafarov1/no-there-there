import { IconType } from 'react-icons'
import { Box, Heading, Text, Icon, useColorModeValue } from '@chakra-ui/react'

interface FeatureProps {
  title: string
  text: string
  icon: IconType
}

const Feature = ({ title, text, icon: IconComponent }: FeatureProps) => {
  return (
    <Box
      p={8}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="xl"
      boxShadow="md"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg'
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        w={12}
        h={12}
        borderRadius="xl"
        bgGradient="linear(135deg, purple.400, pink.400)"
        color="white"
        mx="auto"
        mb={6}
      >
        <Icon as={IconComponent} boxSize={6} />
      </Box>
      <Heading
        as="h3"
        fontSize="xl"
        fontWeight="bold"
        textAlign="center"
        mb={3}
        bgGradient="linear(to-r, purple.500, pink.500)"
        bgClip="text"
      >
        {title}
      </Heading>
      <Text
        color={useColorModeValue('gray.600', 'gray.300')}
        lineHeight="tall"
      >
        {text}
      </Text>
    </Box>
  )
}

export default Feature