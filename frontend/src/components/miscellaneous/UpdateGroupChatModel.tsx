import { ViewIcon } from '@chakra-ui/icons';
import {
  useDisclosure,
  useToast,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  Stack,
  Box,
  ModalFooter,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { User } from '../../types/interfaces';
import { Fragment } from 'react';
import UserBadgeList from '../UserBadge/UserBadgeList';
import ChatLoading from '../../utils/ChatLoading';
import UserListItem from '../UserAvatar/UserListItems';
import { storage } from '../../utils/storage';
import axios, { AxiosRequestConfig } from 'axios';
import { chatState } from '../../Context/ChatProvider';

function UpdateGroupChatModel({
  fetchAgain,
  setFetchAgain,
  fetchMessages,
  socket,
}: any) {
  const isCreate = false;
  const { user, selectedChat, setSelectedChat, chats, setChats } = chatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>(
    selectedChat.users
  );
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();
  const handleDelete = (delUser: User) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== delUser.id));
  };

  const handleAddUser = async (userInfo: User) => {
    if (selectedChat.users.includes(userInfo)) {
      toast({
        title: 'User already in group',
        description: 'User already exist',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    try {
      setLoading(true);
      const token = storage.getToken();
      const config: AxiosRequestConfig = {
        url: `/api/v1/chats/groupAdd`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        data: { chatId: selectedChat.id, userId: userInfo.id },
      };
      const res = await (await axios(config)).data;
      const { data } = res.data;
      if (res.status === 'success') {
        toast({
          title: 'Added Successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
      }
    } catch (err: any) {
      toast({
        title: 'Error Occurred',
        description: err.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
    setSearchResult([]);
    setSearch('');
    setLoading(false);
  };

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) return;
    try {
      setLoading(true);
      const token = storage.getToken();
      const config: AxiosRequestConfig = {
        url: `/api/v1/users?search=${search}`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'GET',
      };
      const { data } = await (await axios(config)).data.data;
      setSearchResult(data);
    } catch (err) {
      toast({
        title: 'Error Occurred',
        description: 'Failed to load the search result',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
    setLoading(false);
  };
  const handleRename = async () => {
    if (!groupName) {
      toast({
        title: 'Please enter a new group name first',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    try {
      setRenameLoading(true);
      const token = storage.getToken();
      const config: AxiosRequestConfig = {
        url: `/api/v1/chats/groupRename`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'PATCH',
        data: { chatId: selectedChat.id, name: groupName },
      };
      const res = await (await axios(config)).data;
      const { data } = res.data;
      if (res.status === 'success') {
        toast({
          title: 'Renamed Successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        setFetchAgain(!fetchAgain);
        setSelectedChat(data);
        socket.emit('group rename', {
          chat: data,
          userId: user.id,
        });
      }
    } catch (err) {
      toast({
        title: 'Failed to rename the chat',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
    setRenameLoading(false);
    setGroupName('');
  };

  const handleRemove = async (userInfo: User) => {
    try {
      setLoading(true);
      const token = storage.getToken();
      const config: AxiosRequestConfig = {
        url: `/api/v1/chats/groupRemove`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        data: { chatId: selectedChat.id, userId: userInfo.id },
      };
      const res = await (await axios(config)).data;
      const { data } = res.data;
      if (res.status === 'success') {
        toast({
          title: 'Removed Successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        userInfo.id === user.id
          ? setSelectedChat({ users: [], groupAdmin: {} })
          : setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        // fetchMessages();
      }
    } catch (err: any) {
      toast({
        title: 'Error Occurred',
        description: err.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
    setLoading(false);
  };
  return (
    <Fragment>
      <IconButton
        aria-label=""
        display={{ base: 'flex' }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />
      <Modal
        isOpen={isOpen}
        isCentered
        onClose={() => {
          setSelectedUsers([]);
          setSearchResult([]);
          setSearch('');
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            justifyContent="center"
            fontSize="40px"
            fontFamily="work sans"
          >
            {selectedChat.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box w="100%" display="flex" flexWrap="wrap" p="3">
              <UserBadgeList
                users={selectedChat.users}
                handleFunction={handleRemove}
                isCreate={isCreate}
              />
            </Box>
            <FormControl display="flex">
              <Input
                value={groupName}
                placeholder="Chat Name"
                mb="3"
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml="2"
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            {selectedChat.isGroup && user.id === selectedChat.groupAdmin.id ? (
              <Fragment>
                <FormControl>
                  <Input
                    value={search}
                    placeholder="Add Users To Group"
                    mb={1}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </FormControl>
                {loading ? (
                  <Spinner size="lg" borderWidth="5px" mt="3" />
                ) : (
                  <Stack w="100%">
                    <UserListItem
                      users={searchResult.slice(0, 4)}
                      handleFunction={handleAddUser}
                    />
                  </Stack>
                )}
              </Fragment>
            ) : (
              <></>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

export default UpdateGroupChatModel;