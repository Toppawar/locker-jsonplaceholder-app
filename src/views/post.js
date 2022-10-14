import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useSWRImmutable from "swr/immutable";
import { Flex, Heading, Spinner, Box, Text, IconButton, ButtonGroup, Input, Textarea, useToast } from "@chakra-ui/react";
import { AiOutlineRollback, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

import { useStatics } from "../components/StaticsProvider";

import fetcher from "../utils/fetcher";

import { ROUTES } from "../constants/routes";

const ReadForm = ({ post = {}, users = {} }) => {
  return (
    <>
      <Heading>{post.title}</Heading>
      <Flex float="right">
        <Heading size="sm">
          Created by:
        </Heading>
        <Heading ml="2" size="sm">{users[post.userId]?.name}</Heading>
      </Flex>
      <Box mt="5">
        <Text noOfLines={[1, 2, 3]}>
          {post.body}
        </Text>
      </Box>
    </>
  );
};

const EditForm = ({ post, onChange }) => {
  return (
    <Box width="100%">
      <Heading size="sm">Title</Heading>
      <Input name="title" onChange={onChange} mt="3" fontWeight="700" fontSize="2xl" width="100%" defaultValue={post.title} />
      <Heading mt="3" size="sm">Body</Heading>
      <Textarea name="body" onChange={onChange} rows="5" mt="3" fontWeight="500" fontSize="lg" width="100%" defaultValue={post.body} />
    </Box>
  );
};

const Post = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { users } = useStatics();
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const { data: post, error } = useSWRImmutable({
    url: `/posts/${postId}`,
    method: "GET",
  });

  const [form, setForm] = useState({
    title: "",
    body: "",
  });

  const handleRouteHome = () => {
    navigate(ROUTES.HOME);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setForm({
        title: post.title,
        body: post.body
      });
    }
  };

  const handleUpdatePost = () => {
    setIsEditing(false);
    fetcher({
      url: `/posts/${postId}`,
      method: "PUT",
      body: JSON.stringify(form)
    }).then(() => {
      toast({
        title: 'Post Update',
        description: "The post has been updated",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }).catch(() => {
      toast({
        title: 'Post Update.',
        description: "The post could not be updated",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  const handlePostChange = (event) => {
    const { target: { value, name } } = event;
    setForm({
      ...form,
      [name]: value
    });
  };

  if (error) {
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Heading>Oops, an error occurs while loading post!</Heading>
    </Flex>;
  }

  return !post ? (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      height="20vh"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="gray.500"
        size="xl"
      />
    </Flex>
  ) : (
    <Flex height="100%" width="75vw" mb="5" minWidth="330px" direction="column" mt="7">

      <Flex mb="5" justifyContent="space-between">
        <IconButton onClick={handleRouteHome} icon={<AiOutlineRollback style={{ height: "24px", width: "24px" }} />} />
        {isEditing ? (
          <ButtonGroup justifyContent="center" size="sm">
            <IconButton onClick={handleUpdatePost} icon={<AiOutlineCheck style={{ height: "20px", width: "20px" }} />} />
            <IconButton onClick={toggleEdit} icon={<AiOutlineClose style={{ height: "20px", width: "20px" }} />} />
          </ButtonGroup>
        ) : (
          <Flex justifyContent="center">
            <IconButton onClick={toggleEdit} size="sm" icon={<BiEdit style={{ height: "20px", width: "20px" }} />} />
          </Flex>
        )}
      </Flex>

      {isEditing
        ? (<EditForm post={post} onChange={handlePostChange} />)
        : (
          <ReadForm users={users} post={post} />
        )}

    </Flex>
  );
};

export default Post;
