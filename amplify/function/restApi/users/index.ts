import type { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

// ユーザーデータの型定義
interface User {
  id: string;
  name: string;
  email: string;
}

// サンプルデータ
const users: User[] = [
  { id: "1", name: "山田太郎", email: "yamada@example.com" },
  { id: "2", name: "鈴木花子", email: "suzuki@example.com" },
];

// レスポンスを生成するヘルパー関数
const createResponse = <T>(
  statusCode: number,
  body: T,
): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify(body),
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const { httpMethod, body } = event;

  try {
    // GET /users - ユーザー一覧を取得
    if (httpMethod === "GET") {
      return createResponse(200, { users });
    }

    // POST /users - 新しいユーザーを作成
    if (httpMethod === "POST") {
      if (!body) {
        return createResponse(400, { error: "リクエストボディが必要です" });
      }

      const newUser = JSON.parse(body);

      // 簡単なバリデーション
      if (!newUser.name || !newUser.email) {
        return createResponse(400, { error: "name と email は必須です" });
      }

      // 新しいユーザーを作成
      const createdUser: User = {
        id: String(users.length + 1),
        name: newUser.name,
        email: newUser.email,
      };

      users.push(createdUser);

      return createResponse(201, createdUser);
    }

    // その他のメソッドは未対応
    return createResponse(405, { error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error:", error);
    return createResponse(500, { error: "Internal Server Error" });
  }
};
