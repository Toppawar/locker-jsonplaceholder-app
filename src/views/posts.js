import { useMemo, useCallback, useState } from "react";
import { Box, Flex, Heading, Spinner, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

import Table from "../components/Table";

import { useStatics } from "../components/StaticsProvider";

import ellipsis from "../utils/ellipsis";
import debounce from "../utils/debounce";
import { sort } from "../utils/alphaSort";

import { ROUTES } from "../constants/routes";

const Posts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { data: posts, error } = useSWR({
    url: search ? `/posts?userId=${search}` : "/posts",
    method: "GET",
  });
  const { users } = useStatics();
  const [orderBy, setOrder] = useState({
    header: "",
    order: "asc"
  });

  const formatedData = useMemo(() => {
    if (posts) {
      const tableData = posts.map((post) => {
        return {
          name: `${users[post.userId]?.name}`,
          ...post,
          body: ellipsis(post.body, 20)
        };
      });
      if (orderBy.header) {
        const sortedTableData = sort(tableData, orderBy.order, orderBy.header);
        return sortedTableData;
      }
      return tableData;
    }
    return [];
  }, [posts, orderBy.header, orderBy.order]);

  const handleLoadPost = (row) => {
    const { id } = row;
    navigate(ROUTES.POST.replace(":postId", id));
  };

  const debounceSearching = useCallback(
    debounce(() => {
      setIsSearching(false);
    }, 1000),
    []
  );

  const handleChange = (e) => {
    const { value } = e.target;
    setIsSearching(true);
    setSearch(value);
    debounceSearching();
  };

  const handleOrderTable = (headerName) => {
    const isCurrentSameName = orderBy.header === headerName;
    if (isCurrentSameName) {
      setOrder({
        ...orderBy,
        order: orderBy.order === "asc" ? "desc" : "asc"
      });
    } else {
      setOrder({
        header: headerName,
        order: "asc"
      });
    }
  };

  if (error && !isSearching) {
    return (
      <Box width="75vw">
        <Flex
          width="100%"
          alignItems="center"
          justifyContent="center"
          height="20vh"
        >
          <Heading size="md">Error to load table, try it later.</Heading>
        </Flex>
      </Box>
    );
  }

  return (
    <Box width="75vw" mt="5" mb="5" minWidth="330px">
      <Input
        value={search}
        placeholder="Search by UserId"
        onChange={handleChange}
      />
      <Box width="100%" height="80vh" mt="5" overflow="auto">

        {!isSearching ? (
          <Table
            data={formatedData}
            onRowClick={handleLoadPost}
            onOrder={handleOrderTable}
            orderBy={orderBy}
            paginated
            header={[
              "name", "userId", "id", "title", "body"
            ]}
            fieldsToOrder={["name", "userId", "id", "title"]}
          />
        ) : (
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
        )}

      </Box>
    </Box>
  );
};

export default Posts;
