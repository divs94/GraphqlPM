import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
export default function ClientInfo({ client }) {
  return (
    <>
      <h5 className="mt-5 pb-3">Client Information</h5>
      <div className="card">
        <ul className="list-group ">
        <li className="list-group-item client_card">
          <FaIdBadge className="mr-2 user_icon" />
          {client.name}
        </li>

        <li className="list-group-item client_card">
          <FaEnvelope className="mr-2 user_icon" />
          {client.email}
        </li>

        <li className="list-group-item client_card">
          <FaPhone className="mr-2 user_icon" />
          {client.phone}
        </li>
        </ul>
    </div>
    </>
  );
}
