'use client'
import { Button, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react'

type EditAssetBaseProps = {
  currentMoney: number;
  currentDebt: number;
}

function EditAssetBase({currentMoney, currentDebt}: EditAssetBaseProps) {
  const [yen10000, setYen10000] = useState(0)
  const [yen1000, setYen1000] = useState(0)
  const [yen500, setYen500] = useState(0)
  const [yen100, setYen100] = useState(0)
  const [yen50, setYen50] = useState(0)
  const [yen10, setYen10] = useState(0)
  const [yen5, setYen5] = useState(0)
  const [yen1, setYen1] = useState(0)
  const [yenOther, setYenOther] = useState(0)

  const getTotalMoney = () => {
    return 10000*yen10000 + 1000*yen1000 + 500*yen500 + 100*yen100 + 50*yen50 + 10*yen10 + 5*yen5 + yen1 + yenOther
  }

  const form = useForm({
    initialValues: {
      money: currentMoney
    },

    validate: {
      money:(value) => (value !== 0 ? null : '入力してください')
    }
  })

  return (
    <div>
      <div className="max-w-3xl mx-auto px-3 py-2 bg-white rounded-sm shadow">
        <div className='text-xl font-bold'>現在の資産</div>
        <div>現金：{currentMoney}円</div>
        <div>梶研Pay残高：{currentDebt}円</div>
      </div>

      <div className="max-w-3xl mx-auto mt-3 px-3 py-2 bg-white rounded-sm shadow">
        <div className='text-xl font-bold'>変更後の資産</div>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <div className='flex w-full items-center justify-center'>
            <p className='text-xl'>現金：</p>
            <NumberInput
              size='md'
              key={form.key('money')}
              {...form.getInputProps('money')}
            />
          </div>
          <div className='text-end mt-1'><Button type="submit">送信</Button></div>
        </form>

        <div className='border-t my-3 border-gray-200'></div>

        <div className='text-xl font-bold'>簡易電卓</div>
        <div className='flex justify-center'>
          <div>
            <p>1万円札</p>
            <NumberInput 
              size='xs'
              value={yen10000}
              onChange={(e) => setYen10000(Number(e))}
            />
          </div>
          <div>
            <p>50円玉</p>
            <NumberInput 
              size='xs'
              value={yen50}
              onChange={(e) => setYen50(Number(e))}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <div>
            <p>千円札</p>
            <NumberInput 
              size='xs'
              value={yen1000}
              onChange={(e) => setYen1000(Number(e))}
            />
          </div>
          <div>
            <p>10円玉</p>
            <NumberInput 
              size='xs'
              value={yen10}
              onChange={(e) => setYen10(Number(e))}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <div>
            <p>500円玉</p>
            <NumberInput 
              size='xs'
              value={yen500}
              onChange={(e) => setYen500(Number(e))}
            />
          </div>
          <div>
            <p>5円玉</p>
            <NumberInput 
              size='xs'
              value={yen5}
              onChange={(e) => setYen5(Number(e))}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <div>
            <p>100円玉</p>
            <NumberInput 
              size='xs'
              value={yen100}
              onChange={(e) => setYen100(Number(e))}
            />
          </div>
          <div>
            <p>1円玉</p>
            <NumberInput 
              size='xs'
              value={yen1}
              onChange={(e) => setYen1(Number(e))}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <div>
            <p>その他（円）</p>
            <NumberInput
              size='xs'
              value={yenOther}
              onChange={(e) => setYenOther(Number(e))}
            />
          </div>
        </div>

        <div className='text-center'>
          <p className='mt-2'>合計額</p>
          <p className='text-2xl font-bold'>{getTotalMoney()}円</p>
        </div>
      </div>
      
    </div>
  )
}

export default EditAssetBase