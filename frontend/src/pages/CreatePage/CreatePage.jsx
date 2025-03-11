import { useProductStore } from "../../store/product";
import { useColorModeValue } from "../../components/ui/color-mode";
import { toaster } from "../../components/ui/toaster";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW={"2xl"}>
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"3xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          mb="8"
        >
          Create New Product
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p="6"
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spaceY="5">
            <Input
              borderColor={"gray.500"}
              borderWidth={1}
              outline={"none"}
              placeholder="Product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              borderColor={"gray.500"}
              borderWidth={1}
              outline={"none"}
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              borderColor={"gray.500"}
              borderWidth={1}
              outline={"none"}
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button
              colorScheme={"blue"}
              onClick={handleAddProduct}
              w="full"
              p="6"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
