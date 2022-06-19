export interface comicTypes {
  active: boolean;
  created_at: Date;
  id: number;
  name: string;
}

export interface idea {
  title: string;
  description: string;
  pages: page[];
}

interface page {
  pageConversation: string;
  imageDescription: string;
}
