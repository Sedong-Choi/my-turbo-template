"use client";

import { CardBody, CardProps, forwardRef } from "@nextui-org/react";
import { Card, CardFooter, CardHeader, Chip } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

interface PostCardProps extends CardProps {
  title: string;
  author: string;
  tags?: string;
  href?: string;
}

const PostCard = forwardRef<"div", PostCardProps>((props, ref) => {
  return (
    <Card as={Link} className="w-full" href={props.href} ref={ref} {...props}>
      <CardHeader>
        <h2>{props.title}</h2>
      </CardHeader>
      <CardBody>
        {props.tags && (
          <div className="flex flex-wrap gap-x-2">
            {props.tags.split(",").map((tag) => (
              <Chip key={tag} size="sm">
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </CardBody>
      <CardFooter>auther: {props.author}</CardFooter>
    </Card>
  );
});

export default PostCard;
