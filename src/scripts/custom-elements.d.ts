// custom-elements.d.ts
import { PreviewElement } from './PreviewElement';

declare global {
  interface HTMLElementTagNameMap {
    'preview-element': PreviewElement;
  }
}
