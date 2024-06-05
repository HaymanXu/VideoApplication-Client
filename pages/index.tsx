import { User, Card, Button, Textarea, ButtonGroup } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Video } from "@/types/videoMetadata";

export default function IndexPage() {
  const [data, setData] = useState<Video | null>(null);
  const [isLoading, setLoading] = useState(true);
  const video_id = "d63ad64a-4aed-496f-b91b-c4f268bea047";
  const getVideoUrl = `https://amqutw7db2.execute-api.us-west-1.amazonaws.com/dev/v1/database/video-metadata/${video_id}`;
  const user_id = "3357";

  console.log("url: " + getVideoUrl);
  useEffect(() => {
    fetch(getVideoUrl)
      .then((res) => {
        if (!res.ok) {
          // Check if response is ok (i.e., status is 200)
          throw new Error("Network response was not ok" + res.json());
        }

        return res.json();
      })
      .then((data: Video) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetching error: ", error);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  console.log("video_url: " + data.presignedUrl);

  const handleLike = async () => {
    // Call your API to update the like count
    try {
      // Example API call to update likes
      const response = await fetch(
        `https://scrtswk623.execute-api.us-west-1.amazonaws.com/dev/v1/database/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ video_id: video_id, user_id: user_id }),
        },
      );
      const result = await response.json();

      if (result.success) {
        setData({ ...data, likes_count: data.likes_count + 1 });
      }
    } catch (error) {
      console.error("Error liking the video: ", error);
    }
  };

  const handleDislike = async () => {
    // Call your API to update the dislike count
    try {
      // Example API call to update dislikes
      const response = await fetch(
        `https://rxam7k7k29.execute-api.us-west-1.amazonaws.com/dev/v1/database/dislike`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ video_id: video_id, user_id: user_id }),
        },
      );
      const result = await response.json();

      if (result.success) {
        setData({ ...data, dislikes_count: data.dislikes_count + 1 });
      }
    } catch (error) {
      console.error("Error disliking the video: ", error);
    }
  };
  
  return (
      <DefaultLayout>
          <Card>
              <ReactPlayer
                  controls
                  height="100%"
                  url={data.presignedUrl}
                  width="100%"
              />
          </Card>

          <h1 className={title()}>{data.title}</h1>
          <div className="flex justify-between items-center p-4">
              <User
                  avatarProps={{
                      src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                  }}
                  name={data.creator_id}
              />
              <div className="flex space-x-2">
                  <ButtonGroup radius="full">
                      <Button onClick={handleLike}> 👍 {data.likes_count}</Button>
                      <Button onClick={handleDislike}> 👎 {data.dislikes_count}</Button>
                  </ButtonGroup>
              </div>
          </div>
          <Card>
              <Textarea
                  label={`${data.views_count} views`}
                  minRows={3}
                  placeholder={data.description}
              />
          </Card>
          <div className="flex space-x-2">
              <User
                  avatarProps={{
                      src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                  }}
              />
              <Textarea
                  variant="underlined"
                  placeholder="Add a comment..."
              />
          </div>

      </DefaultLayout>
);
}
