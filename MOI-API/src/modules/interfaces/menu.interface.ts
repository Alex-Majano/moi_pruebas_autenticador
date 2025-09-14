export interface IMenu {
  label: string;
  icon: string;
  to?: string | null;
  visible?: boolean;
  items?: {
    label: string;
    icon: string;
    to: string;
    visible?: boolean;
  }[];
}
