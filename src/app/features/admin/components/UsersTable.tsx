import { GetUser } from "@/types/response"

type UsersTableProps = {
  users: GetUser[]
}

const UsersTable = ({users}: UsersTableProps) => {
  return (
    <table className="md:text-xl text-xs w-full rounded-md bg-white shadow-md">
      <tr className="border border-spacing-1">
        <th>名前</th>
        <th>バーコード</th>
        <th>残高</th>
        <th>総使用額</th>
        <th>最終使用日時</th>
        <th>登録日</th>
      </tr>
      {users.map((user) => (
        <tr className="text-center border">
          <td>{user.name}</td>
          <td>{user.barcode}</td>
          <td className="text-end">{user.debt}円</td>
          <td className="text-end">{user.total_pay}円</td>
          <td>{new Date(user.updated_at).toLocaleString("ja-JP")}</td>
          <td>{new Date(user.created_at).toLocaleDateString("ja-JP", {timeZone: "Asia/Tokyo",year: "numeric",month: "numeric",day: "numeric"})}</td>
        </tr>
      ))}
    </table>
  )
}

export default UsersTable