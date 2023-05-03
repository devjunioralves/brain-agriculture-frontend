import {
  Divider,
  Grid,
  GridItem,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQueries } from "react-query";
import GraphicComponent from "../../components/graphic/GraphicComponent";
import BaseLayoutComponent from "../../components/layouts/Base/BaseLayoutComponent";
import OverviewDashboardHttpService from "../../services/http/OverviewDashboardService";

const Dashboard: React.FC = () => {
  const results: any = useQueries([
    {
      queryKey: ["totalFarms", 0],
      queryFn: async () => await OverviewDashboardHttpService.getTotalFarms(),
    },
    {
      queryKey: ["totalHectares", 1],
      queryFn: async () =>
        await OverviewDashboardHttpService.getTotalHectares(),
    },
  ]);

  const graphs: any = useQueries([
    {
      queryKey: ["farmsByState", 0],
      queryFn: async () =>
        await OverviewDashboardHttpService.getTotalFarmsByState(),
    },
    {
      queryKey: ["typeArea", 1],
      queryFn: async () =>
        await OverviewDashboardHttpService.getTotalTypeArea(),
    },
    {
      queryKey: ["totalArableArea", 2],
      queryFn: async () =>
        await OverviewDashboardHttpService.getTotalArableArea(),
    },
  ]);

  const dashboardItems = [
    { title: "Total de fazendas em quantidade", indexArrayResult: 0 },
    { title: "Área de fazendas em hectáres", indexArrayResult: 1 },
  ];

  return (
    <BaseLayoutComponent>
      <Grid templateColumns="repeat(2, 12fr)" gap="4" m="4" color={"#24434b"}>
        {dashboardItems.map((item: any) => (
          <>
            <Stack direction={"column"}>
              <GridItem colSpan={4}>
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  boxShadow="lg"
                  borderWidth={1}
                  borderRadius="sm"
                  background={"#fc325b"}
                  color="white"
                >
                  <Stack direction="row" alignItems="center">
                    <Text fontWeight="semibold">{item.title}</Text>
                  </Stack>

                  <Text fontSize={"45px"}>
                    {results[item.indexArrayResult].isFetching ||
                    results[item.indexArrayResult].isFetching ? (
                      <Spinner size="lg" />
                    ) : (
                      results[item.indexArrayResult]?.data?.data.total
                    )}{" "}
                    {item.indexArrayResult !== 0 && "ha"}
                  </Text>
                </Stack>
              </GridItem>
            </Stack>
          </>
        ))}
      </Grid>
      <Divider />
      <Grid templateColumns="repeat(3, 8fr)" gap="4" m="4">
        <Grid flexDirection={"column"}>
          <GridItem w="100%">
            <GraphicComponent
              title="Fazendas por estado"
              data={graphs[0]?.data?.data}
            />
          </GridItem>
        </Grid>

        <Grid>
          <GridItem w="100%">
            <GraphicComponent
              title="Fazendas por cultura"
              data={graphs[1]?.data?.data}
            />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem w="100%">
            <GraphicComponent
              title="Área agricultável e vegetação"
              data={graphs[2]?.data?.data}
            />
          </GridItem>
        </Grid>
      </Grid>
    </BaseLayoutComponent>
  );
};

export default Dashboard;
