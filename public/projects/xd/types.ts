
export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  image: string;
  accentColor: string;
  syllabus: Module[];
  fullCurriculum?: CurriculumSection[];
  facts?: string[];
  teacher: Teacher;
  stats: {
    students: number;
    rating: number;
    hours: number;
  };
}

export interface Module {
  title: string;
  topics: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation?: string;
}

export interface LessonContent {
  type: 'text' | 'video' | 'quiz';
  content?: string; // HTML string for text
  videoUrl?: string;
  questions?: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'lecture' | 'practice' | 'homework';
  duration: string;
  data: LessonContent; // The actual content
}

export interface CurriculumSection {
  title: string;
  hours: number;
  lessons: Lesson[];
}

export interface Teacher {
  name: string;
  role: string;
  bio: string;
  images: string[]; // Changed from image: string to images: string[]
}

export interface User {
  name: string;
  email: string;
  enrolledCourses: string[]; // IDs of courses
  completedLessons: string[]; // IDs of completed lessons
}

export enum Page {
  HOME = 'HOME',
  COURSES = 'COURSES',
  COURSE_DETAIL = 'COURSE_DETAIL',
  ABOUT = 'ABOUT',
  OFFER = 'OFFER',
  AGREEMENT = 'AGREEMENT',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  LESSON = 'LESSON'
}
