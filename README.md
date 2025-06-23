# Trends - 企業技術影響力分析プラットフォーム

このプロジェクトは、Webエンジニアの採用に携わるエンジニアリングオフィス向けのWebサイトです。はてなブックマークの人気ITエントリーや、Qiita、Zennのトレンドを元に、どの企業が技術コミュニティにおいて影響力があるかを定点観測することを目的としています。

## 🎯 目的

- **データ収集**: バックエンドでデイリーのトレンド情報を自動取得
- **データ蓄積**: 取得したトレンドデータをデータベースに保存
- **分析・可視化**: フロントエンドで企業の影響力をサマライズして表示
- **定点観測**: 継続的なデータ収集による企業影響力の変化追跡

## 👥 ターゲットユーザー

- エンジニアリングオフィスの採用担当者
- 技術系人事・リクルーター
- エンジニア採用戦略を検討する企業

## 🏗️ プロジェクト構成

これは npm workspaces を使用したTypeScript monorepoです：

```
trends/
├── apps/
│   ├── frontend/          # Next.js アプリケーション (ポート 3000)
│   └── backend/           # Hono API サーバー (ポート 3001)
└── packages/
    └── shared/            # 共有TypeScript型とユーティリティ
```

フロントエンドは Next.js rewrites 設定を通じてバックエンドへのAPIリクエストをプロキシします。

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 14 with App Router, React 18, TypeScript, shadcn/ui, Tailwind CSS
- **バックエンド**: Hono with Node.js adapter, TypeScript
- **共有**: 共通TypeScript型とインターフェース
- **ビルドツール**: TypeScript, ESLint, tsx for development

## 🚀 セットアップ

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **開発サーバーの起動**
   ```bash
   npm run dev              # フロントエンドとバックエンドの両方を起動
   npm run dev:frontend     # Next.js のみを起動 (ポート 3000)
   npm run dev:backend      # Hono サーバーのみを起動 (ポート 3001)
   ```

## 📋 開発コマンド

### ビルドコマンド
```bash
npm run build            # 全ワークスペースのビルド
npm run build:frontend   # Next.js アプリのビルド
npm run build:backend    # Hono サーバーのビルド
```

### コード品質
```bash
npm run lint             # 全ワークスペースのリント
npm run typecheck        # 全ワークスペースの型チェック
npm run test             # テストの実行 (実装時)
```

## 🔌 API エンドポイント

- `GET /api/health` - ヘルスチェックエンドポイント
- `GET /api/trends` - トレンドデータの取得

## 📈 開発ロードマップ

### 🔥 優先度: 高
1. **バックエンド: データ収集サービス実装**
   - はてなブックマーク、Qiita、ZennのAPI連携
   - 記事URLから企業ドメイン判定ロジック
   - 定期実行（cron）による自動データ収集

2. **バックエンド: API拡充**
   - `GET /api/companies` - 企業一覧取得
   - `GET /api/companies/:id/metrics` - 企業別メトリクス取得
   - `GET /api/trends/daily` - 日別トレンド分析
   - `GET /api/dashboard` - ダッシュボード用データ

3. **データベース設計**
   - Company, DailyMetrics, Trend テーブル設計
   - 時系列データ効率化のためのインデックス設計
   - データ保持ポリシー（古いデータの削除戦略）

### ⚡ 優先度: 中
4. **フロントエンド: ダッシュボード画面**
   - 企業影響力ランキング表示
   - 時系列グラフ（Chart.js/Recharts）
   - 企業カード表示
   - フィルタリング・ソート機能

5. **フロントエンド: 企業詳細画面**
   - 個別企業の詳細分析
   - トレンド推移グラフ、記事一覧表示

6. **フロントエンド: データフェッチング**
   - 型安全なAPI呼び出し
   - SWR/TanStack Query でのキャッシュ管理

### ✅ 完了済み
- 共有型定義の拡充 - Company, DailyMetrics, CompanyInfluence等の型定義

## 💡 開発メモ

- フロントエンドはポート3000、バックエンドはポート3001で動作
- APIルートはフロントエンドからバックエンドにプロキシされる
- 共有型は `@shared/types` を通じて両アプリで利用可能
- バックエンド開発には `tsx watch` を使用してホットリロード

## 🤝 貢献

プロジェクトへの貢献を歓迎します。Issue や Pull Request をお気軽にお送りください。