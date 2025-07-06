Next.js

CSR
	⁃	サーバーからクライアントへ、最小限のHTMLとJavascriptを送り、クライアント側でHTMLを生成。

SSR
	⁃	サーバー上でReactのコードが実行されてHTMLを生成し、クライアントに送る方法

SSG 
	⁃	ページの内容が変わらない固定ページ


レンダリング手法をページごとに設定だったのが、コンポーネント単位でレンダリングできるようになった。app router


'use client'と書くことで、クライアントコンポーネントになる。

サーバーコンポ年とからクライアントを呼び出すことはできるが、逆はできない、。



データ作成
GET
デー削除、作成
Route Handlerts
Server Actions




/app/api/posts/route.ts
というファイルを作り、やりたい処理を関数で書くとできる。


/app/actions.ts
'use' client



Server Actionsを使う。

Tailwindcss

高度な




https://github.com/yamaryo416/nextjs-practice/tree/main/public

Eslintのプラグインでtailwindの並び順を自動で変えてくれるやつをいれた。

3ヶ月前くらいなのに、もうURLがない。
https://www.prisma.io/docs/guides/nextjs
これでやると、微妙に違う。
コマンドの内容はほぼ同じだが、
npx prisma init --db --output ../app/generated/prisma
こうなってる。
けどinitだけでいい。

データベースの接続のところ。
npx presma initでprismaディレクトリを出した。
中にはschema.prismaが入ってる。そこで
環境変数でDATABASE_URLを





.envに書いてあるURLの、docker-composeで作ったデータベース

schema.prisma
nullを許容するには?を


ORMとは
オブジェクト
リレーショナル
マッピング
データベースとTypeScriptをつなげるツール。

Prisma schema（schema.prisma）でテーブル構造を定義し、
bash
コピーする編集する
npx prisma migrate dev
でDBにテーブルを自動生成。

Prisma Clientを使うと、SQLを書かずにTypeScriptからDB操作できる。

https://zenn.dev/hossy_worlds/articles/a8c10c129659e5
reactのコンポーネントを作成するrafcとかのショートカット

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const user = await prisma.user.create({
  data: {
    email: "test@example.com",
    password: "hashedpassword",
    name: "Test User",
  },
});

console.log(user);

ここでは prisma.user.create と書くだけで ✔️ INSERT文が生成・実行され、 ✔️ 戻り値は自動的に型付けされる。

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique @db.VarChar(255)
  password String
  name  String
  imageUrl String? @map("image_url")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@index([email])
  @@map("users")
}

schema.prismaに
@mapがあると、
TypeScriptで呼ぶときは左の変数でキャメルケース。
MySQLとかデータベースにはスネークケース

@@mapは、
テーブル名を複数形にしたい。
Prismaのモデル名はUserで定義してるけど、
DB上のテーブルにはusers


既存DBがテーブル名を複数形で持っている場合（users, postsなど）。
Prismaでは単数モデル名が推奨されるため、コードとDBで名前が一致しないときに使う。

emailにインデックスを貼るとは、検索の際に高速化できる



npx prisma migrate dev
でprisma ディレクトリのmigration下ができる。
そこにはさっき書いたmodelのsql文ができている。


npx prisma migrate dev —create-only
をしたあとに、さらに制約をつけられる。
テーブルを選択し、制約名とチェックする内容のifを書く

ALTER TABLE "users" ADD CONSTRAINT "users_name_length_check" CHECK (length("name") >= 1);


generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}


schemaのoutputというところがサイトにはあるが、それを削除しないとエラーが起きる。

Prisma.UserCreateInput[]
が生成されていない。


client componentではインタラクティブなことができる。
use Effectとかできる。

"use client"は
なるべくサーバーコンポーネントにすべきなので
use clientは末端ですべき。



なお、クライアントコンポーネントではprismaは使用できない。

https://nextjs.org/docs/app/api-reference/file-conventions/route#request-body


SuspenseというReactのコンポーネントの中に同期処理をいれると、先に描画してくれる。

zodというライブラリは
スキーマの設計図。

エラー処理の見通しをよくしてくれるらしい。
データを継承してエラーを


server actions
https://nextjs.org/docs/app/getting-started/updating-data


zod

"use server"を定義することで、
サーバーアクションは、prismaのようなサーバーでしか動かないものでも呼ぶことができる。

fetch apiと同様の処理を書けた。


servercomponentで呼び出すserveractionは戻り値を取れない


https://nextjs.org/docs/14/app/building-your-application/routing/error-handling
error handling



サーバーアクションは
クライアントでもサーバーアクションでも呼び出せる。
ユーザーインタラクションを重視
=> クライアント　（戻り値で柔軟）
パフォーマンス重視
=> サーバー　リダイレクトくらい


react hook form 不要なレンダリングを抑えることができる。
zodも使えて便利。
https://react-hook-form.com/get-started#SchemaValidation

https://github.com/next-safe-action/adapter-react-hook-form

zodResolverでバリデーションをできる。


nextsafeactionをいれると簡単にスキーマを定義でき、セキュアにできる。reacthook form とも連携でき、状態に応じた表示もできる。
https://next-safe-action.dev/docs/integrations/react-hook-form



shadcnはCLIツールを使って直接コードにコピーする形になる。カスタマイズ性が高い。
https://ui.shadcn.com/docs/components/card



https://v3.zod.dev/ERROR_HANDLING?id=customizing-errors-with-zoderrormap


https://www.npmjs.com/package/zod-prisma-types
schema.prismaで、zodを使うことでデータベースに登録するモデルの最大や最小とか、エラーメッセージもバリデーションできる。

https://ui.shadcn.com/docs/components/sonner
sonnerで通知みたいなものができる。

子要素でもchildrenで渡すときはサーバークライアントのままになる。
composition patern

https://www.npmjs.com/package/bcryptjs
bcryptでpasswordをハッシュ化できる。それをデータベースに登録。


https://www.npmjs.com/package/@aws-sdk/client-s3
s3インスタンスにアップロードできる。
今回はdockerで立ち上げてるところに接続。
https://www.npmjs.com/package/@aws-sdk/lib-storage
画像のアップロードの際に使う。


37.画像をS3に保存されるようにするのコミットで、動画通りにS3Clientオブジェクトを作ると、credentialがなく画像アップロードできないので、credentialのところを作った方が良い、

https://www.npmjs.com/package/jose
jose 
ログイン時の情報をcookieに保存する
	•	JWT = JSON Web Token
ユーザー認証やAPI認可などで使われる、
	•	ヘッダー
	•	ペイロード
	•	署名
で構成されるトークンフォーマット。
渡されたデータをjwtにエンコードして返す。

ログインが完了した後、authtokenにjwt tokenが格納されていることがわかる。


https://nextjs.org/docs/14/app/building-your-application/routing/middleware
middleware 今ログインしているかどうかを判断

export const config = {
  matcher: '/about/:path*',
}

about下のものはリダイレクト
    '/((?!login|signup|_next/static|_next/image|favicon.ico).*)',
こうするとloginとsignupと静的ファイル以外はリダイレクト

cookieからjwtを取得。
不正でないなら通常のルーティング
jwtをデコーディングして正しいかを比較している
