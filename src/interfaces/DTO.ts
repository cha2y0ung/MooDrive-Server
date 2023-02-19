export interface createCourseDTO {
  description: string;
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

export interface searchCourseDTO {
  startLocation: string;
  endLocation: string;
  hashtag: string;
  totalTime: number;
}