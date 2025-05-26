import { Link } from "react-router-dom";
import UnapprovedPostList from "../components/admin/UnapprovedPostList";

const AdminPage = () => {
  return (
    <div>
      <div>
        <h1 className="my-12 text-2xl text-gray-600">Recent Posts</h1>
        <UnapprovedPostList />
      </div>
    </div>
  );
};

export default AdminPage;
