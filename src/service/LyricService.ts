/**
 * 歌词格式
 * [00:00.000] 作词 : 薛之谦/胡斯汉
 * [00:01.000] 作曲 : 胡斯汉
 */
export const preprocessLyric = (lyric?: string) => {
  if (!lyric) return [];
  let lyricList: TimeAndLyric[] = [];
  const lines = lyric.split("\n");
  lines.forEach((line) => {
    let index = 0;
    let timeStartIndex = -1;
    let lyricStartIndex = -1;
    while (index < line.length) {
      if (line.charAt(index) === '[') {
        timeStartIndex = index + 1;
      }
      if (line.charAt(index) === ']') {
        lyricStartIndex = index + 1;
      }
      index++;
    }
    if (timeStartIndex !== -1 && lyricStartIndex !== -1) {
      let time = formatTime(line.slice(timeStartIndex, lyricStartIndex - 2).trim())
      let lyric = line.slice(lyricStartIndex).trim()
      lyricList.push({ time, nextTime: Number.MAX_SAFE_INTEGER, lyric });
    }
  });
  // 设置结束时间nextTime
  for (let i = 0; i < lyricList.length - 1; i++) {
    lyricList[i].nextTime = lyricList[i + 1].time;
  }
  return lyricList;
};
/**
 * @param time 00:00.000
 */
const formatTime = (time: string) => {
  let timeNum = 0;
  const minuteAndSecondAndMs = time.split(":")
  if (minuteAndSecondAndMs.length >= 2) {
    // 分
    timeNum += parseInt(minuteAndSecondAndMs[0]) * 60 * 1000;
    const secondAndMs = minuteAndSecondAndMs[1].split(".")
    if (secondAndMs.length >= 2) {
      // 秒
      timeNum += parseInt(secondAndMs[0]) * 1000;
      // 毫秒
      timeNum += parseInt(secondAndMs[1]);
    }
  }
  return timeNum;

}

interface TimeAndLyric {
  time: number, // 当前歌词起始时间
  nextTime: number, // 下一句歌词起始时间
  lyric: string,
}
