import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { WatchaLogo } from "../assets/logo";
import styled from "styled-components";
import { useState } from "react";

const StyledListItem = styled.li<{ isActive: boolean }>`
  padding: 16px;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.isActive ? "#ffffff" : "#84868d")};
  cursor: pointer;
  border-bottom: ${(props) =>
    props.isActive ? "2px solid #ffffff" : "2px solid transparent"};

  &:hover {
    border-bottom: ${(props) =>
      props.isActive ? "2px solid #ffffff" : "2px solid #84868d"};
  }
`;

export const TopNavigation = () => {
  const [menu, setMenu] = useState("개별 구매");

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
        <nav style={{ marginLeft: "20px" }}>
          <ul
            style={{
              display: "flex",
              margin: 0,
              padding: 0,
            }}
            onClick={(e) => handleMenuClick(e)}
          >
            <StyledListItem isActive={menu === "구독"}>구독</StyledListItem>
            <StyledListItem isActive={menu === "개별 구매"}>
              개별 구매
            </StyledListItem>
            <StyledListItem isActive={menu === "웹툰"}>웹툰</StyledListItem>
            <StyledListItem isActive={menu === "왓챠피티"}>
              왓챠피티
            </StyledListItem>
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
