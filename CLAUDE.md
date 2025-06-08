# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際のClaude Code (claude.ai/code) へのガイダンスを提供します。

## プロジェクト概要

このプロジェクトは、Webエンジニアの採用に携わるエンジニアリングオフィス向けのWebサイトです。

### 目的
はてなブックマークの人気ITエントリーや、Qiita、Zennのトレンドを元に、どの企業が技術コミュニティにおいて影響力があるかを定点観測することを目的としています。

### 機能
- **データ収集**: バックエンドでデイリーのトレンド情報を自動取得
- **データ蓄積**: 取得したトレンドデータをデータベースに保存
- **分析・可視化**: フロントエンドで企業の影響力をサマライズして表示
- **定点観測**: 継続的なデータ収集による企業影響力の変化追跡

### ターゲットユーザー
- エンジニアリングオフィスの採用担当者
- 技術系人事・リクルーター
- エンジニア採用戦略を検討する企業

## プロジェクト構成

これは npm workspaces を使用したTypeScript monorepoで、以下の構造になっています：
- `apps/frontend` - Next.js アプリケーション (ポート 3000)
- `apps/backend` - Hono API サーバー (ポート 3001)
- `packages/shared` - 共有TypeScript型とユーティリティ

フロントエンドは Next.js rewrites 設定を通じてバックエンドへのAPIリクエストをプロキシします。

## 開発コマンド

### 開発サーバーの起動
```bash
npm run dev              # フロントエンドとバックエンドの両方を起動
npm run dev:frontend     # Next.js のみを起動 (ポート 3000)
npm run dev:backend      # Hono サーバーのみを起動 (ポート 3001)
```

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

## 技術スタック

- **フロントエンド**: Next.js 14 with App Router, React 18, TypeScript, shadcn/ui, Tailwind CSS
- **バックエンド**: Hono with Node.js adapter, TypeScript
- **共有**: 共通TypeScript型とインターフェース
- **ビルドツール**: TypeScript, ESLint, tsx for development

## API エンドポイント

- `GET /api/health` - ヘルスチェックエンドポイント
- `GET /api/trends` - トレンドデータの取得

## 開発メモ

- フロントエンドはポート3000、バックエンドはポート3001で動作
- APIルートはフロントエンドからバックエンドにプロキシされる
- 共有型は `@shared/types` を通じて両アプリで利用可能
- バックエンド開発には `tsx watch` を使用してホットリロード