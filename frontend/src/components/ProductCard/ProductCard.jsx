// import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  DialogCloseTrigger,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import React, { useState } from "react";
import { useColorMode } from "../ui/color-mode";
import { useProductStore } from "../../store/product";
import { toaster } from "../ui/toaster";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorMode("gray.600", "gray.200");
  const bg = useColorMode("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Dialog.Root>
      <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all .3s"}
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
      >
        <Image
          src={product.image}
          alt={product.name}
          h={48}
          w={"full"}
          objectFit={"cover"}
        />
        <Box p={4}>
          <Heading as={"h3"} size={"md"} mb={2}>
            {product.name}
          </Heading>

          <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
            ${product.price}
          </Text>

          <HStack spacing={2}>
            <Dialog.Trigger asChild>
              <IconButton colorPalette={"blue"}>
                <Icon fontSize={18}>
                  <FaEdit />
                </Icon>
              </IconButton>
            </Dialog.Trigger>

            <IconButton
              colorPalette={"red"}
              onClick={() => handleDeleteProduct(product._id)}
            >
              <Icon fontSize={18}>
                <AiFillDelete />
              </Icon>
            </IconButton>
          </HStack>
        </Box>

        <Dialog.Trigger />
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Update Product</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Price"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  colorScheme={"blue"}
                  colorPalette={"blue"}
                  variant={"subtle"}
                  mr={3}
                  onClick={() =>
                    handleUpdateProduct(product._id, updatedProduct)
                  }
                >
                  Update
                </Button>
              </Dialog.ActionTrigger>

              <Dialog.ActionTrigger asChild>
                <Button variant={"ghost"}>Cancel</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Box>
    </Dialog.Root>
  );
};

export default ProductCard;
