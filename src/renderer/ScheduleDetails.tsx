import { useEffect, useState, useCallback } from 'react';

interface Schedule {
  id: number;
  title: string;
  completed?: boolean;
  userId?: number;
}

export default function ScheduleDetails() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const fetchSchedules = useCallback(() => {
    const apiPath =
      window.electron.store.get('apiPath') ||
      'https://jsonplaceholder.typicode.com/todos';

    if (apiPath && typeof apiPath === 'string') {
      return fetch(apiPath)
        .then((response) => response.json())
        .then((data) => setSchedules(data))
        .catch((error) => console.error(error));
    }
    return Promise.resolve();
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const poll = () => {
      timeoutId = setTimeout(() => {
        return fetchSchedules()
          .catch((error) => console.error(error))
          .finally(() => poll());
      }, 5000);
    };

    poll();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fetchSchedules]);
  return (
    <div>
      {/* {schedules.map((schedule) => (
        <div key={schedule.id}>{schedule.title}</div>
      ))} */}
      <div>{schedules.at(0)?.title}</div>
      {/* <div>{schedules.at(1)?.title}</div> */}
    </div>
  );
}
