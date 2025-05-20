import styled from "styled-components";

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

type TopTabsProps = {
  menus: string[];
  selectedMenu: string;
  onMenuClick: (menu: React.MouseEvent<HTMLUListElement>) => void;
};

export const TopTabs: React.FC<TopTabsProps> = ({
  menus,
  selectedMenu,
  onMenuClick,
}) => {
  return (
    <nav style={{ marginLeft: "20px" }}>
      <ul
        style={{
          display: "flex",
          margin: 0,
          padding: 0,
        }}
        onClick={(e) => onMenuClick(e)}
      >
        {menus.map((menu) => (
          <StyledListItem key={menu} isActive={selectedMenu === menu}>
            {menu}
          </StyledListItem>
        ))}
      </ul>
    </nav>
  );
};
