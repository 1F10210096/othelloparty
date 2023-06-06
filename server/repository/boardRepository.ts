import type { UserId } from "$/commonTypesWithClient/branded";
import { userColorRepository } from "./userColorRepositry";


export type BoardArr = number[][];

export type Pos = { x: number; y: number };

const board: BoardArr = [
  ...Array.from({ length: 3 }, () => Array(8).fill(0)),
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  ...Array.from({ length: 3 }, () => Array(8).fill(0)),
];

export const boardRepository = {
  getBoard: () => board,
  clickBoard: (x: number, y: number,userId:UserId): number[][] => {
    board[y][x] = userColorRepository.getUserColor(userId);
    return board;
  },
};


curl 'http://localhost:31577/api/me' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: ja,en-US;q=0.9,en;q=0.8' \
  -H 'Connection: keep-alive' \
  -H 'Cookie: _ga=GA1.1.2023351821.1685983241; _gid=GA1.1.1025738352.1685983241; _gat_gtag_UA_SOMENUMBER_X=1; session=eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiQ2hpY2tlbiBNb3VudGFpbiIsImVtYWlsIjoiY2hpY2tlbi5tb3VudGFpbi41N0BleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE2ODU5ODM1ODMsInVzZXJfaWQiOiJzOTRvampHVTZqbFNGdXBKaVVBSUR2SUpQSlpMIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjaGlja2VuLm1vdW50YWluLjU3QGV4YW1wbGUuY29tIl0sImdpdGh1Yi5jb20iOlsiODQyMTA0MjYxMDAxMjMyMDI5MTU5MzY1NzAxNjg1NjU5NDg3NTYwNyJdfSwic2lnbl9pbl9wcm92aWRlciI6ImdpdGh1Yi5jb20ifSwiaWF0IjoxNjg2MDQ3NDM2LCJleHAiOjE2ODY0Nzk0MzYsImF1ZCI6ImVtdWxhdG9yIiwiaXNzIjoiaHR0cHM6Ly9zZXNzaW9uLmZpcmViYXNlLmdvb2dsZS5jb20vZW11bGF0b3IiLCJzdWIiOiJzOTRvampHVTZqbFNGdXBKaVVBSUR2SUpQSlpMIn0.' 
  -H 'Origin: http://localhost:3000' \
  -H 'Referer: http://localhost:3000/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --compressed