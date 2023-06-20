import { useAtom } from 'jotai';
import type { TaskModel } from '$/commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../../atoms/user';
import styles from './othello.module.css';

const Home = () => {
  const RoomIdString = "hoge"
  const [user] = useAtom(userAtom);
  const [roomId,setRoomId] = useState("")
  const [label, setLabel] = useState('');
  const [tasks, setTasks] = useState<TaskModel[] | undefined>(undefined);
  const [board, setBoard] = useState<number[][]>();
  const fetchBoard = async () => {
    const board = await apiClient.rooms.$get().catch(returnNull);
    if (board === null) {
      const newRoom = await apiClient.rooms.$post();
      setBoard(newRoom.board);
    }
    if (board !== null) setBoard(board.board);
  };
  const onClick = async (x: number, y: number) => {
    await apiClient.rooms.board.$post({ body: { x, y } });
    await fetchRoomId();
    console.log(RoomIdString);
    await fetchBoard();
  };

  const fetchRoomId = async () => {
    const RoomId = await apiClient.rooms.$get().catch(returnNull);
    if (RoomId === null) {
      const newRoomId = await apiClient.rooms.$post();
      setRoomId(String(newRoomId.id));
    }
    if (RoomId !== null) {
      setRoomId(String(RoomId.id));
      console.log(RoomIdString);
    };
  };

  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!label) return;

    await apiClient.tasks.post({ body: { label } });
    setLabel('');
    console.log(label)
    await fetchTasks();
  };

  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get(label);

    if (tasks !== null) setTasks(tasks);
  };

  useEffect(() => {
    const cancelId = setInterval(fetchBoard, 500);
    return () => {
      clearInterval(cancelId);
    };
  }, []);

  if (!board || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.me} />
        <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTask}>
        <input value={label} type="text" onChange={inputLabel} />
        <input type="submit" value="ADD" />
      </form>
        <div className={styles.component} />
        <p>Room ID:{roomId}</p>
        <p>
          現在の手番は<span id="current-turn">黒</span>です
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
                onClick={() => onClick(x, y)}
                style={{ position: 'relative' }}
              >
                {color !== 0 && (
                  <div
                    className={styles.stone}
                    style={{
                      background: color === 1 ? '#000' : color === 2 ? '#fff' : '#0f0',
                      width: color === 3 ? '20px' : '',
                      height: color === 3 ? '20px' : ''

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
