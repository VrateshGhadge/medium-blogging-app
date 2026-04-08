import { AppBar } from "../components/AppBar";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate()

  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleInput = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      contentRef.current?.focus();
    }
  };

const handlePublish = async () => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content, 
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const id = res.data.id;
    navigate(`/blog/${id}`);

  } catch (err) {
    console.error("Publish failed:", err);
  }
};

  return (
    <>
      <AppBar
        actionButton={
          <button 
            onClick={handlePublish}
            disabled={!title || !content}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full font-medium shadow-md transition-all duration-200"
          >
            Publish
          </button>
        }
      />

      <div className="max-w-3xl mx-auto mt-10 px-4">
        
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onInput={handleInput}
          onKeyDown={handleTitleKeyDown}
          placeholder="Title"
          rows={1}
          className="w-full text-4xl font-bold outline-none resize-none overflow-hidden leading-tight"
          style={{ maxHeight: "160px" }}
        />

        <textarea
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onInput={handleInput}
          placeholder="Tell your story..."
          rows={5}
          className="w-full mt-6 text-lg outline-none resize-none overflow-hidden leading-relaxed"
        />
      </div>
    </>
  );
};