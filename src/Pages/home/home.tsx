import { Login } from "@/components/Common/Login/Login";
import Carousel from "@/components/CoreComponents/Carousel/Carousel";
import Logo from "@/images/logo.png";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Bell, File, Toolbox } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import intro from "public/images/intro.png";
import c1 from "public/images/co-1.png";
import c2 from "public/images/co-2.png";
import c3 from "public/images/co-3.png";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box width="100%" minH="80dvh" bg="amir.mainBg" color="amir.common">
      {/* HERO */}
      <MotionFlex
        direction="column"
        align="center"
        textAlign="center"
        px="6"
        mt="2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Image src={intro} h="300px" />

        <Text fontSize="26px" fontWeight="700" mt="2" color="amir.common">
          مدیریت سرویس‌ها با یک لمس
        </Text>

        <Text fontSize="15px" color="amir.secondary" mt="2" maxW="320px">
          با ما مدیریت سرویس‌های خودروی شما را به صورت آنلاین انجام دهید.
        </Text>
      </MotionFlex>

      {/* FEATURE CARDS STACK */}
      {/* <VStack spacing="4" mt="10" px="5">
        <FeatureCard
          icon={<Bell size={28} />}
          title="یادآوری هوشمند"
          desc="یادآوری هوشمند برای سرویس‌های شما."
        />
        <FeatureCard
          icon={<File size={28} />}
          title="کارتکس دیجیتال"
          desc="همه سوابق خودرو همیشه همراه شماست."
        />
        <FeatureCard
          icon={<Toolbox size={28} />}
          title="مخصوص راننده و تعمیرکار"
          desc="هر دو سمت یک پنل واضح و ساده دارند."
        />
      </VStack> */}
      {/* <Carousel images={[c1, c2, c3]} /> */}
      <Box mx="4" mt="6">
        <Carousel
          items={[
            <FeatureCard
              icon={<Bell size={28} />}
              title="یادآوری هوشمند"
              desc="یادآوری هوشمند برای سرویس‌های شما."
            />,
            <FeatureCard
              icon={<File size={28} />}
              title="کارتکس دیجیتال"
              desc="همه سوابق خودرو همیشه همراه شماست."
            />,
            <FeatureCard
              icon={<Toolbox size={28} />}
              title="مخصوص راننده و تعمیرکار"
              desc="هر دو سمت یک پنل واضح و ساده دارند."
            />,
          ]}
        />
      </Box>
      {/* <Box mx="4" mt="6">
        <Carousel images={[intro]} />
      </Box> */}

      <MotionFlex
        mt="auto"
        py={6}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          // as={Link}
          // to="/login"
          mx="4"
          px="3"
          py="6"
          w="90%"
          color={"white"}
          border={"1px solid"}
          bgColor={"amir.accent"}
          onClick={() => onOpen()}
          borderColor={"amir.primary"}
        >
          ثبت نام / ورود
        </Button>
      </MotionFlex>
      {isOpen && <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} />}
    </Box>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <MotionBox
      bg="amir.secondaryBg"
      borderRadius="22px"
      w="100%"
      py="5"
      px="3"
      border="1px solid"
      borderColor="amir.secondaryVariant"
      whileTap={{ scale: 0.98 }}
    >
      <HStack justify="flex-start" align="center">
        <Box color="amir.common">{icon}</Box>
        <VStack alignItems={"start"} w="80%" flexWrap={"nowrap"}>
          <Text fontWeight="700" fontSize="17px" color="amir.common">
            {title}
          </Text>
          <Text fontSize="14px" mt="1" color="amir.secondary">
            {desc}
          </Text>
        </VStack>
      </HStack>
    </MotionBox>
  );
}
