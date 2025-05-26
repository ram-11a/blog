import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { htmlToText } from "html-to-text";

const SubmitPage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [file, setFile] = useState(null);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div>Please Login to Submit</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
      textContent: htmlToText(value, {
        wordwrap: 130,
        selectors: [
          { selector: "h1", format: "heading" },
          { selector: "h2", format: "heading" },
          { selector: "h3", format: "heading" },
          { selector: "ul", format: "list" },
          { selector: "ol", format: "list" },
          { selector: "li", format: "listItem" },
          { selector: "p", format: "paragraph" },
          { selector: "a", format: "anchor" },
          { selector: "img", format: "image" },
        ],
      }), // Convert HTML to plain text with custom options
    };
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a new Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <button className="p-2 shadow-md rounded-xl text-sm text-white bg-orange-600 opacity-75 w-max font-medium">
          Add a cover image
        </button>
        <input
          type="text"
          className="text-4xl font-semibold bg-transparent outline-none"
          placeholder="Your Title"
          name="title"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a Category
          </label>
          <select
            name="category"
            id=""
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="history">History</option>
            <option value="Dharma">Dharma</option>
            <option value="science">Science</option>
          </select>
        </div>
        <textarea
          name="desc"
          placeholder="Description"
          className="p-4 rounded-xl bg-white opacity-70 shadow-md"
        ></textarea>
        <input
          type="file"
          id="image"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        />

        <label
          htmlFor="image"
          className="cursor-pointer px-6 py-2 w-32 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-lg flex items-center justify-center"
        >
          Add Image
        </label>
        <ReactQuill
          theme="snow"
          className="flex-1 bg-slate-50 opacity-70 rounded-xl shadow-md"
          value={value}
          onChange={setValue}
        />
        <button
          disabled={mutation.isPending}
          className="bg-orange-700 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-orange-300 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Submit"}
        </button>
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default SubmitPage;
