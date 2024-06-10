import { forwardRef } from "@nextui-org/react";
import { Card, CardFooter, CardHeader, Chip } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

interface PostCardProps {
  title: string;
  author: string;
  tags?: string[];
  href?: string;
}

const PostCard = forwardRef<"div", PostCardProps>((props, ref) => {
  return (
    <Card as={Link} className="w-1/2" href={props.href} ref={ref}>
      <CardHeader>
        <h2>{props.title}</h2>
        {props.tags && props.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}
      </CardHeader>
      <CardFooter>auther: {props.author}</CardFooter>
    </Card>
  );
});

export default PostCard;
