import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

export const TopNavigation = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 40px",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "10px",
        }}
      >
        <h1>WATCHA</h1>
        <nav>
          <ul
            style={{
              display: "flex",
              margin: 0,
              padding: 0,
            }}
          >
            <li style={{ padding: "16px", fontSize: "16px" }}>구독</li>
            <li style={{ padding: "16px", fontSize: "16px" }}>개별구매</li>
            <li style={{ padding: "16px", fontSize: "16px" }}>웹툰</li>
            <li style={{ padding: "16px", fontSize: "16px" }}>왓챠피티</li>
          </ul>
        </nav>
      </div>
      <div>
        <CiSearch />
        <input type="text" placeholder="검색" />
        <IoIosNotificationsOutline />
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </div>
  );
};
