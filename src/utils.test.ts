import { expect, test, describe } from "vitest";
import { greet } from "./utils";

describe("greet関数", () => {
  test("正常な名前で正しい挨拶を返す", () => {
    expect(greet("Alice")).toBe("Hello, Alice!");
  });

  test("空文字や無効な名前の場合はゲスト扱いする", () => {
    expect(greet("")).toBe("Hello, Guest!");
    expect(greet("   ")).toBe("Hello, Guest!");
  });
});
