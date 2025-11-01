import Anchor from "./Anchor";
import type { BaseProps } from "../types/BaseProps";

type CardProps = BaseProps & {
  id: number;
  title: string;
  tags: string[];
  publishDate: string;
};

export default function PostCard({
  id,
  className,
  title,
  publishDate,
  tags,
}: CardProps) {
  return (
    <div
      className={
        className +
        " p-4 border-2 border-marker-black rounded-lg shadow-[3px_3px_0_0_#111827] hover:bg-gray-100 transition duration-100"
      }
    >
      <Anchor href={`/post/${id}`} className="text-xl text-{var(--marker-black)}">{title}</Anchor>
      <p className="text-sm text-gray-500 mt-1">
        {publishDate} &middot; {tags.join(", ")}
      </p>
    </div>
  );
}
