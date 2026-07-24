import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import NotificationItem from '../../components/cards/NotificationItem';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import {
  fetchNotifications,
  markAllRead,
  markNotificationRead,
  selectNotifications,
} from '../../store/slices/notificationSlice';

export default function Notifications() {
  const dispatch = useDispatch();
  const list = useSelector(selectNotifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Booking updates, messages, and reminders."
        actions={
          <Button variant="outline" onClick={() => dispatch(markAllRead())}>
            Mark all read
          </Button>
        }
      />
      {list.length === 0 ? (
        <EmptyState title="You're all caught up" />
      ) : (
        <div className="mx-auto max-w-2xl space-y-2">
          {list.map((n) => (
            <NotificationItem
              key={n._id}
              notification={n}
              onClick={(item) => dispatch(markNotificationRead(item._id))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
