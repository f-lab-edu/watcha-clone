import { CommentType } from "../types/CommentType";

export class CommentModel {
  author_details?: {
    name?: string;
    username?: string;
    avatar_path?: string | null;
    rating?: number;
  };
  author?: string;
  content?: string;
  created_at?: string;
  id?: string;
  updated_at?: string;
  url?: string;

  constructor(json: Partial<CommentType>) {
    Object.assign(this, json);
  }

  get username(): string {
    return this.author_details?.name || this.author_details?.username || "익명";
  }

  get rating(): number {
    return this.author_details?.rating || 0;
  }

  get reviewContent(): string {
    return this.content || "내용이 없습니다.";
  }
}
