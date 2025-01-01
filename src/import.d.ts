declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.svg" {
  const content: string;
  export default content;
}
declare module "*.css";

interface HTMLInputElement {
  showPicker: () => void;
}

declare module "style-dictionary/lib/utils/createDictionary" {
  const createDictionary: (options: any) => any;
  export = createDictionary;
}
