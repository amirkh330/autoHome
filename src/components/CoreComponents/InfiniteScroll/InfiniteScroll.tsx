import { Box, Flex, Grid, Spinner } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../Loading/Loading";

interface InfinityScrollProps<T> {
  wrapper: React.ReactElement;
  items: T[]; // لیستی از داده‌ها
  total: number;
  loading?: boolean;
  loadMore: () => void; // تابع برای بارگذاری بیشتر داده‌ها
  renderItem: (item: T, index: number) => React.ReactNode; // تابع برای رندر کردن هر آیتم
}

const InfinityScroll = <T,>({
  items,
  loadMore,
  total,
  renderItem,
  wrapper,
  loading,
}: InfinityScrollProps<T>) => {
  return (
    <InfiniteScroll
      height={"100dvh"}
      style={{
        width: "100%",
      }}
      dataLength={items.length}
      next={loadMore}
      // hasMore={items.length < total}
      hasMore={loading || items.length < total}
      loader={
        <Box
          pb="4"
          paddingTop="30%"
          top="0"
          w="full"
          position={"absolute"}
          right={0}
          bg="blackAlpha.600"
          backdropFilter="blur(10px)"
          h={"full"}
        >
          <Loading />
        </Box>
      }
      // endMessage={
      //   <p style={{ textAlign: "center" }}>
      //     <b>پایان لیست</b>
      //   </p>
      // }
    >
      {/* <Grid templateColumns="repeat(2, 1fr)"> */}
      {React.cloneElement(
        wrapper,
        {},
        items.map((item, index) => (
          <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
        ))
      )}
      {/* {items.map((item, index) => (
          <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
        ))} */}
      {/* </Grid> */}
    </InfiniteScroll>
  );
};

export default InfinityScroll;
