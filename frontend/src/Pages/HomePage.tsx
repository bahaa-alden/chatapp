import {
  Box,
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/SignUp';

function HomePage() {
  const bg = useColorModeValue('white', 'black');
  const bgS = useColorModeValue('rgb(26, 193, 222)', 'white');

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        p={'3'}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        bg={bg}
      >
        <Text fontSize={'4xl'} fontFamily={'work sans'}>
          Bio-Gram
        </Text>
      </Box>
      <Box bg={bg} w="100" p="4" borderRadius={'lg'} borderWidth="1px">
        <Tabs variant="line" colorScheme={bg}>
          <TabList>
            <Tab width={'50%'}>Login</Tab>
            <Tab width={'50%'}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login bg={bg} bgS={bgS} />
            </TabPanel>
            <TabPanel>
              <SignUp bgS={bgS} bg={bg} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
