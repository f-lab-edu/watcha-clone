import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { WatchaLogo } from "@Assets/logo";
import { useState } from "react";
import { TopTabs } from "./TopTabs";
import useSearchInput from "../../hooks/useSearchInput";

export const TopHeader = () => {
  const [menu, setMenu] = useState("개별 구매");
  const { searchInput, handleSearchInputChange, handleSearch, handleKeyPress } =
    useSearchInput();

  const handleMenuClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLLIElement;
    const selectedMenu = target.innerText;
    setMenu(selectedMenu);
  };

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
        }}
      >
        <WatchaLogo />
        <TopTabs
          menus={["구독", "개별 구매", "웹툰", "왓챠피티"]}
          selectedMenu={menu}
          onMenuClick={handleMenuClick}
        />
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
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyPress}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "15px",
              width: "100%",
              color: "#FFFFFF",
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
