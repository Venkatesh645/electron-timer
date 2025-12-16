import { useEffect, useState, useCallback } from 'react';

export default function ScheduleDetails() {
  const [schedules, setSchedules] = useState<any>([]);

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

  const scheduleDetails = useCallback(() => {
    setTimeout(() => {
      return fetchSchedules()
        .catch((error) => console.error(error))
        .finally(() => {
          scheduleDetails();
        });
    }, 5000);
  }, [fetchSchedules]);

  useEffect(() => {
    scheduleDetails();
  }, [scheduleDetails]);
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
