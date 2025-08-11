export function greet(name: string): string {
  if (!name || name.trim() === "") {
    return "Hello, Guest!";
  }
  return `Hello, ${name}!`;
}
