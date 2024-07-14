import BlogCard from "./BlogCard";
import sofaBlog1 from "./blog_1.jpg";
import sofaBlog2 from "./blog_2.jpg";
import sofaBlog3 from "./blog_3.jpg";
import "./blog.css";

export default function Blog() {
  return (
    <div className="mt-24 p-8" id="/blog">
      <div className="text-center grid gap-3">
        <span className="text-gray-500 font-bold text-lg" id="blog">
          News & Blog
        </span>
        <span className="blog-heading text-2xl font-semibold">
          Our Latest News & Blogs
        </span>
      </div>
      <div className="blog-main grid grid-cols-3 gap-12 items-center mt-4 p-[1.5rem] ">
        <BlogCard
          img={sofaBlog1}
          date="1997"
          company="Robert T"
          title="Rich Dad, Poor Dad"
          body="Kiyosaki is a personal finance book that emphasizes the importance of financial education, teaches how to make money work for you, and challenges traditional beliefs about money."
        />
        <BlogCard
          img={sofaBlog2}
          date="2007"
          company="Hacker's Handbook"
          title="The Hacker's Handbook"
          body="The Hacker's Handbook is a non-fiction book in four editions, each reprinted numerous times between 1985 and 1990, and explaining how phone and computer systems of the period could be 'hacked'."
        />
        <BlogCard
          img={sofaBlog3}
          date="2016"
          company=" Mike McCormack"
          title="Solor bones"
          body="The novel's plot revolves around Marcus Conway, a deceased middle-aged engineer who has returned on All Souls' Day, and is reminiscing about his past life's events while sitting at his kitchen table."
        />
      </div>
    </div>
  );
}
