# セットアップガイド

このページでは、Trendsプロジェクトの開発環境構築手順を説明します。

## 📋 前提条件

以下のソフトウェアがインストールされていることを確認してください：

- **Node.js**: v18 以上
- **npm**: v9 以上  
- **Git**: 最新版

## 🚀 セットアップ手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/rfdnxbro/trends.git
cd trends
```

### 2. 依存関係のインストール

```bash
npm install
```

このコマンドにより、すべてのワークスペース（frontend、backend、shared）の依存関係がインストールされます。

### 3. 開発サーバーの起動

#### 全サービス同時起動
```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

#### 個別サービス起動
```bash
# フロントエンドのみ
npm run dev:frontend

# バックエンドのみ  
npm run dev:backend
```

## 🔧 開発環境の確認

### ヘルスチェック

バックエンドが正常に動作しているか確認：

```bash
curl http://localhost:3001/api/health
```

期待される応答：
```json
{"status": "ok"}
```

### フロントエンド確認

ブラウザで http://localhost:3000 にアクセスして、アプリケーションが表示されることを確認してください。

## 🛠️ 開発ツール

### エディタ設定

推奨エディタ：**Visual Studio Code**

推奨拡張機能：
- TypeScript and JavaScript Language Features
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense

### 型チェック・リント

```bash
# 型チェック
npm run typecheck

# リント
npm run lint

# リント修正
npm run lint:fix
```

## 🗂️ プロジェクト構造

```
trends/
├── apps/
│   ├── frontend/          # Next.js アプリケーション
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   └── backend/           # Hono API サーバー
│       ├── src/            # 開発用APIサーバー
│       ├── api/            # Vercel Functions (/api/*)
│       └── package.json
├── packages/
│   └── shared/            # 共有型・ユーティリティ
│       ├── src/
│       └── package.json
├── package.json           # ルートpackage.json
├── vercel.json            # Vercelデプロイ設定
└── tsconfig.json         # TypeScript設定
```

### デプロイ構成
- **開発環境**: フロントエンド(3000)→バックエンド(3001)のプロキシ構成
- **本番環境**: Vercel統合デプロイ（フロントエンド・バックエンド同一プロジェクト）
  - フロントエンド: `apps/frontend/` → Next.js アプリ
  - バックエンド: `apps/backend/api/` → Vercel Functions (`/api/*`)
- **詳細**: [VERCEL_SETUP.md](../VERCEL_SETUP.md) を参照

## 🚨 トラブルシューティング

### よくある問題

#### ポートが使用中のエラー
```bash
# プロセスを確認
lsof -ti:3000
lsof -ti:3001

# プロセスを終了
kill -9 <PID>
```

#### 依存関係のエラー
```bash
# node_modules を削除して再インストール
rm -rf node_modules
rm package-lock.json
npm install
```

#### 型エラー
```bash
# 型定義を再構築
npm run build:shared
npm run typecheck
```

## 📝 次のステップ

セットアップが完了したら、以下のドキュメントを参照してください：

- **[開発ガイド](Development-Guide)** - 開発の進め方
- **[API仕様](API-Specification)** - APIの使用方法
- **[開発ロードマップ](Development-Roadmap)** - 実装予定機能

---

💡 **ヘルプが必要な場合**: [Issues](https://github.com/rfdnxbro/trends/issues)でお問い合わせください。