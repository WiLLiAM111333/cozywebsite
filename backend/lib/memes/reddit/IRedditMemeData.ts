export interface IRedditMemeData {
  postLink: string;
  subreddit: SubredditStrings;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: Array<string>
}
