import type { TaskModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';
export const Home = () => {
  const [user] = useAtom(userAtom);
  const [tasks, setTasks] = useState<TaskModel[] | undefined>(undefined);
  const [label, setLabel] = useState('');
  const router = useRouter();           //ルーターの取得

  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get().catch(returnNull);

    if (tasks !== null) setTasks(tasks);
  };
  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    setLabel('');
    const labels = label
    // const labels = await apiClient.rooms.$get({ query: { limit: label } });
    console.log(labels); // レスポンスをコンソールに出力

    router.push({
      pathname:"/othello",   //URL
      query: {labels} //検索クエリ
    });


    return labels;
  };


  
  const toggleDone = async (task: TaskModel) => {
    await apiClient.tasks._taskId(task.id).patch({ body: { done: !task.done } });
    await fetchTasks();
  };
  const deleteTask = async (task: TaskModel) => {
    await apiClient.tasks._taskId(task.id).delete();
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!tasks || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.title} style={{ marginTop: '160px' }}>
        Welcome to othelloparty!<br />
        <a href= "/othello">room</a>
      </div>
     
      <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTask}>
        <input value={label} type="text" onChange={inputLabel} />
        <input type="submit" value="  in  " />
      </form>
      <ul className={styles.tasks}>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input type="checkbox" checked={task.done} onChange={() => toggleDone(task)} />
              <span>{task.label}</span>
            </label>
            <input
              type="button"
              value="DELETE"
              className={styles.deleteBtn}
              onClick={() => deleteTask(task)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
