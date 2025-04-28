// types.ts

export interface Book {
    id: number;
    title: string;
    author: string;
    image: string;
    publicationYear: string;
    publisher: string;
    translator: string;
    description: string;
    pdf: string;
    format: "hard" | "soft";
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  