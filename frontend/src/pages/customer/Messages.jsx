import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Textarea from '../../components/ui/Textarea';
import EmptyState from '../../components/ui/EmptyState';
import { selectOwnerMessages, sendOwnerMessage } from '../../store/slices/ownerSlice';
import { formatRelative } from '../../lib/format';
import { cn } from '../../lib/cn';

export default function Messages() {
  const threads = useSelector(selectOwnerMessages);
  const location = useLocation();
  const dispatch = useDispatch();
  const initialId =
    threads.find((t) => t.venueId === location.state?.venueId)?.id || threads[0]?.id || null;
  const [activeId, setActiveId] = useState(initialId);
  const [text, setText] = useState('');

  const active = useMemo(() => threads.find((t) => t.id === activeId), [threads, activeId]);

  const send = () => {
    if (!text.trim() || !active) return;
    // Reuse owner message store with customer role from customer side
    const thread = threads.find((t) => t.id === active.id);
    if (thread) {
      thread.messages.push({
        id: `msg-${Date.now()}`,
        from: 'customer',
        text: text.trim(),
        at: new Date().toISOString(),
      });
    }
    // Force redux update via owner action for demo parity
    dispatch(sendOwnerMessage({ threadId: active.id, text: text.trim() }));
    setText('');
  };

  if (!threads.length) {
    return <EmptyState title="No conversations" description="Message a venue owner from a venue page." />;
  }

  return (
    <div>
      <PageHeader title="Messages" description="Chat with venue owners about availability and logistics." />
      <Card className="grid min-h-[520px] overflow-hidden md:grid-cols-[260px_1fr]">
        <div className="border-b border-border md:border-b-0 md:border-r">
          {threads.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => setActiveId(thread.id)}
              className={cn(
                'block w-full border-b border-border px-4 py-3 text-left hover:bg-surface-muted',
                activeId === thread.id && 'bg-brand-50 dark:bg-brand-950/40'
              )}
            >
              <p className="text-sm font-semibold">{thread.venueName}</p>
              <p className="text-xs text-content-muted">{thread.with}</p>
            </button>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="border-b border-border px-4 py-3">
            <p className="font-semibold">{active?.venueName}</p>
            <p className="text-xs text-content-muted">with {active?.with}</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {active?.messages.map((msg) => (
              <div
                key={msg.id}
                className={cn('flex', msg.from === 'customer' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-3 py-2 text-sm',
                    msg.from === 'customer'
                      ? 'bg-brand-600 text-white'
                      : 'bg-surface-muted text-content'
                  )}
                >
                  <p>{msg.text}</p>
                  <p className={cn('mt-1 text-2xs', msg.from === 'customer' ? 'text-brand-100' : 'text-content-muted')}>
                    {formatRelative(msg.at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-border p-4">
            <Textarea
              rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message…"
              className="min-h-0"
            />
            <Button onClick={send}>Send</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
