"use client"
import { SalesMonth } from "@/types/response";
import { BarChart } from "@mantine/charts"
import { convertToGraphData } from "./utils";

type BasePropsType = {
  salesMonth: SalesMonth;
}

const SalesGraph = ({salesMonth}: BasePropsType) => {
  return(
    <div className="bg-white py-5 px-5">
      <BarChart
        h={300}
        data={convertToGraphData(salesMonth)}
        dataKey="date"
        withTooltip={false}
        series={[
          { name: 'sales', color: 'rgba(27, 43, 168, 1)' }
        ]}
        barProps={{
        fillOpacity: 0.9
      }}
      />
    </div>
  )
}

export default SalesGraph