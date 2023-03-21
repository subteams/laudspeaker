export enum Alignment {
  LEFT = "align-left",
  CENTER = "align-center",
  RIGHT = "align-right",
}

export enum ModalPosition {
  TOP_LEFT = "Top-left",
  TOP_CENTER = "Top-center",
  TOP_RIGHT = "Top-right",
  CENTER = "Center",
  BOTTOM_LEFT = "Bottom-left",
  BOTTOM_CENTER = "Bottom-center",
  BOTTOM_RIGHT = "Bottom-right",
}

export enum SizeUnit {
  PIXEL = "px",
  PERCENTAGE = "%",
  NONE = "",
}

export interface Size {
  value: number;
  unit: SizeUnit;
}

export enum BackgroundType {
  SOLID = "solid",
  GRADIENT = "gradient",
  IMAGE = "image",
}

export type Color = string;

export interface SolidBackground {
  type: BackgroundType.SOLID;
  color: Color;
  opacity: number;
}

export interface GradientBackground {
  type: BackgroundType.GRADIENT;
  color1: Color;
  color2: Color;
  opacity: number;
}

export interface ImageBackground {
  type: BackgroundType.IMAGE;
  imageSrc: string;
}

export type Background = SolidBackground | GradientBackground | ImageBackground;

export interface TextBox {
  hidden: boolean;
  alignment: Alignment;
  content: string;
  textColor: Color;
  linkColor: Color;
  fontSize: number;
}

export enum MediaType {
  IMAGE = "Image",
  VIDEO = "Video",
}

export enum MediaPosition {
  TOP = "Top",
  RIGHT = "Right",
  BOTTOM = "Bottom",
  LEFT = "Left",
}

export interface CommonMedia {
  hidden: boolean;
  position: MediaPosition;
  height: Size;
  type: MediaType;
}

export enum GeneralClickActions {
  NONE = "None",
  COMPLETE = "Complete Tour",
}

export enum MediaClickAction {
  NONE = "None",
  COMPLETE = "Complete Tour",
}

export enum AdditionalClickOptions {
  NOACTION = "NOACTION",
  OPENURL = "OPENURL",
}

export interface AdditionalClickOpenURLOption {
  url: string;
  openNewTab: boolean;
}

export interface IAdditionalClick {
  enabled: boolean;
  action: AdditionalClickOptions;
  object: undefined | AdditionalClickOpenURLOption; // When new types arrive add -> | NewClickOptionParams
}

export type AdditionalClicks = Record<AdditionalClickOptions, IAdditionalClick>;

export interface ImageMedia extends CommonMedia {
  imageSrc?: string | null;
  actionOnClick: MediaClickAction;
  altText: string;
  additionalClick: Record<AdditionalClickOptions, IAdditionalClick>;
}

export interface VideoMedia extends CommonMedia {
  videoUrl: string | null;
}

export type Media = ImageMedia & VideoMedia;

export enum PrimaryButtonPosition {
  BOTTOM_LEFT = "Bottom left",
  BOTTOM_CENTER = "Bottom center",
  BOTTOM_RIGHT = "Bottom right",
  CENTER_RIGHT = "Center right",
}

export interface PrimaryButton {
  hidden: boolean;
  fillColor: Color;
  borderColor: Color;
  textColor: Color;
  borderRadius: Size;
  position: PrimaryButtonPosition;
  clickAction: GeneralClickActions;
}

export enum DismissType {
  CROSS = "Cross",
  TEXT = "Text",
}

export enum DismissPosition {
  OUTSIDE_RIGHT = "Outside right",
  OUTSIDE_LEFT = "Outside left",
  INSIDE_RIGHT = "Inside right",
  INSIDE_LEFT = "Inside left",
  CENTER_RIGHT = "Center right",
  CENTER_LEFT = "Center Left",
}

export enum StylesVariants {
  BOLD = "BOLD",
  ITALIC = "ITALIC",
  H1 = "H1",
  LINK = "LINK",
}

export interface TimedDismiss {
  enabled: boolean;
  duration: number;
  displayTimer: boolean;
  timerColor: Color;
}

export interface CommonDismiss {
  position: DismissPosition;
  color: Color;
  timedDismiss: TimedDismiss;
  type: DismissType;
}

export interface CrossDismiss extends CommonDismiss {
  crossSize: Size;
}

export interface TextDismiss extends CommonDismiss {
  textSize: number;
}

export type Dismiss = CrossDismiss | TextDismiss;

export const mediaTypes = [MediaType.IMAGE, MediaType.VIDEO];

export enum SubMenuOptions {
  AdditionalClicks = "ADDITIONALCLICKOPTIONS",
  Personalization = "PERSONALIZATION",
  OpenUrl = "OPENURL",
}