export interface VideoJsOptions {
  autoplay?: boolean;
  controls?: boolean;
  sources?: SourceItem[];
  fluid?: boolean;
  aspectRatio?: string;
  poster?: string;
  muted?: boolean;
}

export interface SourceItem {
  src: string;
  type: string;
}
