# 運用・保守

Trendsプロジェクトの運用ルール、保守方法、トラブルシューティングについて説明します。

## 🏛️ 運用ルール

### Git フロー・プルリクエスト運用

#### 基本原則
- **mainブランチ保護**: mainブランチへの直接pushは禁止
- **必須プルリクエスト**: すべての変更は必ずプルリクエスト経由で行う
- **日本語運用**: タイトル・本文は日本語で記述する
- **詳細な説明**: 変更内容と背景を明確に記載
- **レビュー必須**: 1名以上のレビューを経てマージ
- **monorepo原則**: 共有型定義(`@shared/types`)の一元管理を維持

#### PR作成時のテンプレート
```markdown
## 概要
この変更で何を実装・修正したかを説明

## 変更内容
- [ ] 実装した機能A
- [ ] 修正したバグB  
- [ ] 追加したテストC

## テスト
- [ ] 単体テスト実行済み
- [ ] 型チェック通過
- [ ] 手動テスト実行済み

## 影響範囲
この変更が影響する範囲について

## 備考
追加で伝えたいことがあれば
```

#### ブランチ命名規則
```bash
# 機能開発
feature/機能名-in-japanese

# バグ修正  
fix/修正内容-in-japanese

# ドキュメント更新
docs/更新内容-in-japanese

# リファクタリング
refactor/対象範囲-in-japanese
```

### コミット運用

#### コミットメッセージ形式
```bash
# 機能追加
feat: ダッシュボード画面の企業ランキング表示機能を追加

# バグ修正
fix: API型定義の不整合によるTypeScriptエラーを修正

# ドキュメント
docs: セットアップガイドに環境変数設定を追加

# スタイル修正
style: ESLintルールに従ってインデントを修正

# リファクタリング
refactor: 企業データ取得ロジックを共通関数として抽出

# テスト
test: CompanyCardコンポーネントの単体テストを追加

# 設定変更
chore: TypeScript設定にstrict modeを有効化
```

## 🔧 保守・運用手順

### 日次チェック項目

#### 開発環境
- [ ] 開発サーバーの動作確認
- [ ] API動作確認（`/api/health`）
- [ ] 型チェック・リント実行
- [ ] 新しいPRの確認・レビュー

#### 本番環境（Vercel）
- [ ] Vercelダッシュボードでデプロイ状況確認
- [ ] フロントエンド動作確認（https://trends.vercel.app）
- [ ] API動作確認（`/api/health`, `/api/trends`）
- [ ] Vercel Functions のログ確認
- [ ] パフォーマンス監視
- [ ] データ収集プロセス確認（実装後）

### 週次メンテナンス

#### コードベース
- [ ] 依存関係の更新確認
- [ ] セキュリティアラートの確認
- [ ] 不要なブランチの削除
- [ ] 古いPRのクローズ

#### データ管理（実装後）
- [ ] データベース容量確認
- [ ] 古いデータの削除（保持ポリシーに従って）
- [ ] バックアップ状況確認

## 🚨 トラブルシューティング

### 開発環境でよくある問題

#### 1. ポート使用中エラー
```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**解決方法:**
```bash
# プロセス確認
lsof -ti:3000
lsof -ti:3001

# プロセス終了
kill -9 <PID>

# または強制終了
pkill -f "node.*3000"
pkill -f "node.*3001"
```

#### 2. npm インストールエラー
```bash
npm ERR! peer dep missing
```

**解決方法:**
```bash
# キャッシュクリア
npm cache clean --force

# node_modules削除・再インストール
rm -rf node_modules package-lock.json
npm install

# ワークスペース強制再構築
npm install --force
```

#### 3. TypeScript型エラー
```bash
Type error: Cannot find module '@shared/types'
```

**解決方法:**
```bash
# 共有パッケージをビルド
npm run build:shared

# 型チェック実行
npm run typecheck

# VS Codeの場合、TypeScriptサーバーを再起動
# Command Palette > "TypeScript: Restart TS Server"
```

#### 4. Next.js開発サーバーエラー
```bash
Error: Failed to load next.config.js
```

**解決方法:**
```bash
# Next.jsキャッシュクリア
rm -rf .next

