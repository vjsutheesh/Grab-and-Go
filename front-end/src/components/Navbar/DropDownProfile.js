import { VscAccount } from "react-icons/vsc";

const DropDownProfile = () => {
  return (
    <div className="dropDownProfile">
      <div className="user-details">
        <div className="avatar">
          <VscAccount className="avatar-pic" />
        </div>
        <div className="user-name">{sessionStorage.getItem("username")}</div>
      </div>
      <div className="drop-content">
        <a href="/profile" className="my-profile-link my-profile">
          MY PROFILE
        </a>
        <a href="/history" className="orderhistory orderhistory-link">
          ORDER HISTORY
        </a>
      </div>
      <a href="/" className="logout">
        <div className="logout-link">LOGOUT</div>
        <div className="logout-icon">
          <i class="fa fa-sign-out"></i>
        </div>
      </a>
    </div>
  );
};

export default DropDownProfile;
