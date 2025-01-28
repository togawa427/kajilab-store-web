export { default } from 'next-auth/middleware'

export const config = {
  // api と signin は未認証でも使いたいので弾く
  // _next は web フォントの読み込み等でも middleware が反応していたので除外してみた
  matcher: ["/admin/:path*"],
}