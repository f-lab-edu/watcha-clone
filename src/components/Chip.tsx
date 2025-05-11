import styled from "styled-components";

type ChipProps = {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
};

const StyledChip = styled.button<{ selected?: boolean }>`
  padding: 8px 16px;
  height: 40px;
  margin: 0 8px 8px 0;
  border-radius: 24px;
  border: 2px solid #333;
  background: ${({ selected }) => (selected ? "#fff" : "transparent")};
  color: ${({ selected }) => (selected ? "#111" : "#aaa")};
  font-size: 14px;
  font-weight: 700;
  border-color: ${({ selected }) => (selected ? "#fff" : "#333")};
  cursor: pointer;
`;

const Chip = ({ children, selected, onClick }: ChipProps) => {
  return (
    <StyledChip selected={selected} onClick={onClick}>
      {children}
    </StyledChip>
  );
};

export default Chip;
