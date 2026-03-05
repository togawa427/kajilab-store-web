"use client"
import { AdminPageTitle } from "@/app/components/AdminPageTitle"
import Loading from "@/app/components/Loading"
import { useGetAPI } from "@/app/hooks/useGetAPI"
import { GetUsers } from "@/types/response"
import * as Admin from "@/app/features/admin/components/Index"

const UsersBase = () => {
  const {data: resUsers, isLoading, error} = useGetAPI<GetUsers>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users?limit=50`
  )

  if(isLoading) return(<Loading message='ユーザ情報取得中'/>)
  if(error || !resUsers) return(<div>読み込み失敗</div>)
  return (
    <div className='mb-10 md:pt-5 pt-0'>
      <AdminPageTitle
        title='梶研Pay利用者'
        subtitle='Kajilab Pay Users'
      />

      <p className="text-end text-xs md:text-base">（最大50件）</p>
      <Admin.UsersTable users={resUsers.users} />
      <a 
        href="https://console.cloud.google.com/storage/browser/kajilab-store.appspot.com/backup;tab=objects?hl=tr&project=kajilab-store&prefix=&forceOnObjectsSortingFiltering=false"
        className="text-end text-xs md:text-base ml-auto underline"
        target="_blank"
        rel="noopener"
      >
        （詳細はCloudStorageにて）
      </a>
    </div>
  )
}

export default UsersBase