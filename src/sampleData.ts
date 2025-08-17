import type { Conversation } from "./types/chat";

export const sampleConversations: Conversation[] = [
  {
    id: "chat-1",
    title: "AWSについての質問",
    messages: [
      {
        id: "2",
        role: "user",
        content:
          "S3とEBSの違いについて教えてください。どのような用途に適していますか？",
        timestamp: new Date("2025-07-10T09:01:00"),
      },
      {
        id: "3",
        role: "assistant",
        content:
          "S3(Simple Storage Service)とEBS(Elastic Block Store)は用途が異なるストレージサービスです。S3はオブジェクトストレージで、ファイルをオブジェクトとして保存します。大容量データの長期保存、ウェブサイトホスティング、バックアップに適しています。高い耐久性を持ち、HTTPSを通じてアクセス可能です。EBSはブロックストレージで、EC2インスタンスにアタッチして使用します。データベースやファイルシステムなど、頻繁に変更されるデータを保存するのに適しています。低レイテンシーで高いIOPSが必要な場合に選ばれます。選択基準としては、ファイル単位のアクセスが必要ならS3、ブロックレベルのアクセスが必要ならEBSが適しています。",
        timestamp: new Date("2025-07-10T09:02:00"),
      },
      {
        id: "4",
        role: "user",
        content:
          "わかりやすい説明をありがとうございます。S3のストレージクラスについてももう少し詳しく知りたいです。",
        timestamp: new Date("2025-07-10T09:03:00"),
      },
      {
        id: "5",
        role: "assistant",
        content:
          "S3のストレージクラスについて詳しくご説明します。1. S3 Standard: 頻繁にアクセスされるデータ向け。高可用性と耐久性を備え、低レイテンシーと高スループットを提供します。2. S3 Intelligent-Tiering: アクセスパターンが変化するデータに最適。自動的にアクセス頻度に基づいて最適なストレージクラスに移動します。3. S3 Standard-IA (Infrequent Access): アクセス頻度が低いが、必要時には迅速なアクセスが必要なデータ向け。Standardより安価ですが、取り出し料金が発生します。4. S3 One Zone-IA: 単一のアベイラビリティゾーンに保存され、Standard-IAよりも安価です。重要でない再作成可能なデータに適しています。5. S3 Glacier: 長期アーカイブ向け。取り出しに数分から数時間かかりますが、コストは大幅に削減されます。6. S3 Glacier Deep Archive: 最も安価なクラスで、年に1〜2回しかアクセスしないデータの長期保存に最適です。取り出しには最大12時間かかります。",
        timestamp: new Date("2025-07-10T09:05:00"),
      },
      {
        id: "6",
        role: "user",
        content: "GlacierとGlacier Deep Archiveの違いは何ですか？",
        timestamp: new Date("2025-07-10T09:06:00"),
      },
      {
        id: "7",
        role: "assistant",
        content:
          "Glacierは長期アーカイブ向けで、取り出しに数分から数時間かかります。Glacier Deep Archiveはさらに低コストで、取り出しには最大12時間かかります。アクセス頻度が極めて低いデータに最適です。",
        timestamp: new Date("2025-07-10T09:07:00"),
      },
      {
        id: "8",
        role: "user",
        content: "EBSのスナップショットはどのように活用できますか？",
        timestamp: new Date("2025-07-10T09:08:00"),
      },
      {
        id: "9",
        role: "assistant",
        content:
          "EBSスナップショットは、ボリュームのバックアップやリストア、別のリージョンへの複製などに活用できます。定期的なバックアップや障害対策に有効です。",
        timestamp: new Date("2025-07-10T09:09:00"),
      },
      {
        id: "10",
        role: "user",
        content: "S3のバージョニング機能について教えてください。",
        timestamp: new Date("2025-07-10T09:10:00"),
      },
      {
        id: "11",
        role: "assistant",
        content:
          "S3のバージョニングを有効にすると、同じキーのオブジェクトの複数バージョンを保存できます。誤削除や上書き時のリカバリに役立ちます。",
        timestamp: new Date("2025-07-10T09:11:00"),
      },
      {
        id: "12",
        role: "user",
        content: "S3のライフサイクルルールはどのように設定しますか？",
        timestamp: new Date("2025-07-10T09:12:00"),
      },
      {
        id: "13",
        role: "assistant",
        content:
          "S3バケットの管理画面からライフサイクルルールを作成できます。指定した日数経過後にオブジェクトを削除したり、別のストレージクラスへ自動移行できます。",
        timestamp: new Date("2025-07-10T09:13:00"),
      },
      {
        id: "14",
        role: "user",
        content: "EBSの種類にはどんなものがありますか？",
        timestamp: new Date("2025-07-10T09:14:00"),
      },
      {
        id: "15",
        role: "assistant",
        content:
          "EBSには汎用SSD(gp3/gp2)、プロビジョンドIOPS SSD(io2/io1)、スループット最適化HDD(st1)、Cold HDD(sc1)があります。用途に応じて選択します。",
        timestamp: new Date("2025-07-10T09:15:00"),
      },
      {
        id: "16",
        role: "user",
        content: "S3のアクセスコントロールはどのように行いますか？",
        timestamp: new Date("2025-07-10T09:16:00"),
      },
      {
        id: "17",
        role: "assistant",
        content:
          "S3のアクセス制御はバケットポリシー、IAMポリシー、ACLで行います。推奨はバケットポリシーやIAMロールによる制御です。",
        timestamp: new Date("2025-07-10T09:17:00"),
      },
      {
        id: "18",
        role: "user",
        content: "EBSの暗号化はどのように設定しますか？",
        timestamp: new Date("2025-07-10T09:18:00"),
      },
      {
        id: "19",
        role: "assistant",
        content:
          "EBSの暗号化はボリューム作成時に有効化できます。既存ボリュームもスナップショット経由で暗号化可能です。KMSキーを利用します。",
        timestamp: new Date("2025-07-10T09:19:00"),
      },
      {
        id: "20",
        role: "user",
        content: "S3の静的ウェブサイトホスティングの設定方法を教えてください。",
        timestamp: new Date("2025-07-10T09:20:00"),
      },
      {
        id: "21",
        role: "assistant",
        content:
          "S3バケットのプロパティから静的ウェブサイトホスティングを有効化し、インデックスドキュメントやエラードキュメントを指定します。公開設定やバケットポリシーも必要です。",
        timestamp: new Date("2025-07-10T09:21:00"),
      },
    ],
    createdAt: new Date("2025-07-10T09:00:00"),
    updatedAt: new Date("2025-07-10T09:21:00"),
  },
];
