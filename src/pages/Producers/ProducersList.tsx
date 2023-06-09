import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Grid,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import BaseLayoutComponent from "../../components/layouts/Base/BaseLayoutComponent";
import { ProducersService } from "../../services/http/ProducersService";

const message: any = {
  title: "",
  status: "success",
  duration: 2000,
  isClosable: true,
};

const ProducersList: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { data, isFetching, isLoading, refetch } = useQuery(
    "producers",
    async () => {
      setTimeout(async () => {}, 300);

      return await ProducersService.getAllProducers({});
    }
  );

  const removeMutation = useMutation(
    async (id: number) => await ProducersService.remove(id),
    {
      onError: (error: any) => {
        message.title = error.message;
        message.status = "error";

        toast(message);
      },
      onSuccess: () => {
        message.title = "Produtor removido com sucesso";

        toast(message);

        refetch();
      },
    }
  );

  return (
    <BaseLayoutComponent>
      <Grid w="100%" p={4}>
        <HStack direction={"column"}>
          <Heading as="h6">Lista de produtores</Heading>

          <Spacer />

          <Button
            leftIcon={<FaPlus />}
            colorScheme="teal"
            variant="outline"
            onClick={() => navigate("/producers/register")}
          >
            Adicionar
          </Button>
        </HStack>
        <br />
        <TableContainer>
          {isLoading || isFetching ? (
            <Center height="10vh">
              <Spinner size="lg" />
            </Center>
          ) : (
            <Table size="sm" variant="striped">
              <TableCaption>
                {data?.length
                  ? `Total de produtores: ${data.length}`
                  : "Nennhum produtor encontrado"}
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>CPF/CNPJ</Th>
                  <Th>Cidade</Th>
                  <Th>Estado</Th>
                  <Th isNumeric>Área total</Th>
                  <Th isNumeric>Área aricultável</Th>
                  <Th isNumeric>Área de vegetação</Th>
                  <Th>Culturas</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item: any, index: number) => (
                  <Tr key={index}>
                    <Td>{item.id}</Td>
                    <Td>{item.cpf_cnpj}</Td>
                    <Td>{item.producer_name}</Td>
                    <Td>{item.city}</Td>
                    <Td>{item.state}</Td>
                    <Td isNumeric>{item.total_area}</Td>
                    <Td isNumeric>{item.arable_area}</Td>
                    <Td isNumeric>{item.vegetation_area}</Td>
                    <Td>{item.crops}</Td>
                    <Td>
                      <IconButton
                        size={"md"}
                        icon={<EditIcon />}
                        aria-label={"Ver detalhes"}
                        onClick={() =>
                          navigate(`/producers/register/${item.id}`)
                        }
                      />
                      <IconButton
                        size={"md"}
                        ml="2"
                        icon={<DeleteIcon />}
                        aria-label={"Excluir"}
                        onClick={() => {
                          // eslint-disable-next-line no-restricted-globals
                          if (confirm("Confirma exclusão?") === true) {
                            return removeMutation.mutate(item.id);
                          }
                        }}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </TableContainer>
      </Grid>
    </BaseLayoutComponent>
  );
};

export default ProducersList;
