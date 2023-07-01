import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../../atoms/user';
import styles from './othello.module.css';

// eslint-disable-next-line max-depth
const Home = () => {
  const [user] = useAtom(userAtom);
  const [roomId, setRoomId] = useState('');
  const [userId, setUserId] = useState('');
  const [yourName, setyourName] = useState('');
  const [board, setBoard] = useState<number[][]>();
  const router = useRouter();

  // eslint-disable-next-line complexity
  const Id = async () => {
    const newMe = await apiClient.me.$get();
    const limit = router.query.labels?.toString();
    const board = await apiClient.rooms.$get({ query: { limit } }).catch(returnNull);
    setUserId(newMe.id);
    if (newMe.displayName !== undefined) {
      setyourName(newMe.displayName);
    }
    const currentmen = document.getElementById('current-men');
    const currentname = document.getElementById('current-name');
    console.log(userId);
    console.log(board?.blackmen);
    if (userId === board?.blackmen) {
      if (currentmen === null  || currentname === null) {
        console.log("Element 'current-men' not found");
      } else {
        // eslint-disable-next-line max-depth
          currentmen.textContent = '黒';
          currentname.textContent = yourName;
          console.log('abc');
      }
    }
    else if (userId === board?.whitemen) {
      if (currentmen === null  || currentname === null) {
        console.log("Element 'current-men' not found");
      } else {
        // eslint-disable-next-line max-depth
          currentmen.textContent = '白';
          currentname.textContent = yourName;
          console.log('def');
      }
    }
    else {
      if (currentmen === null) {
        console.log("Element 'current-men' not found");
      } else {
        // eslint-disable-next-line max-depth
          currentmen.textContent = '感染者';
          console.log('def');
      }
    }
  };
  // eslint-disable-next-line complexity
  const id = async () => {
    const limit = router.query.labels?.toString();
    const board = await apiClient.rooms.$get({ query: { limit } }).catch(returnNull);
    if (board === null) {
      const newRoom = await apiClient.rooms.$post();
      setBoard(newRoom.board);
      setRoomId(newRoom.id);
    }
    if (board !== null) {
      const currentcolor = document.getElementById('current-color');
      if (currentcolor === null) {
        console.log("Element 'current-color' not found");
      } else if (board.blackmen === userId) {
        currentcolor.textContent = board.knum.toString();
      }
    }
  };
  // eslint-disable-next-line complexity
  const fetchBoard = async () => {
    const limit = router.query.labels?.toString();
    const board = await apiClient.rooms.$get({ query: { limit } }).catch(returnNull);

    console.log(board);
    if (board === null) {
      const newRoom = await apiClient.rooms.$post();
      setBoard(newRoom.board);
      setRoomId(newRoom.id);
    }
    if (board !== null) {
      const turn = board.turn;
      setBoard(board.board);
      setRoomId(board.id);
      console.log(turn);
      const currentTurnElement = document.getElementById('current-turn');
      if (turn === 1) {
        // eslint-disable-next-line max-depth
        if (currentTurnElement !== null) {
          currentTurnElement.textContent = '黒';
        }
      } else if (turn === 2) {
        // eslint-disable-next-line max-depth
        if (currentTurnElement !== null) {
          currentTurnElement.textContent = '白';
        }
      }
      const currentnum = document.getElementById('current-num');
      if (currentnum === null) {
        console.log("Element 'current-turn' not found");
      } else {
        currentnum.textContent = board.knum.toString();
      }
    }
  };
  const onClick = async (x: number, y: number, roomId: string) => {
    await apiClient.rooms.board.$post({ body: { x, y, roomId } });
    await fetchBoard();
    await id();
    await Id();
  };

  // const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
  //   setLabel(e.target.value);
  // };

  // const createTask = async (e: FormEvent) => {
  //   e.preventDefault();
  //   setLabel('');
  //   const label = 'a';
  //   const labels = await apiClient.rooms.$get({ query: { limit: label } });
  //   console.log(labels); // レスポンスをコンソールに出力
  //   await fetchBoard();
  //   return labels;
  // };

  useEffect(() => {
    const cancelId = setInterval(fetchBoard, 500);
    return () => {
      clearInterval(cancelId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!board || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.me} />
        {/* <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTask}>
          <input value={label} type="text" onChange={inputLabel} />
          <input type="submit" value="ADD" />
        </form> */}
        <div className={styles.component} />
        <p>Room ID:{roomId}</p>
        <p>
          現在の手番は<span id="current-turn">黒</span>です
        </p>
        <p>
          感染者 <span id="current-num"> 0 </span> 人です
        </p>
        <p>
          あなたは <span id="current-men"> 感染者 </span> です
        </p>

        <p>
          あなたの名前は <span id="current-name">  </span> です
        </p>

        {/* <p>
          黒の駒数: <span id="countblack">{blackStoneCount}</span>
        </p>
        <p>
          白の駒数: <span id="countwhite">{whiteStoneCount}</span>
        </p> */}

        <div className={styles.board}>
          {board.map((row, y) =>
            // eslint-disable-next-line complexity
            row.map((color, x) => (
              <div
                className={styles.cell}
                key={`${x}-${y}`}
                onClick={() => onClick(x, y, roomId)}
                style={{ position: 'relative' }}
              >
                {color !== 0 && (
                  <div
                    className={styles.stone}
                    style={{
                      background: color === 1 ? '#000' : color === 2 ? '#fff' : '#0f0',
                      width: color === 3 ? '20px' : '',
                      height: color === 3 ? '20px' : '',

                      // height: color === 3 ? '20px' : '',
                      // display: color === 3 ? 'flex' : '', // 緑の駒を中央に配置するために追加
                      // alignItems: color === 3 ? 'center' : '',
                    }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
