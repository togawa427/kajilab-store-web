"use client"
import { getAssetHistory } from '@/api';
import { AreaChart } from '@mantine/charts'
import '@mantine/charts/styles.css';
import { Button, SegmentedControl } from '@mantine/core';
import React, { useEffect, useState } from 'react'

type AssetChartData = {
  date: string;
  money: number;
  debt: number;
  realAsset: number;
  product: number;
}

// const assetsHistory = [
//   {
//     "date": "2024-06-26T14:52:29.355200223+09:00",
//     "money": 45025,
//     "debt": 2750,
//     "product": -1
//   },
//   {
//     "date": "2024-06-27T14:52:29.355200343+09:00",
//     "money": 47255,
//     "debt": 3680,
//     "product": -1
//   },
//   {
//     "date": "2024-06-28T14:52:29.355200465+09:00",
//     "money": 47705,
//     "debt": 3680,
//     "product": -1
//   },
//   {
//     "date": "2024-06-29T14:52:29.355200585+09:00",
//     "money": 47705,
//     "debt": 3680,
//     "product": -1
//   },
//   {
//     "date": "2024-06-30T14:52:29.355200708+09:00",
//     "money": 47705,
//     "debt": 3680,
//     "product": -1
//   },
//   {
//     "date": "2024-07-01T14:52:29.355200834+09:00",
//     "money": 47907,
//     "debt": 3330,
//     "product": -1
//   },
//   {
//     "date": "2024-07-02T14:52:29.355200955+09:00",
//     "money": 50947,
//     "debt": 3120,
//     "product": -1
//   },
//   {
//     "date": "2024-07-03T14:52:29.355201075+09:00",
//     "money": 51647,
//     "debt": 2910,
//     "product": -1
//   },
//   {
//     "date": "2024-07-04T14:52:29.355208451+09:00",
//     "money": 53977,
//     "debt": 2840,
//     "product": -1
//   },
//   {
//     "date": "2024-07-05T14:52:29.355208594+09:00",
//     "money": 46300,
//     "debt": 2740,
//     "product": -1
//   },
//   {
//     "date": "2024-07-06T14:52:29.355208717+09:00",
//     "money": 47300,
//     "debt": 3510,
//     "product": -1
//   },
//   {
//     "date": "2024-07-07T14:52:29.355208839+09:00",
//     "money": 47300,
//     "debt": 3510,
//     "product": -1
//   },
//   {
//     "date": "2024-07-08T14:52:29.355208971+09:00",
//     "money": 48850,
//     "debt": 4080,
//     "product": -1
//   },
//   {
//     "date": "2024-07-09T14:52:29.355209098+09:00",
//     "money": 50100,
//     "debt": 3760,
//     "product": -1
//   },
//   {
//     "date": "2024-07-10T14:52:29.355209221+09:00",
//     "money": 52200,
//     "debt": 4390,
//     "product": -1
//   },
//   {
//     "date": "2024-07-11T14:52:29.355209343+09:00",
//     "money": 47930,
//     "debt": 6580,
//     "product": -1
//   },
//   {
//     "date": "2024-07-12T14:52:29.355209463+09:00",
//     "money": 46693,
//     "debt": 5870,
//     "product": -1
//   },
//   {
//     "date": "2024-07-13T14:52:29.355209586+09:00",
//     "money": 47553,
//     "debt": 5750,
//     "product": -1
//   },
//   {
//     "date": "2024-07-14T14:52:29.355209706+09:00",
//     "money": 44853,
//     "debt": 5650,
//     "product": -1
//   },
//   {
//     "date": "2024-07-15T14:52:29.355209831+09:00",
//     "money": 44973,
//     "debt": 5430,
//     "product": -1
//   },
//   {
//     "date": "2024-07-16T14:52:29.355209952+09:00",
//     "money": 41402,
//     "debt": 5360,
//     "product": -1
//   },
//   {
//     "date": "2024-07-17T14:52:29.355210074+09:00",
//     "money": 43002,
//     "debt": 5840,
//     "product": -1
//   },
//   {
//     "date": "2024-07-18T14:52:29.355210196+09:00",
//     "money": 44362,
//     "debt": 4800,
//     "product": -1
//   },
//   {
//     "date": "2024-07-19T14:52:29.355210317+09:00",
//     "money": 42510,
//     "debt": 4210,
//     "product": -1
//   },
//   {
//     "date": "2024-07-20T14:52:29.355210439+09:00",
//     "money": 42630,
//     "debt": 4210,
//     "product": -1
//   },
//   {
//     "date": "2024-07-21T14:52:29.355210561+09:00",
//     "money": 43630,
//     "debt": 4580,
//     "product": -1
//   },
//   {
//     "date": "2024-07-22T14:52:29.355210682+09:00",
//     "money": 45410,
//     "debt": 5020,
//     "product": -1
//   },
//   {
//     "date": "2024-07-23T14:52:29.355210803+09:00",
//     "money": 48370,
//     "debt": 5840,
//     "product": -1
//   },
//   {
//     "date": "2024-07-24T14:52:29.355210925+09:00",
//     "money": 50490,
//     "debt": 5990,
//     "product": -1
//   },
//   {
//     "date": "2024-07-25T14:52:29.355211046+09:00",
//     "money": 53750,
//     "debt": 6930,
//     "product": -1
//   }
// ]

