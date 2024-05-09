// % 소수점 이하 2자리까지 표시
export const formatPercentDecimal = (number: number) => {
  return (number * 100).toFixed(2);
};

// 거래대금 백만 단위로 표시
export const formatToMillion = (number: number) => {
  const million = 1000000;
  const result = Math.floor(number / million) * million;
  return result.toLocaleString('en-US').slice(0, -8);
};

// KRW 제거
export const changeCodeName = (code: string) => {
  // return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return code.replace('KRW-', '');
};

// 숫자 세 자리마다 쉼표를 추가
export const numberFormatter = (number: number) => {
  if (number >= 1) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (number < -1) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return number.toFixed(5);
  }
};

// export const numberFormatter = (number: number) => {
//   let formattedNumber = number.toFixed(5); // 소수점 이하 5자리까지 표시
//   if (number >= 1) {
//     formattedNumber = number.toFixed(2); // 1 이상이면 소수점 이하 2자리까지 표시
//     if (formattedNumber.endsWith('.00') || formattedNumber.endsWith('0')) {
//       formattedNumber = formattedNumber.slice(0, -3); // 두 번째 자리가 0이거나 소수점 이하가 .00이면 소수점 이하 제거
//     }
//   }
//   return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 세 자리마다 쉼표 추가
// };