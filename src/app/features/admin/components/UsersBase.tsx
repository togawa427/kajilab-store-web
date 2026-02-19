"use client"
import { AdminPageTitle } from "@/app/components/AdminPageTitle"
import Loading from "@/app/components/Loading"
import { useGetAPI } from "@/app/hooks/useGetAPI"
import { GetUsers } from "@/types/response"
import * as Admin from "@/app/features/admin/components/Index"

const UsersBase = () => {
  const {data: resUsers, isLoading, error} = useGetAPI<GetUsers>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users?limit=999`
  )

  if(isLoading) return(<Loading message='ユーザ情報取得中'/>)
  if(error || !resUsers) return(<div>読み込み失敗</div>)
  return (
    <div className='mb-10 md:pt-5 pt-0'>
      <AdminPageTitle
        title='梶研Pay利用者'
        subtitle='Kajilab Pay Users'
      />
      
      <Admin.UsersTable users={resUsers.users} />
    </div>
  )
}

export default UsersBase