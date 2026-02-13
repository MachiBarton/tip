// 获取带 basePath 的图片路径
export function getImagePath(path: string): string {
  // 移除开头的斜杠
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // 添加 basePath
  return `/tip/${cleanPath}`;
}
