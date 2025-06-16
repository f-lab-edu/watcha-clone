export const getRunningTime = (runtime: number): string => {
  if (runtime <= 0) {
    return "정보 없음";
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return `${hours}시간 ${minutes}분`;
};
