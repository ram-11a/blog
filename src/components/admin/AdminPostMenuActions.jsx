import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminPostMenuActions = ({ post }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.publicMetadata?.role === "admin" || false;

  console.log("isAdmin:", isAdmin); // Add console log to check isAdmin value

  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const token = await getToken();
      return axios.put(
        `${import.meta.env.VITE_API_URL}/admin/posts/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Post approved successfully!");
      queryClient.invalidateQueries(["unapprovedPost", post.slug]);
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const token = await getToken();
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/posts/reject/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Post rejected successfully!");
      queryClient.invalidateQueries(["unapprovedPost", post.slug]);
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleApprove = async () => {
    console.log("approve button clicked");
    approveMutation.mutate(post._id);
  };

  const handleReject = async () => {
    console.log("reject button clicked");
    rejectMutation.mutate(post._id);
  };

  return (
    <div className="flex gap-4">
      {isAdmin && (
        <button
          onClick={handleApprove}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          style={{ display: "block" }} // Ensure button is displayed
        >
          Approve
        </button>
      )}
      {isAdmin && (
        <button
          onClick={handleReject}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          style={{ display: "block" }} // Ensure button is displayed
        >
          Reject
        </button>
      )}
    </div>
  );
};

export default AdminPostMenuActions;
