type ApiResponse = {
  year: number;
  month: number;
  sales: {
    day: number;
    total_sale: number;
  }[];
};

type GraphData = {
  date: string;
  sales: number;
};

export function convertToGraphData(
  response: ApiResponse
): GraphData[] {
  // その月の日数を計算
  const daysInMonth = new Date(
    response.year,
    response.month,
    0
  ).getDate();

  // day -> total_sale の Map を作る
  const saleMap = new Map<number, number>();
  response.sales.forEach((item) => {
    saleMap.set(item.day, item.total_sale);
  });

  // 1日〜月末まで必ず作る
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return {
      date: day.toString(),
      sales: saleMap.get(day) ?? 0,
    };
  });
}