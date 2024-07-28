"use client"
import { getAssetHistory } from '@/api';
import { AssetHistory } from '@/types/response';
import { AreaChart } from '@mantine/charts'
import '@mantine/charts/styles.css';
import { Button, SegmentedControl } from '@mantine/core';
import React, { useEffect, useState } from 'react'

type AssetMainChartData = {
  date: string;
  realAsset: number;
  product: number;
  total: number;
}

type AssetSubChartData = {
  date: string;
  money: number;
  debt: number;
  realAsset: number;
}

type AssetBaseProps = {
  assetsHistory: AssetHistory[];
}

function AssetBase({assetsHistory}: AssetBaseProps) {
  const [assetsMainChartData, setAssetsMainChartData] = useState<Array<AssetMainChartData>>([]);
  const [assetsSubChartData, setAssetsSubChartData] = useState<Array<AssetSubChartData>>([]);
  const [selectedDay, setSelectedDay] = useState('30');
  const [responseTime, setResponseTime] = useState("");
  
  useEffect(() => {
    let tmpAssetsHistory = assetsHistory.slice(assetsHistory.length-parseInt(selectedDay))
      let tmpAssetsMainChartData:AssetMainChartData[] = []
      let tmpAssetsChartData:AssetSubChartData[] = []
      tmpAssetsHistory.map((assetData) => {
        tmpAssetsMainChartData.push({
          date:String(new Date(assetData.date).getMonth()+1) + "/" + String(new Date(assetData.date).getDate() + "(" + String(new Date(assetData.date).toLocaleDateString('ja', {weekday: 'long'})) + ")"),
          realAsset:(assetData.money-assetData.debt),
          product:(assetData.product),
          total:(assetData.money-assetData.debt+assetData.product)
        })
        tmpAssetsChartData.push({
          date:String(new Date(assetData.date).getMonth()+1) + "/" + String(new Date(assetData.date).getDate() + "(" + String(new Date(assetData.date).toLocaleDateString('ja', {weekday: 'long'})) + ")"),
          money:assetData.money,
          debt:assetData.debt,
          realAsset:(assetData.money-assetData.debt),
        })
        setResponseTime(String(new Date(assetData.date).toLocaleString()))
      })
      setAssetsMainChartData(tmpAssetsMainChartData)
      setAssetsSubChartData(tmpAssetsChartData)
  }, [assetsHistory, selectedDay]);

  const handleSelectDay = async (day: string) => {
    setSelectedDay(day)
  }

  return (
    <div>
      <div className="text-end">
        <div>
          更新日時：{responseTime}
        </div>
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
        data={assetsMainChartData}
        dataKey="date"
        curveType="linear"
        // type='stacked'
        withLegend
        series={[
          { name: 'realAsset', label: '実質残金（残金-負債）', color: 'green.6' },
          // { name: 'product', label: '商品在庫総額', color: 'grape.6' },
          { name: 'total', label: '商店総資産（実質残金+商品在庫総額）', color: 'grape.6'}
        ]}
        className="bg-slate-50 p-5 px-5 border-b-2"
    />
      <AreaChart
        h={600}
        data={assetsSubChartData}
        dataKey="date"
        curveType="linear"
        withLegend
        series={[
          { name: 'money', label: '商店残金', color: 'blue.6' },
          { name: 'debt', label: '商店負債', color: 'red.6' },
          { name: 'realAsset', label: '実質残金（残金-負債）', color: 'green.6' },
        ]}
        className="bg-slate-50 p-5 px-5 mb-10"
    />
    </div>
  )
}

export default AssetBase