# 開発サーバー再起動
npm run dev:frontend
```

#### 5. APIプロキシエラー
```bash
API resolve without sending a response
```

**解決方法:**
```bash
# バックエンドサーバー確認
curl http://localhost:3001/api/health

# バックエンド再起動
npm run dev:backend

# next.config.js のrewrites設定確認
```

### データベース関連（実装後）

#### 1. 接続エラー
```bash
ECONNREFUSED: Connection refused
```

**解決方法:**
```bash
# データベースサービス状況確認
systemctl status postgresql
# または
brew services list | grep postgres

# サービス再起動
systemctl restart postgresql
# または  
brew services restart postgresql
```

#### 2. マイグレーションエラー
```bash
Migration failed: Table already exists
```

**解決方法:**
```bash
# マイグレーション状況確認
npx prisma migrate status

# マイグレーションリセット（開発環境のみ）
npx prisma migrate reset

# マイグレーション適用
npx prisma migrate deploy
```

### パフォーマンス問題

#### 1. 高いメモリ使用量
```bash
# プロセス監視
top -p $(pgrep -f "node")

# メモリ使用量詳細
ps aux | grep node
```

**対処法:**
- Node.jsのヒープサイズ制限設定
- 不要なプロセスの終了
- 開発サーバーの再起動

#### 2. 遅いAPI応答
**診断方法:**
```bash
# APIレスポンス時間計測
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3001/api/trends
```

**対処法:**
- データベースクエリの最適化
- キャッシュ戦略の見直し
- インデックスの追加

## 📊 監視・ログ

### 開発環境でのログ確認

#### アプリケーションログ
```bash
# フロントエンドログ
npm run dev:frontend 2>&1 | tee frontend.log

# バックエンドログ  
npm run dev:backend 2>&1 | tee backend.log
```

#### エラー追跡
- ブラウザの開発者コンソール
- Node.jsのconsole.error出力
- TypeScriptコンパイルエラー

### 本番環境監視（Vercel）

#### Vercel監視メトリクス
- **デプロイ状況**: 成功/失敗率
- **Vercel Functions**: 実行時間・エラー率・同時実行数
- **CDN応答時間**: 地域別レスポンス時間
- **帯域幅使用量**: 月次制限の監視

#### 推奨監視ツール
- **Vercel Analytics**: パフォーマンス・ユーザー行動分析
- **GitHub Actions**: ビルド・デプロイパイプライン監視
- **外部サービス**: Uptime Robot, Pingdom等のヘルスチェック

#### アラート設定（実装推奨）
- API応答時間 > 5秒（Serverless関数の制約考慮）
- デプロイ失敗率 > 10%
- Vercel Functions エラー率 > 5%
- 月次帯域幅使用量 > 80%

## 🔄 定期メンテナンス

### 月次作業
- [ ] **依存関係更新**: セキュリティアップデート適用
- [ ] **パフォーマンス分析**: 重い処理の特定・最適化
- [ ] **コードレビュー**: アーキテクチャの改善点検討
- [ ] **ドキュメント更新**: 変更に伴うドキュメント修正

### 四半期作業
- [ ] **技術負債の解消**: リファクタリング計画・実行
- [ ] **セキュリティ監査**: 脆弱性スキャン・対応
- [ ] **バックアップ戦略見直し**: データ保護の改善
- [ ] **運用プロセス改善**: 効率化・自動化の検討

## 📞 サポート・連絡先

### 開発チーム連絡方法
- **GitHub Issues**: バグ報告・機能要求
- **GitHub Discussions**: 技術相談・アイデア共有
- **Pull Request**: コードレビュー依頼

### 緊急時連絡先（本番環境）
- **システム障害**: GitHub Issues に `urgent` ラベル付きで報告
- **セキュリティ問題**: プライベートリポジトリ管理者に直接連絡

## 📚 参考資料

### 運用ドキュメント
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### 監視・運用ツール
- [GitHub Actions](https://docs.github.com/ja/actions) - CI/CD
- [Dependabot](https://docs.github.com/ja/code-security/dependabot) - 依存関係管理
- [CodeQL](https://docs.github.com/ja/code-security/code-scanning) - セキュリティスキャン

---

**🔧 運用改善提案**: 運用プロセスの改善アイデアは [Discussions](https://github.com/rfdnxbro/trends/discussions) でお気軽に共有してください！