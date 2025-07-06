# Next.js 学習メモ

## レンダリング手法

### CSR (Client Side Rendering)
サーバーからクライアントへ最小限のHTMLとJavascriptを送り、クライアント側でHTMLを生成。

### SSR (Server Side Rendering)
サーバー上でReactコードを実行してHTMLを生成し、クライアントに送る。

### SSG (Static Site Generation)
内容が変わらない固定ページを事前にビルドする。

### App Router
レンダリング手法をページ単位からコンポーネント単位で設定可能になった。  
`'use client'` を書くとクライアントコンポーネントになる。  
サーバーコンポーネントからクライアントは呼べるが、その逆は不可。

---

## データ取得・作成

- GET系: fetch
- 作成/削除系: Route Handlers, Server Actions

### Route Handlers
例: `/app/api/posts/route.ts` に処理関数を定義する。

### Server Actions
`'use server'` を書いた関数でfetch相当の処理をサーバー側で実行可能。

---

## Tailwind CSS

EslintプラグインでTailwindクラスの並び順を自動整形できる。  
参照: https://github.com/yamaryo416/nextjs-practice/tree/main/public

---

## Prisma

公式では `npx prisma init --db --output ../app/generated/prisma` とあるが、 `init` だけで良い場合があった。

### 接続
`.env` に `DATABASE_URL` を記載し、docker-composeで立てたDBに接続する。

### ORM
Object Relational Mapping。DBとTypeScriptを繋げるツール。

### schema.prisma
テーブル構造を定義する。`?` を付けるとnull許容。

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique @db.VarChar(255)
  password  String
  name      String
  imageUrl  String?  @map("image_url")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@index([email])
  @@map("users")
}```

@map / @@map
@map: フィールド名とDBカラム名を変える。

@@map: モデル名とテーブル名を変える（例: Userモデル → usersテーブル）。

マイグレーション
bash
コピーする
編集する
npx prisma migrate dev
schema.prismaの内容でmigrationファイルが生成されDBに適用される。

--create-only を付けると適用せずファイル生成のみ。
例えば ALTER TABLE 文で制約追加なども可能。

Prisma Client
ts
コピーする
編集する
```import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const user = await prisma.user.create({
  data: {
    email: "test@example.com",
    password: "hashedpassword",
    name: "Test User",
  },
});
console.log(user);
prisma.user.create```
でINSERTが実行され、戻り値は型推論される。

Tips
schema.prisma の output 設定が原因で Prisma.UserCreateInput[] が生成されないことがあった。

クライアント/サーバーコンポーネント
クライアント: インタラクティブ処理 (例: useEffect) が可能。

サーバー: Prisma等サーバー専用ライブラリが利用できる。

"use client" は末端のみにつけるべき。
クライアントコンポーネントでは Prisma は使用不可。

Suspense
Reactのコンポーネント。同期処理を中に入れると先に描画してくれる。

Zod
スキーマ定義ライブラリ。エラー処理の見通しが良くなる。

zodResolver でReact Hook Formと連携可能

schema.prismaと合わせて zod-prisma-types を使うとDBスキーマとZodスキーマを統合できる

参照: https://v3.zod.dev/ERROR_HANDLING?id=customizing-errors-with-zoderrormap

Server Actions
"use server" を定義することで、Prismaのようなサーバー側でしか動かない処理を呼べる。
fetch API と同様の処理をサーバー上で型安全に書ける。

サーバーコンポーネントから呼ぶ場合は戻り値を取れない。
ユーザーインタラクション重視ならクライアント側、パフォーマンス重視ならサーバー側で使用する。

参照: https://nextjs.org/docs/app/getting-started/updating-data

React Hook Form
不要なレンダリングを抑制可能。
Zodと合わせてバリデーション実装が容易。

next-safe-action と連携可能

nextsafeaction でスキーマ定義とフォーム処理を統合できる

参照:
https://react-hook-form.com/get-started#SchemaValidation
https://github.com/next-safe-action/adapter-react-hook-form
https://next-safe-action.dev/docs/integrations/react-hook-form

Shadcn UI
CLIツールで直接コードを生成。カスタマイズ性が高い。

参照: https://ui.shadcn.com/docs/components/card

Sonner
通知UIライブラリ。

参照: https://ui.shadcn.com/docs/components/sonner

Composition Pattern
子要素をchildrenで渡す場合、サーバークライアント構成が維持される。

bcryptjs
パスワードをハッシュ化し、DBに保存するために使用。

参照: https://www.npmjs.com/package/bcryptjs

AWS SDK S3
@aws-sdk/client-s3: S3インスタンスに接続

@aws-sdk/lib-storage: 画像アップロード処理

docker-composeで立ち上げたS3Mockに接続した。
credential設定が必要だった。

jose (JWT)
ログイン情報をcookieに保存する際に使用。

JWT = JSON Web Token
構成: ヘッダー / ペイロード / 署名
エンコードして返却し、ログイン後はauthtokenにJWTが格納される。

参照: https://www.npmjs.com/package/jose

Middleware
ログイン判定などで使用。

ts
コピーする
編集する
export const config = {
  matcher: '/about/:path*',
}
例: /about 以下を全て対象にする。

ts
コピーする
編集する
'/((?!login|signup|_next/static|_next/image|favicon.ico).*)'
例: login, signup, 静的ファイル以外を認証対象にする。

cookieからJWTを取得し、デコードして認証処理を行う。

参照: https://nextjs.org/docs/14/app/building-your-application/routing/middleware

