import { Text } from "@chakra-ui/react";
import { PieChart, Pie, Tooltip, Legend, Cell, LabelList } from "recharts";
import { IGraphicProps } from "./Interface";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#00FFFF"];

const GraphicComponent = (props: IGraphicProps) => {
  return (
    <>
      <Text fontWeight={"bold"} as="h5">
        {props.title}
      </Text>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={props.data}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {props?.data?.map((entry, index) => (
            <>
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
              <LabelList dataKey="name" position="top" />
            </>
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </>
  );
};

export default GraphicComponent;
