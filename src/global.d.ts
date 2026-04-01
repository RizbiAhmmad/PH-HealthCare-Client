declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.css?module' {
  const content: { [className: string]: string };
  export default content;
}
