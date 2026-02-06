export class CreatePostDto {
  title: string;
  content: string;
  authorId: number; // Precisamos do ID de quem está postando
}
