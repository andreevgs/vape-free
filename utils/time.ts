export const getElapsedTime = (milliseconds: number) => {
  const pastDate = new Date(milliseconds);
  const currentDate = new Date();
  const diff = currentDate - pastDate;
  const years: number = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months: number = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  const days: number = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  let hours: string | number = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes: string | number = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds: string | number = Math.floor((diff % (1000 * 60)) / 1000);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return {years, months, days, hours, minutes, seconds}
}

export const getExpirationTime = (timeMilliseconds: number) => {
  const time = new Date(timeMilliseconds);
  let minutes: string | number = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds: string | number = Math.floor((time % (1000 * 60)) / 1000);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${minutes}:${seconds}`;
}
