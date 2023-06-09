import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Select,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import BaseLayoutComponent from "../../components/layouts/Base/BaseLayoutComponent";
import { IProducer } from "./interface/IProducer";
import { ProducersService } from "../../services/http/ProducersService";
import { formValidation } from "../../validations/FormValidation";

const defaultValues = {
  producer_name: "",
  cpf_cnpj: "",
  farm_name: "",
  state: "SC",
  city: "",
  total_area: 0,
  arable_area: 0,
  vegetation_area: 0,
  crops: "",
};

const toastMessage: any = {
  title: "",
  status: "success",
  duration: 2000,
  isClosable: true,
};

const ProducerPost: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  let { id } = useParams();

  const title = id ? "Editar produtor" : "Novo produtor";

  const { data }: any = useQuery(
    "prodsducer",
    async () => await ProducersService.getProducer(id),
    { enabled: id ? true : false }
  );

  useEffect(() => {
    if (typeof data?.data?.crops === "string") {
      data.data.crops = data?.data?.crops.split(",");
    }
  }, [data]);

  const saveMutation = useMutation(
    async (values: IProducer) => {
      if (id) {
        return await ProducersService.update(+id, values);
      }
      return await ProducersService.store(values);
    },
    {
      onError: (error: any) => {
        toastMessage.title = error.message;
        toastMessage.status = "error";

        toast(toastMessage);
      },
      onSuccess: () => {
        toastMessage.title = "Produtor salvo com sucesso";
        toastMessage.status = "success";

        toast(toastMessage);

        navigate("/producers");
      },
    }
  );

  return (
    <BaseLayoutComponent>
      <Grid w="100%" p={4}>
        <Heading as="h5" size="lg">
          {title}
        </Heading>
        <br />

        <Formik
          enableReinitialize={true}
          initialValues={id && data?.data ? data?.data : defaultValues}
          validationSchema={() => formValidation}
          onSubmit={async (values: any, { setSubmitting }) => {
            values.crops = values.crops.toString();
            await saveMutation.mutateAsync(values);

            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Grid templateColumns="repeat(3, 1fr)" gap="4">
                <GridItem>
                  <FormControl>
                    <FormLabel htmlFor="producer_name">
                      Nome do produtor
                    </FormLabel>
                    <Input
                      as={Field}
                      type="text"
                      name="producer_name"
                      placeholder="Nome do produtor"
                    />
                    <ErrorMessage
                      name="producer_name"
                      render={(msg: String) => (
                        <Text fontSize="xs" color="tomato">
                          {msg}
                        </Text>
                      )}
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel htmlFor="cpf_cnpj">CPF</FormLabel>
                    <Input
                      as={Field}
                      type="text"
                      name="cpf_cnpj"
                      placeholder="CPF/CNPJ"
                    />
                    <ErrorMessage
                      name="cpf_cnpj"
                      render={(msg: String) => (
                        <Text fontSize="xs" color="tomato">
                          {msg}
                        </Text>
                      )}
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel htmlFor="farmName">Nome da fazenda</FormLabel>
                    <Input
                      as={Field}
                      type="text"
                      name="farm_name"
                      placeholder="Nome da fazenda"
                    />
                    <ErrorMessage
                      name="farm_name"
                      render={(msg: String) => (
                        <Text fontSize="xs" color="tomato">
                          {msg}
                        </Text>
                      )}
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel htmlFor="state">Estado</FormLabel>
                    <Select
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      placeholder="Selecione..."
                    >
                      <option value="SC">Santa Catarina</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="PR">Paraná</option>
                      <option value="MT">Mato Grosso</option>
                    </Select>
                    <ErrorMessage
                      name="state"
                      render={(msg: String) => (
                        <Text fontSize="xs" color="tomato">
                          {msg}
                        </Text>
                      )}
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel htmlFor="state">Cidade</FormLabel>
                    <Input
                      as={Field}
                      type="text"
                      name="city"
                      placeholder="Cidade"
                    />
                    <ErrorMessage
                      name="city"
                      render={(msg: String) => (
                        <Text fontSize="xs" color="tomato">
                          {msg}
                        </Text>
                      )}
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel htmlFor="total_area">
                      Área total em hectares da fazenda
                    </FormLabel>
                    <Input
                      as={Field}
                      type="number"
                      name="total_area"
                      placeholder="Área total em hectares da fazenda"
                    />
                    <ErrorMessage
                      name="total_area"
                      render={(msg: String) => (
                        <Text fontSize="xs" color="tomato">
                          {msg}
                        </Text>
                      )}
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel htmlFor="arable_area">
                      Área agricultável em hectares
                    </FormLabel>
                    <Input
                      as={Field}
                      type="number"
                      name="arable_area"
                      placeholder="Área agricultável em hectares"
                    />
                    <ErrorMessage
                      name="arable_area"
                      render={(msg: String) => (
                        <Text fontSize="xs" color="tomato">
                          {msg}
                        </Text>
                      )}
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel htmlFor="vegetation_area">
                      Área de vegetação em hectares
                    </FormLabel>
                    <Input
                      as={Field}
                      type="number"
                      name="vegetation_area"
                      placeholder="Área de vegetação em hectares"
                    />
                    <ErrorMessage
                      name="vegetation_area"
                      render={(msg: String) => (
                        <Text fontSize="xs" color="tomato">
                          {msg}
                        </Text>
                      )}
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel htmlFor="crops">Culturas plantadas</FormLabel>
                    <Field
                      as={Select}
                      multiple={true}
                      value={values.crops || []}
                      name="crops"
                      height="200"
                    >
                      <option value="Soja">Soja</option>
                      <option value="Algodao">Algodão</option>
                      <option value="Milho">Milho</option>
                      <option value="Cafe">Café</option>
                      <option value="Cana">Cana de Açucar</option>
                    </Field>
                    <ErrorMessage
                      name="crops"
                      render={(msg: String) => (
                        <Text fontSize="xs" color="tomato">
                          {msg}
                        </Text>
                      )}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              <Divider />
              <br />
              <HStack>
                <Spacer />
                <Button
                  mt={40}
                  type="submit"
                  bg="brain.0"
                  color="white"
                  _hover={{ bg: "brain.200" }}
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Salvar dados
                </Button>
              </HStack>
            </Form>
          )}
        </Formik>
      </Grid>
    </BaseLayoutComponent>
  );
};

export default ProducerPost;
