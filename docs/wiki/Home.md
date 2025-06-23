# Trends - 企業技術影響力分析プラットフォーム

## 🎯 プロジェクト概要

このプロジェクトは、**Webエンジニアの採用に携わるエンジニアリングオフィス向けのWebサイト**です。はてなブックマークの人気ITエントリーや、Qiita、Zennのトレンドを元に、どの企業が技術コミュニティにおいて影響力があるかを定点観測することを目的としています。

## 🚀 主要機能

### データ収集・蓄積
- **自動データ収集**: バックエンドでデイリーのトレンド情報を自動取得
- **データ蓄積**: 取得したトレンドデータをデータベースに保存
- **継続的な観測**: 企業影響力の変化を時系列で追跡

### 分析・可視化
- **影響力分析**: フロントエンドで企業の影響力をサマライズして表示
- **ダッシュボード**: 企業ランキングと詳細分析画面
- **トレンド可視化**: 時系列グラフによる影響力推移の表示

## 👥 ターゲットユーザー

- **エンジニアリングオフィスの採用担当者**
- **技術系人事・リクルーター**
- **エンジニア採用戦略を検討する企業**

## 🏗️ アーキテクチャ

TypeScript monorepo構成で、以下の3つの主要コンポーネントから構成されています：

- **Frontend**: Next.js アプリケーション（企業影響力の可視化）
- **Backend**: Hono API サーバー（データ収集・API提供）
- **Shared**: 共有TypeScript型とユーティリティ

## 📚 Wiki ナビゲーション

- **[セットアップガイド](Setup-Guide)** - 開発環境の構築方法
- **[開発ガイド](Development-Guide)** - 開発の進め方とコーディング規約
- **[API仕様](API-Specification)** - APIエンドポイントの詳細
- **[開発ロードマップ](Development-Roadmap)** - 実装予定機能と進捗
- **[運用・保守](Operations-and-Maintenance)** - 運用ルールとトラブルシューティング

## 🛠️ 技術スタック

- **Frontend**: Next.js 14, React 18, TypeScript, shadcn/ui, Tailwind CSS
- **Backend**: Hono, Node.js, TypeScript
- **Build**: npm workspaces, ESLint, tsx for development

---

**🔗 Links**: [Repository](https://github.com/rfdnxbro/trends) | [Issues](https://github.com/rfdnxbro/trends/issues)