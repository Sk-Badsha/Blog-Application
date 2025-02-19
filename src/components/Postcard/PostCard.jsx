import React from "react";
import service from "../../appwrite/config/config";
import { Link } from "react-router-dom";
function PostCard({ $id, title, featuredImage }) {
  const previewUrl = service.getFilePreview(featuredImage);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={previewUrl}
            alt={title}
            className="rounded-xl"
            onError={(e) => {
              //e.target.src = "default-image-url"; // Fallback image URL
              e.target.alt = "Image failed to load";
            }}
          />
        </div>

        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
