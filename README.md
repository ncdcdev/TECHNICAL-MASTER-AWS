# TECHNICAL MASTER はじめてのAWSモダンアプリ開発入門 - サンプルコード

本リポジトリは「TECHNICAL MASTER はじめてのAWSモダンアプリ開発入門」のサンプルコードです。

## 誤記 / 誤植 に関して

> [!IMPORTANT]
> 著者が確認できた誤記・誤植に関しては、随時こちらに追加します。
> 
> また、読者の方からのご指摘も歓迎します。本リポジトリのIssueにてお知らせください。

本書において、一部記載に誤りがありました。お詫び申し上げるとともに、以下に訂正箇所を記載いたします。

### `amplify.yaml` の誤植

以下の箇所の`amplify.yaml` のコードに誤植がありました。正しいコードは本リポジトリのコードを参考にしてください。

  - Chapter2(p38) : [正しいコード](https://github.com/ncdcdev/TECHNICAL-MASTER-AWS/blob/chapter-2/amplify.yml)
  - Chapter4(p98) : [正しいコード](https://github.com/ncdcdev/TECHNICAL-MASTER-AWS/blob/chapter-4/amplify.yml)
  - Chapter8(p286) : [正しいコード](https://github.com/ncdcdev/TECHNICAL-MASTER-AWS/blob/chapter-8/amplify.yml)

## プロジェクト概要

このプロジェクトはAWSのサービスを活用したAIチャットアプリケーションです。書籍を通して以下の技術スタックを学習できます。

- フロントエンド
  - AWS Amplify Gen2 (React + TypeScript + Vite + TailwindCSS)
- バックエンド
  - AWS AppSync
  - AWS Lambda (TypeScript)
- AI機能
  - Amazon Bedrock
- データベース
  - Amazon DynamoDB
- 認証
  - Amazon Cognito
- CI/CD
  - CI: GitHub Actions
  - CD: AWS Amplify Gen2 + AWS CDK

## 章別ブランチ

各章の終了時点のコードを以下のブランチで確認できます。

- [Chapter 2](https://github.com/ncdcdev/TECHNICAL-MASTER-AWS/tree/chapter-2) - はじめてのAWSアプリ開発
- [Chapter 3](https://github.com/ncdcdev/TECHNICAL-MASTER-AWS/tree/chapter-3) - 開発環境の本格的な整備
- [Chapter 4](https://github.com/ncdcdev/TECHNICAL-MASTER-AWS/tree/chapter-4) - バックエンドの基礎の開発
- [Chapter 5](https://github.com/ncdcdev/TECHNICAL-MASTER-AWS/tree/chapter-5) - フロントエンド開発
- [Chapter 6](https://github.com/ncdcdev/TECHNICAL-MASTER-AWS/tree/chapter-6) - AIチャット機能の開発
- [Chapter 7](https://github.com/ncdcdev/TECHNICAL-MASTER-AWS/tree/chapter-7) - アプリケーションの完成
- [Chapter 8](https://github.com/ncdcdev/TECHNICAL-MASTER-AWS/tree/chapter-8) - CI/CD パイプラインの構築
- [Chapter 9](https://github.com/ncdcdev/TECHNICAL-MASTER-AWS/tree/chapter-9) - 運用と監視
- [Chapter 10](https://github.com/ncdcdev/TECHNICAL-MASTER-AWS/tree/chapter-10) - その他の実装パターン
