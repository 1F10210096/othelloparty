import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../../atoms/user';
import styles from './othello.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const fetchBoard = async () => {
    const board = await apiClient.board.$get().catch(returnNull);

    if (board !== null) setBoard(board);
  };
  const onClick = async (x: number, y: number) => {
    await apiClient.board.$post({ body: { x, y } });
    await fetchBoard();
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
        <div className={styles.component} />
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
            row.map((color, x) => (
              <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
                {color !== 0 && (
                  <div
                    className={styles.stone}
                    style={{
                      background: color === 1 ? '#000' : color === 2 ? '#fff' : '#0f0',
                      width: color === 3 ? '20px' : '', // 緑の駒の幅を適切なサイズに設定してください
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