function AssetBase() {
  const [assetsChartData, setAssetsChartData] = useState<Array<AssetChartData>>([]);
  const [selectedDay, setSelectedDay] = useState('30');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetsHistory = await getAssetHistory(parseInt(selectedDay));
        let tmpAssetsChartData:AssetChartData[] = []
        assetsHistory.map((assetData) => (
          tmpAssetsChartData.push({
            date:String(new Date(assetData.date).getMonth()+1) + "/" + String(new Date(assetData.date).getDate() + "(" + String(new Date(assetData.date).toLocaleDateString('ja', {weekday: 'long'})) + ")"),
            money:assetData.money,
            debt:assetData.debt,
            realAsset:(assetData.money-assetData.debt),
            product:(assetData.product)
          })
        ))
        setAssetsChartData(tmpAssetsChartData)
      } catch (error) {
        console.error('Error fetching assetshistory:', error);
      }
    };
    fetchData();
  }, []);

  const handleSelectDay = async (day: string) => {
    setSelectedDay(day)
    const assetsHistory = await getAssetHistory(parseInt(day));
    let tmpAssetsChartData:AssetChartData[] = []
    assetsHistory.map((assetData) => (
      tmpAssetsChartData.push({
        date:String(new Date(assetData.date).getMonth()+1) + "/" + String(new Date(assetData.date).getDate() + "(" + String(new Date(assetData.date).toLocaleDateString('ja', {weekday: 'long'})) + ")"),
        money:assetData.money,
        debt:assetData.debt,
        realAsset:(assetData.money-assetData.debt),
        product:(assetData.product)
      })
    ))
    setAssetsChartData(tmpAssetsChartData)
  }

  return (
    <div>
      <div className="text-end">
        <SegmentedControl
          value={String(selectedDay)}
          onChange={handleSelectDay}
          data={[
            { label: '1ヶ月', value: '30' },
            { label: '2ヶ月', value: '60' },
            { label: '3ヶ月', value: '90' },
            { label: '6ヶ月', value: '180' },
          ]}
        />
      </div>
      <AreaChart
        h={600}
        data={assetsChartData}
        dataKey="date"
        curveType="linear"
        withLegend
        series={[
          { name: 'money', label: '商店残金', color: 'blue.6' },
          { name: 'debt', label: '商店負債', color: 'red.6' },
          { name: 'realAsset', label: '実質残金（残金-負債）', color: 'green.6' },
        ]}
        className="bg-slate-50 p-5 px-5"
    />
    </div>
  )
}

export default AssetBase