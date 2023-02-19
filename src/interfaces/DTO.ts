export interface createCourseDTO {
  discription: string;
  totalTime: number;
  startLocation: string;
  startDetail: string;
  endLocation: string;
  endDetail: string;
  hashtag: string;
  music: string;
  scrap: number;
  color1: string;
  color2: string;
  path: string
}

export interface createPhotoDTO {
  photoUrl: string;
}

export interface createPathDTO {
  x: number;
  y: number;
  lat: number;
  lng: number;
}