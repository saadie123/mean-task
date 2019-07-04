export interface Device {
  name: string;
  cost: string;
  warranty: string;
  image?: {
    filePath: string;
    fileUrl: string;
  };
  expiry: string;
}
