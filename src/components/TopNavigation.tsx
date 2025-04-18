import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { WatchaLogo } from "../assets/logo";

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
          alignItems: "center",
          padding: "10px",
        }}
      >
        <WatchaLogo />
        <nav style={{ marginLeft: "20px" }}>
          <ul
            style={{
              display: "flex",
              margin: 0,
              padding: 0,
            }}
          >
            <li
              style={{
                padding: "16px",
                fontSize: "16px",
                fontWeight: 400,
                color: "#84868D",
              }}
            >
              구독
            </li>
            <li
              style={{
                padding: "16px",
                fontSize: "16px",
                fontWeight: 400,
                color: "#84868D",
              }}
            >
              개별 구매
            </li>
            <li
              style={{
                padding: "16px",
                fontSize: "16px",
                fontWeight: 400,
                color: "#84868D",
              }}
            >
              웹툰
            </li>
            <li
              style={{
                padding: "16px",
                fontSize: "16px",
                fontWeight: 400,
                color: "#84868D",
              }}
            >
              왓챠피티
            </li>
          </ul>
        </nav>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "286px",
            padding: "8px 12px",
            background: "#222326",
            borderRadius: "8px",
          }}
        >
          <div style={{ marginRight: "8px" }}>
            <CiSearch size={24} />
          </div>
          <input
            type="text"
            placeholder="콘텐츠, 태그 , 인물, 리스트 검색"
            style={{
              background: "transparent",
              border: "none",
              fontSize: "15px",
              width: "100%",
            }}
          />
        </div>
        <IoIosNotificationsOutline size={24} />

        <button
          style={{
            height: "32px",
            padding: "0px 12px",
            background: "transparent",
            border: "none",
            color: "#FFFFFF",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          로그인
        </button>
        <button
          style={{
            height: "32px",
            padding: "0px 12px",
            background: "#f82f62",
            border: "none",
            color: "#FFFFFF",
            fontSize: "13px",
            borderRadius: "4px",
            fontWeight: 500,
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};
